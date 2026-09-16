<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { GameConfig, Word } from '@/data/schema'
import { shuffle } from '@/data/helpers'
import { getWord } from '@/data/levels'
import { playClick, playCorrect, playWin, playWrong } from '@/composables/useAudioFeedback'
import { speakWord } from '@/composables/useSpeech'
import { useProgressStore } from '@/stores/progress'
import WordCard from '@/components/common/WordCard.vue'

/* 图词配对：点图再点词，配对成功消去 */
const props = defineProps<{ config: GameConfig }>()
const emit = defineEmits<{ (e: 'done', stars: number): void }>()

const progress = useProgressStore()

type Side = 'pic' | 'word'
interface Tile {
  id: string
  word: Word
  side: Side
  matched: boolean
}

const tiles = ref<Tile[]>([])
const selected = ref<Tile | null>(null)
const stars = ref(0)
const done = ref(false)

const remaining = computed(() => tiles.value.filter((t) => !t.matched).length)

onMounted(() => {
  const words = shuffle(props.config.wordIds.map(getWord)).slice(0, Math.min(4, props.config.wordIds.length))
  const pics: Tile[] = words.map((w) => ({ id: `p-${w.id}`, word: w, side: 'pic', matched: false }))
  const labels: Tile[] = words.map((w) => ({ id: `w-${w.id}`, word: w, side: 'word', matched: false }))
  tiles.value = shuffle([...pics, ...labels])
})

async function tap(tile: Tile) {
  if (tile.matched || done.value) return
  playClick()
  if (tile.side === 'pic') void speakWord(tile.word)

  if (!selected.value) {
    selected.value = tile
    return
  }
  if (selected.value.id === tile.id) {
    selected.value = null
    return
  }
  // 必须图+词
  if (selected.value.side === tile.side) {
    playWrong()
    selected.value = tile
    return
  }
  if (selected.value.word.id === tile.word.id) {
    selected.value.matched = true
    tile.matched = true
    selected.value = null
    stars.value += props.config.starsPerRound
    progress.bumpMastery(tile.word.id, 4)
    playCorrect()
    if (remaining.value === 0) {
      done.value = true
      playWin()
      emit('done', stars.value)
    }
  } else {
    playWrong()
    selected.value = null
  }
}
</script>

<template>
  <div class="game match">
    <p class="prompt">🔗 Match!</p>
    <div class="grid">
      <button
        v-for="t in tiles"
        :key="t.id"
        class="tile big-btn"
        :class="[t.side, { matched: t.matched, on: selected?.id === t.id }]"
        type="button"
        :disabled="t.matched"
        @click="tap(t)"
      >
        <template v-if="t.side === 'pic'">
          <WordCard :word="t.word" size="sm" :show-zh="false" silent />
        </template>
        <template v-else>
          <span class="word-big label">{{ t.word.en }}</span>
        </template>
      </button>
    </div>
    <p class="parent-hint">先点图，再点英文单词</p>
  </div>
</template>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.prompt {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 640px;
}
.tile {
  min-height: 110px;
  padding: 8px;
}
.tile.on {
  outline: 4px solid var(--level-color);
}
.tile.matched {
  opacity: 0.35;
  filter: grayscale(0.4);
}
.label {
  font-size: 28px;
}
</style>
