<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { GameConfig, Word } from '@/data/schema'
import { shuffle } from '@/data/helpers'
import { getWord } from '@/data/levels'
import { playClick, playCorrect, playWin, playStar } from '@/composables/useAudioFeedback'
import { speak, speakWord, stopSpeech, RATE } from '@/composables/useSpeech'
import { useProgressStore } from '@/stores/progress'
import WordCard from '@/components/common/WordCard.vue'
import BigButton from '@/components/common/BigButton.vue'

/* TPR / Simon Says：播指令，家长长按确认孩子做对了 */
const props = defineProps<{ config: GameConfig }>()
const emit = defineEmits<{ (e: 'done', stars: number): void }>()

const progress = useProgressStore()
const queue = ref<Word[]>([])
const idx = ref(0)
const stars = ref(0)
const holding = ref(false)
const done = ref(false)
let holdTimer: number | undefined

const current = computed(() => queue.value[idx.value])
const title = computed(() => props.config.title?.en ?? 'Simon Says!')

onMounted(() => {
  queue.value = shuffle(props.config.wordIds.map(getWord))
  // 不自动播：点「听指令」再开始
})

onUnmounted(() => {
  done.value = true
  clearTimeout(holdTimer)
  stopSpeech()
})

async function announce() {
  if (done.value || !current.value) return
  await speak(title.value, { rate: RATE.normal })
  if (done.value || !current.value) return
  await speakWord(current.value)
}

function startHold() {
  if (done.value) return
  holding.value = true
  playClick()
  holdTimer = window.setTimeout(() => {
    confirmOk()
  }, 800)
}

function endHold() {
  holding.value = false
  clearTimeout(holdTimer)
}

function confirmOk() {
  if (!current.value || done.value) return
  holding.value = false
  playCorrect()
  playStar()
  stars.value += props.config.starsPerRound
  progress.bumpMastery(current.value.id, 3)
  if (idx.value + 1 >= queue.value.length) {
    done.value = true
    playWin()
    emit('done', stars.value)
    return
  }
  idx.value++
  void announce()
}

function skipRest() {
  // 家长可跳过剩余指令，按已得星结算
  done.value = true
  playWin()
  emit('done', Math.max(stars.value, props.config.starsPerRound))
}
</script>

<template>
  <div class="game tpr">
    <p class="prompt">🤸 {{ title }}</p>
    <BigButton @click="announce">🔊 听指令</BigButton>
    <div v-if="current" class="stage">
      <WordCard :word="current" size="lg" :show-zh="true" />
      <p v-if="current.tprAction" class="parent-hint action">👉 {{ current.tprAction }}</p>
    </div>

    <button
      class="hold-btn big-btn"
      type="button"
      :class="{ holding }"
      @pointerdown.prevent="startHold"
      @pointerup="endHold"
      @pointerleave="endHold"
      @pointercancel="endHold"
    >
      {{ holding ? '👍…' : '长按确认做对啦' }}
    </button>

    <p class="parent-hint tip">家长看着宝宝做动作，做对了长按上方按钮得星</p>
    <BigButton @click="skipRest">跳过剩余 ✅</BigButton>
  </div>
</template>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.prompt {
  font-size: 26px;
  font-weight: 800;
  margin: 0;
}
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.action {
  font-size: 16px !important;
  color: var(--c-ink) !important;
}
.hold-btn {
  min-width: 220px;
  min-height: 96px;
  background: var(--c-correct);
  color: #fff;
  font-size: 22px;
}
.hold-btn.holding {
  transform: scale(1.06);
  box-shadow: var(--shadow-pop);
}
.tip {
  text-align: center;
  max-width: 420px;
}
</style>
