<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Lesson, WrapupSegment } from '@/data/schema'
import { getWord } from '@/data/levels'
import { stickerMap } from '@/data/rewards'
import { playReveal, playStar } from '@/composables/useAudioFeedback'
import { speak, speakWord, stopSpeech, RATE } from '@/composables/useSpeech'
import WordCard from '@/components/common/WordCard.vue'
import BigButton from '@/components/common/BigButton.vue'
import StarMeter from '@/components/common/StarMeter.vue'

const props = defineProps<{
  segment: WrapupSegment
  lesson: Lesson
}>()
const emit = defineEmits<{ (e: 'done', stars: number): void }>()

const stars = ref(0)
const revealed = ref(false)
const finished = ref(false)
const sticker = computed(() => stickerMap.get(props.segment.stickerId))
const words = computed(() => props.segment.reviewWordIds.map(getWord))

onMounted(async () => {
  for (const w of words.value) {
    if (finished.value) return
    await speakWord(w)
  }
  if (!finished.value) await reveal()
})

onUnmounted(() => {
  finished.value = true
  stopSpeech()
})

async function reveal() {
  if (revealed.value) return
  revealed.value = true
  stars.value = props.segment.maxStars
  playReveal()
  playStar()
  if (props.segment.goodbyeLines?.length) {
    for (const l of props.segment.goodbyeLines) {
      if (finished.value) return
      await speak(l.text, { rate: RATE.normal })
    }
  }
}

function finish() {
  if (finished.value) return
  finished.value = true
  stopSpeech()
  if (!revealed.value) {
    revealed.value = true
    stars.value = props.segment.maxStars
  }
  emit('done', stars.value || props.segment.maxStars)
}
</script>

<template>
  <div class="seg wrapup anim-fade-up">
    <h2>🌟 Great Job!</h2>
    <div class="cards">
      <WordCard v-for="w in words" :key="w.id" :word="w" size="md" />
    </div>

    <div v-if="revealed && sticker" class="sticker anim-stamp">
      <span class="emoji">{{ sticker.emoji }}</span>
      <span class="name">{{ sticker.name.en }}</span>
      <span class="parent-hint">{{ sticker.name.zh }}</span>
    </div>

    <div v-if="segment.goodbyeLines" class="bye">
      <p v-for="(l, i) in segment.goodbyeLines" :key="i">
        <span class="en">{{ l.text }}</span>
        <span class="parent-hint">{{ l.zh }}</span>
      </p>
    </div>

    <StarMeter :earned="stars" :max="segment.maxStars" />
    <BigButton color="--c-correct" @click="finish">收下星星 ✅</BigButton>
  </div>
</template>

<style scoped>
.wrapup {
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
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.sticker {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--c-card);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-pop);
  padding: 20px 28px;
}
.emoji {
  font-size: 72px;
}
.name {
  font-size: 24px;
  font-weight: 800;
}
.bye {
  max-width: 520px;
}
.bye p {
  margin: 0 0 8px;
  display: flex;
  flex-direction: column;
}
.en {
  font-weight: 700;
  font-size: 18px;
}
</style>
