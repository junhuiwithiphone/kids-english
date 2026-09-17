<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import type { Lesson, WarmupSegment } from '@/data/schema'
import { getSong, getWord } from '@/data/levels'
import { playStar, playWin } from '@/composables/useAudioFeedback'
import { speak, speakWord, stopSpeech, RATE } from '@/composables/useSpeech'
import WordCard from '@/components/common/WordCard.vue'
import BigButton from '@/components/common/BigButton.vue'
import StarMeter from '@/components/common/StarMeter.vue'

/* 开场：不自动播。点问候语 / 词卡才发音，点继续进入下一环节 */
const props = defineProps<{
  segment: WarmupSegment
  lesson: Lesson
}>()
const emit = defineEmits<{ (e: 'done', stars: number): void }>()

const stars = ref(0)
const finished = ref(false)
const activeLine = ref<number | null>(null)

onUnmounted(() => stopSpeech())

async function tapGreeting(i: number) {
  if (finished.value) return
  activeLine.value = i
  const line = props.segment.greetingLines[i]
  if (line) await speak(line.text, { rate: RATE.normal })
}

async function playHelloSong() {
  if (finished.value || !props.segment.helloSongId) return
  const song = getSong(props.segment.helloSongId)
  await speak(song.title.en, { rate: RATE.chant })
  for (const line of song.lines.slice(0, 3)) {
    if (finished.value) return
    await speak(line.text, { rate: song.baseRate })
  }
}

async function announceMustWin() {
  if (finished.value || !props.segment.announceMustWin) return
  await speak("Today's magic words!", { rate: RATE.normal })
  for (const id of props.lesson.mustWinWords) {
    if (finished.value) return
    await speakWord(getWord(id))
  }
}

function finish() {
  if (finished.value) return
  finished.value = true
  stopSpeech()
  stars.value = props.segment.maxStars
  playStar()
  playWin()
  emit('done', stars.value)
}
</script>

<template>
  <div class="seg warmup anim-fade-up">
    <h2>👋 Hello!</h2>
    <p class="parent-hint tip">点下面的句子听英文，不会自动连播</p>

    <div class="lines">
      <button
        v-for="(l, i) in segment.greetingLines"
        :key="i"
        type="button"
        class="line-btn"
        :class="{ on: activeLine === i }"
        @click="tapGreeting(i)"
      >
        <span class="en">🔊 {{ l.text }}</span>
        <span class="parent-hint">{{ l.zh }}</span>
      </button>
    </div>

    <div v-if="segment.helloSongId" class="row">
      <BigButton @click="playHelloSong">🎵 Hello Song</BigButton>
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
      <p class="label">✨ Magic words <span class="parent-hint">点词卡听发音</span></p>
      <div class="cards">
        <WordCard
          v-for="id in lesson.mustWinWords"
          :key="id"
          :word="getWord(id)"
          size="md"
        />
      </div>
      <BigButton @click="announceMustWin">🔊 听今日必胜词</BigButton>
    </div>

    <StarMeter :earned="stars" :max="segment.maxStars" />
    <BigButton color="--level-color" @click="finish">继续 ▶</BigButton>
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
.tip {
  margin: -8px 0 0;
}
.lines {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 560px;
  width: 100%;
}
.line-btn {
  text-align: left;
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.line-btn.on {
  outline: 3px solid var(--level-color);
}
.en {
  font-size: 20px;
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
.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
