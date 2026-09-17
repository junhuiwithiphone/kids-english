<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { GameConfig, Word } from '@/data/schema'
import { shuffle, randInt } from '@/data/helpers'
import { getWord } from '@/data/levels'
import { playCorrect, playWrong, playWin, playListenCue } from '@/composables/useAudioFeedback'
import { speakWord, stopSpeech } from '@/composables/useSpeech'
import { useProgressStore } from '@/stores/progress'
import WordCard from '@/components/common/WordCard.vue'

/* 打地鼠：先听目标词，点正确冒出的词卡 */
const props = defineProps<{ config: GameConfig }>()
const emit = defineEmits<{ (e: 'done', stars: number): void }>()

const progress = useProgressStore()
const pool = ref<Word[]>([])
const holes = ref<(Word | null)[]>([null, null, null, null])
const target = ref<Word | null>(null)
const stars = ref(0)
const round = ref(0)
const locked = ref(false)
let alive = true
let tick: number | undefined

const started = ref(false)

onMounted(() => {
  pool.value = props.config.wordIds.map(getWord)
})

function start() {
  if (started.value) return
  started.value = true
  void nextRound()
}

onUnmounted(() => {
  alive = false
  clearInterval(tick)
  stopSpeech()
})

async function nextRound() {
  clearInterval(tick)
  if (!alive) return
  if (round.value >= props.config.rounds) {
    playWin()
    emit('done', stars.value)
    return
  }
  target.value = shuffle(pool.value)[0]
  holes.value = [null, null, null, null]
  locked.value = false
  playListenCue()
  await speakWord(target.value!)
  if (!alive) return

  // 随机冒出
  tick = window.setInterval(() => {
    const next = [...holes.value]
    // 清空部分洞
    for (let i = 0; i < next.length; i++) {
      if (Math.random() < 0.45) next[i] = null
    }
    const empty = next.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0)
    if (empty.length) {
      const slot = empty[randInt(0, empty.length - 1)]
      // 60% 概率冒出目标，否则干扰
      const showTarget = Math.random() < 0.55
      next[slot] = showTarget
        ? target.value
        : shuffle(pool.value.filter((w) => w.id !== target.value?.id))[0] ?? target.value
    }
    holes.value = next
  }, 900)
}

async function hit(i: number) {
  const w = holes.value[i]
  if (!w || locked.value || !target.value) return
  locked.value = true
  clearInterval(tick)
  if (w.id === target.value.id) {
    playCorrect()
    stars.value += props.config.starsPerRound
    progress.bumpMastery(w.id, 4)
  } else {
    playWrong()
  }
  holes.value = holes.value.map(() => null)
  round.value++
  await new Promise((r) => setTimeout(r, 450))
  void nextRound()
}
</script>

<template>
  <div class="game mole">
    <p class="prompt">🐹 Whack!</p>
    <button v-if="!started" class="replay big-btn" type="button" @click="start">🔊 开始听</button>
    <template v-else>
      <p v-if="target" class="target parent-hint">找：{{ target.en }}</p>
      <button class="replay big-btn" type="button" @click="target && speakWord(target)">🔊</button>
    </template>

    <div class="field">
      <button
        v-for="(w, i) in holes"
        :key="i"
        class="hole big-btn"
        type="button"
        @click="hit(i)"
      >
        <WordCard v-if="w" :word="w" size="sm" :show-zh="false" silent class="pop" />
        <span v-else class="empty">🕳️</span>
      </button>
    </div>
    <p class="parent-hint">⭐ {{ stars }} · Round {{ Math.min(round + 1, config.rounds) }}/{{ config.rounds }}</p>
  </div>
</template>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.prompt {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
}
.target {
  font-size: 18px !important;
  font-weight: 700;
  color: var(--c-ink) !important;
}
.replay {
  min-width: 72px;
  min-height: 72px;
}
.field {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  width: min(420px, 100%);
}
.hole {
  min-height: 120px;
  background: #f3e5c8;
}
.empty {
  font-size: 36px;
  opacity: 0.5;
}
.pop {
  animation: pop-in 0.25s ease both;
}
</style>
