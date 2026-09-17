<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Lesson, WarmupSegment } from '@/data/schema'
import { getSong, getWord } from '@/data/levels'
import { playStar, playWin } from '@/composables/useAudioFeedback'
import { speak, speakSequence, speakWord, stopSpeech, RATE } from '@/composables/useSpeech'
import WordCard from '@/components/common/WordCard.vue'
import BigButton from '@/components/common/BigButton.vue'
import StarMeter from '@/components/common/StarMeter.vue'

const props = defineProps<{
  segment: WarmupSegment
  lesson: Lesson
}>()
const emit = defineEmits<{ (e: 'done', stars: number): void }>()

const stars = ref(0)
const step = ref(0) // 0 greet 1 anchors 2 must-win 3 done
const finished = ref(false)

onMounted(() => {
  void run()
})

onUnmounted(() => {
  finished.value = true
  stopSpeech()
})

async function run() {
  await speakSequence(
    props.segment.greetingLines.map((l) => ({ text: l.text, rate: RATE.normal })),
    400,
  )
  if (finished.value) return
  step.value = 1

  if (props.segment.helloSongId) {
    const song = getSong(props.segment.helloSongId)
    await speak(song.title.en, { rate: RATE.chant })
    if (finished.value) return
    for (const line of song.lines.slice(0, 3)) {
      if (finished.value) return
      await speak(line.text, { rate: song.baseRate })
    }
  }
  if (finished.value) return

  if (props.segment.anchorWordIds?.length) {
    for (const id of props.segment.anchorWordIds) {
      if (finished.value) return
      await speakWord(getWord(id))
    }
  }
  step.value = 2

  if (props.segment.announceMustWin && props.lesson.mustWinWords.length) {
    await speak("Today's magic words!", { rate: RATE.normal })
    for (const id of props.lesson.mustWinWords) {
      if (finished.value) return
      await speakWord(getWord(id))
    }
  }

  if (!finished.value) finish()
}

function finish() {
  if (finished.value) return
  finished.value = true
  stopSpeech()
  stars.value = props.segment.maxStars
  playStar()
  playWin()
  step.value = 3
  emit('done', stars.value)
}

function skip() {
  finish()
}
</script>

<template>
  <div class="seg warmup anim-fade-up">
    <h2>👋 Hello!</h2>
    <div class="lines">
      <p v-for="(l, i) in segment.greetingLines" :key="i" class="line">
        <span class="en">{{ l.text }}</span>
        <span class="parent-hint">{{ l.zh }}</span>
      </p>
    </div>

    <div v-if="segment.anchorWordIds?.length" class="cards">
      <WordCard
        v-for="id in segment.anchorWordIds"
        :key="id"
        :word="getWord(id)"
        size="md"
      />
    </div>

    <div v-if="segment.announceMustWin" class="must-win">
      <p class="label">✨ Magic words</p>
      <div class="cards">
        <WordCard
          v-for="id in lesson.mustWinWords"
          :key="id"
          :word="getWord(id)"
          size="md"
        />
      </div>
    </div>

    <StarMeter :earned="stars" :max="segment.maxStars" />
    <BigButton @click="skip">{{ step < 3 ? '跳过开场 ▶' : '继续' }}</BigButton>
  </div>
</template>

<style scoped>
.warmup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}
h2 {
  margin: 0;
  font-size: 32px;
}
.lines {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 560px;
}
.line {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.en {
  font-size: 22px;
  font-weight: 700;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.must-win .label {
  font-weight: 800;
  font-size: 20px;
  margin: 0 0 8px;
}
</style>
