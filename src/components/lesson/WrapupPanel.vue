<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import type { Lesson, WrapupSegment } from '@/data/schema'
import { getWord } from '@/data/levels'
import { stickerMap } from '@/data/rewards'
import { playReveal, playStar } from '@/composables/useAudioFeedback'
import { speak, stopSpeech, RATE } from '@/composables/useSpeech'
import WordCard from '@/components/common/WordCard.vue'
import BigButton from '@/components/common/BigButton.vue'
import StarMeter from '@/components/common/StarMeter.vue'

/* 总结：不自动播。点词卡复习，点按钮揭贴纸 / 听告别语 */
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
const activeBye = ref<number | null>(null)

onUnmounted(() => {
  finished.value = true
  stopSpeech()
})

function reveal() {
  if (revealed.value) return
  revealed.value = true
  stars.value = props.segment.maxStars
  playReveal()
  playStar()
}

async function tapBye(i: number) {
  if (finished.value) return
  if (!revealed.value) reveal()
  activeBye.value = i
  const line = props.segment.goodbyeLines?.[i]
  if (line) await speak(line.text, { rate: RATE.normal })
}

function finish() {
  if (finished.value) return
  finished.value = true
  stopSpeech()
  if (!revealed.value) reveal()
  emit('done', stars.value || props.segment.maxStars)
}
</script>

<template>
  <div class="seg wrapup anim-fade-up">
    <h2>🌟 Great Job!</h2>
    <p class="parent-hint tip">点词卡复习发音，不会自动连播</p>

    <div class="cards">
      <WordCard v-for="w in words" :key="w.id" :word="w" size="md" />
    </div>

    <BigButton v-if="!revealed" color="--level-color" @click="reveal">✨ 揭晓贴纸</BigButton>

    <div v-if="revealed && sticker" class="sticker anim-stamp">
      <span class="emoji">{{ sticker.emoji }}</span>
      <span class="name">{{ sticker.name.en }}</span>
      <span class="parent-hint">{{ sticker.name.zh }}</span>
    </div>

    <div v-if="revealed && segment.goodbyeLines?.length" class="bye">
      <button
        v-for="(l, i) in segment.goodbyeLines"
        :key="i"
        type="button"
        class="bye-btn"
        :class="{ on: activeBye === i }"
        @click="tapBye(i)"
      >
        <span class="en">🔊 {{ l.text }}</span>
        <span class="parent-hint">{{ l.zh }}</span>
      </button>
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
.tip {
  margin: -8px 0 0;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bye-btn {
  text-align: left;
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.bye-btn.on {
  outline: 3px solid var(--level-color);
}
.en {
  font-weight: 700;
  font-size: 18px;
}
</style>
