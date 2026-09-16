<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Word } from '@/data/schema'
import { getWord } from '@/data/levels'
import { playWin } from '@/composables/useAudioFeedback'
import { useReadAloud } from '@/composables/useReadAloud'
import WordCard from '@/components/common/WordCard.vue'
import BigButton from '@/components/common/BigButton.vue'
import StarMeter from '@/components/common/StarMeter.vue'

/* 跟读闯关：逐词跟读，达标推进 */
const props = defineProps<{
  wordIds: string[]
  passThreshold?: number
  starsPerPass?: number
}>()

const emit = defineEmits<{ (e: 'done', stars: number): void }>()

const words = computed(() => props.wordIds.map(getWord))
const idx = ref(0)
const passed = ref(0)
const stars = ref(0)
const finished = ref(false)

const {
  phase,
  lastResult,
  errorHint,
  recordingUrl,
  effectiveMode,
  demo,
  start,
  stopRecord,
  rateSelf,
  parentConfirm,
  reset,
} = useReadAloud()

const current = computed(() => words.value[idx.value])
const need = computed(() => props.passThreshold ?? words.value.length)

watch(idx, () => reset())

function advanceIfPass() {
  if (!lastResult.value) return
  if (lastResult.value.score >= 60) {
    passed.value++
    stars.value += props.starsPerPass ?? 1
  }
  if (idx.value + 1 >= words.value.length) {
    finished.value = true
    playWin()
    emit('done', stars.value)
    return
  }
  idx.value++
}

function skipWord() {
  if (idx.value + 1 >= words.value.length) {
    finished.value = true
    emit('done', stars.value)
    return
  }
  idx.value++
}
</script>

<template>
  <div v-if="current && !finished" class="read-gate">
    <p class="prompt">🎤 Say it!</p>
    <WordCard :word="current" size="lg" :show-zh="true" />

    <div class="actions">
      <BigButton @click="demo(current)">🔊 Demo</BigButton>
      <BigButton
        v-if="phase === 'idle' || phase === 'result'"
        color="--c-correct"
        ink="--c-card"
        @click="start(current)"
      >
        {{ effectiveMode === 'parent' ? '家长听' : '🎙️ Go' }}
      </BigButton>
      <BigButton v-if="phase === 'recording'" @click="stopRecord">⏹ Stop</BigButton>
    </div>

    <p v-if="phase === 'listening'" class="status anim-breathe">Listening…</p>
    <p v-if="errorHint" class="parent-hint">{{ errorHint }}</p>

    <!-- 录音自评 -->
    <div v-if="recordingUrl && !lastResult" class="self-rate">
      <audio :src="recordingUrl" controls />
      <p class="parent-hint">宝宝觉得自己说得怎么样？</p>
      <div class="stars-pick">
        <button v-for="n in 3" :key="n" class="big-btn star-btn" type="button" @click="rateSelf(current, n)">
          {{ '⭐'.repeat(n) }}
        </button>
      </div>
    </div>

    <!-- 家长确认 -->
    <div v-if="phase === 'parent'" class="parent-confirm">
      <p class="parent-hint">家长听宝宝说「{{ current.en }}」，说对了点赞</p>
      <div class="row">
        <BigButton color="--c-correct" @click="parentConfirm(current, true)">👍</BigButton>
        <BigButton @click="parentConfirm(current, false)">再试</BigButton>
      </div>
    </div>

    <div v-if="lastResult" class="result anim-pop">
      <StarMeter :earned="lastResult.score >= 60 ? 3 : 1" :max="3" :size="36" />
      <p>{{ lastResult.score >= 60 ? 'Great!' : 'Good try!' }}</p>
      <BigButton @click="advanceIfPass">Next ▶</BigButton>
    </div>

    <button class="skip parent-hint" type="button" @click="skipWord">跳过本词（零输出日可用）</button>
    <p class="parent-hint">通过 {{ passed }}/{{ need }} · mode: {{ effectiveMode }}</p>
  </div>
</template>

<style scoped>
.read-gate {
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
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.status {
  font-size: 22px;
  font-weight: 700;
  color: #e53935;
}
.self-rate,
.parent-confirm,
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.stars-pick,
.row {
  display: flex;
  gap: 10px;
}
.star-btn {
  min-width: 88px;
  min-height: 72px;
  font-size: 22px;
}
.skip {
  background: none;
  text-decoration: underline;
  cursor: pointer;
}
</style>
