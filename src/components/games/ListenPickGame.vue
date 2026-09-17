<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { GameConfig, Word } from '@/data/schema'
import { pickDistractors, shuffle, wordsOfLevel } from '@/data/helpers'
import { getWord, levelOfLesson } from '@/data/levels'
import { playCorrect, playWrong, playWin } from '@/composables/useAudioFeedback'
import { speakWord, stopSpeech } from '@/composables/useSpeech'
import { useProgressStore } from '@/stores/progress'
import WordCard from '@/components/common/WordCard.vue'

/* 听音选图：TTS 读目标词 → 点选正确图卡 */
const props = defineProps<{
  config: GameConfig
  lessonId: string
}>()

const emit = defineEmits<{
  (e: 'done', stars: number): void
}>()

const progress = useProgressStore()

interface Round {
  target: Word
  options: Word[]
}

const rounds = ref<Round[]>([])
const idx = ref(0)
const stars = ref(0)
const feedback = ref<'ok' | 'bad' | null>(null)
const locked = ref(false)
const finished = ref(false)

const current = computed(() => rounds.value[idx.value])

onMounted(() => {
  const levelId = levelOfLesson(props.lessonId)?.id ?? 'L1'
  const pool = wordsOfLevel(levelId)
  const targets = shuffle(props.config.wordIds.map(getWord)).slice(0, props.config.rounds)
  const nOpts = props.config.optionsPerRound ?? 3
  rounds.value = targets.map((target) => {
    const distractors = pickDistractors(target, pool.length ? pool : targets, nOpts - 1)
    return { target, options: shuffle([target, ...distractors]) }
  })
  void prompt()
})

onUnmounted(() => {
  finished.value = true
  stopSpeech()
})

async function prompt() {
  if (finished.value || !current.value) return
  await speakWord(current.value.target)
}

async function pick(word: Word) {
  if (locked.value || finished.value || !current.value) return
  locked.value = true
  if (word.id === current.value.target.id) {
    feedback.value = 'ok'
    playCorrect()
    stars.value += props.config.starsPerRound
    progress.bumpMastery(word.id, 4)
    await wait(700)
    next()
  } else {
    feedback.value = 'bad'
    playWrong()
    await wait(500)
    feedback.value = null
    locked.value = false
    // 再读一次提示
    void prompt()
  }
}

function next() {
  feedback.value = null
  locked.value = false
  if (idx.value + 1 >= rounds.value.length) {
    finished.value = true
    playWin()
    emit('done', stars.value)
    return
  }
  idx.value++
  void prompt()
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
</script>

<template>
  <div class="game listen-pick">
    <p class="prompt">👂 Listen!</p>
    <button class="replay big-btn" type="button" @click="prompt">🔊 Again</button>

    <div v-if="current" class="options" :class="feedback">
      <WordCard
        v-for="w in current.options"
        :key="w.id"
        :word="w"
        size="md"
        :show-zh="false"
        silent
        :class="{
          glow: feedback === 'ok' && w.id === current.target.id,
          wiggle: feedback === 'bad',
        }"
        @tap="pick"
      />
    </div>

    <p class="score parent-hint">⭐ {{ stars }} · {{ idx + 1 }}/{{ rounds.length }}</p>
  </div>
</template>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.prompt {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
}
.replay {
  min-height: 64px;
  min-width: 140px;
  font-size: 20px;
}
.options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--touch-gap);
  justify-content: center;
}
.glow {
  animation: glow-hint 1s ease-in-out infinite;
}
.wiggle {
  animation: wiggle 0.35s ease both;
}
.score {
  margin: 0;
}
</style>
