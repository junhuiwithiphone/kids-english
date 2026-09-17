<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Segment } from '@/data/schema'
import { getLesson, getUnit, levelOfLesson } from '@/data/levels'
import { useProgressStore } from '@/stores/progress'
import { playClick, playWrong } from '@/composables/useAudioFeedback'
import { stopAllPlayback } from '@/composables/stopAllPlayback'
import { resolve } from '@/i18n'
import StarMeter from '@/components/common/StarMeter.vue'
import BigButton from '@/components/common/BigButton.vue'
import WarmupPanel from '@/components/lesson/WarmupPanel.vue'
import WordsPanel from '@/components/lesson/WordsPanel.vue'
import SongPanel from '@/components/lesson/SongPanel.vue'
import HandsOnPanel from '@/components/lesson/HandsOnPanel.vue'
import WrapupPanel from '@/components/lesson/WrapupPanel.vue'

/* 导航：返回 = 本节前一环节；首页 = 离开课程回主页。
   断点续玩静默进入；音频仅点内容才播。 */

const props = defineProps<{ lessonId: string }>()
const router = useRouter()
const progress = useProgressStore()

const lesson = computed(() => getLesson(props.lessonId))
const unit = computed(() => (lesson.value ? getUnit(lesson.value.unitId) : undefined))
const level = computed(() => levelOfLesson(props.lessonId))

const segIdx = ref(0)
const maxReached = ref(0)
const segmentStars = ref<number[]>([0, 0, 0, 0, 0])
const celebrating = ref(false)
const panelEpoch = ref(0)
const totalEarned = computed(() => segmentStars.value.reduce((a, b) => a + b, 0))

const segment = computed<Segment | undefined>(() => lesson.value?.segments[segIdx.value])
const canGoBack = computed(() => celebrating.value || segIdx.value > 0)

const labels = ['👋', '📖', '🎵', '✋', '🌟']
const labelNames = ['开场', '单词', '儿歌', '动手', '总结']

onMounted(() => {
  if (!lesson.value) return
  stopAllPlayback()
  if (progress.resume?.lessonId === props.lessonId) {
    const i = Math.min(progress.resume.segmentIndex, lesson.value.segments.length - 1)
    segIdx.value = i
    maxReached.value = i
  }
  progress.saveResume(props.lessonId, segIdx.value)
})

onUnmounted(() => stopAllPlayback())

watch(segIdx, (i) => {
  stopAllPlayback()
  if (i > maxReached.value) maxReached.value = i
  if (lesson.value) progress.saveResume(props.lessonId, i)
})

function onSegDone(stars: number) {
  stopAllPlayback()
  segmentStars.value[segIdx.value] = stars
  if (!lesson.value) return
  if (segIdx.value + 1 >= lesson.value.segments.length) {
    celebrating.value = true
    progress.completeLesson(props.lessonId, [...segmentStars.value])
    return
  }
  segIdx.value++
  panelEpoch.value++
}

function jumpTo(i: number) {
  if (!lesson.value) return
  if (i < 0 || i > maxReached.value || i >= lesson.value.segments.length) {
    playWrong()
    return
  }
  if (i === segIdx.value && !celebrating.value) return
  playClick()
  stopAllPlayback()
  celebrating.value = false
  segIdx.value = i
  panelEpoch.value++
}

/** 返回：回到本节前一个已学环节 */
function goPrevSegment() {
  if (celebrating.value) {
    jumpTo(maxReached.value)
    return
  }
  if (segIdx.value <= 0) {
    playWrong()
    return
  }
  jumpTo(segIdx.value - 1)
}

function goShowcase() {
  playClick()
  stopAllPlayback()
  router.push({ name: 'showcase', params: { lessonId: props.lessonId } })
}

/** 首页：保存进度并回主页 */
function goHome() {
  playClick()
  stopAllPlayback()
  if (lesson.value) progress.saveResume(props.lessonId, segIdx.value)
  router.push({ name: 'home' })
}

function goUnit() {
  playClick()
  stopAllPlayback()
  if (lesson.value) progress.saveResume(props.lessonId, segIdx.value)
  if (unit.value) router.push({ name: 'unit', params: { unitId: unit.value.id } })
  else router.push({ name: 'home' })
}

function goRewards() {
  playClick()
  stopAllPlayback()
  router.push({ name: 'rewards' })
}
</script>

<template>
  <div v-if="lesson && level" class="page lesson" :class="`level-${level.id}`">
    <header class="bar">
      <div class="nav-btns">
        <button
          class="nav-btn big-btn"
          type="button"
          aria-label="返回上一环节"
          :disabled="!canGoBack"
          @click="goPrevSegment"
        >
          ⬅️
        </button>
        <button class="nav-btn home big-btn" type="button" aria-label="回首页" @click="goHome">
          🏠
        </button>
      </div>
      <div class="meta">
        <h1>Day {{ lesson.day }} · {{ resolve(lesson.title, 'en') }}</h1>
        <p class="parent-hint">{{ resolve(lesson.title, 'zh') }} · 约 {{ lesson.estimatedMinutes }} 分钟</p>
      </div>
      <div class="steps" role="navigation" aria-label="课程环节">
        <button
          v-for="(lab, i) in labels"
          :key="i"
          type="button"
          class="dot"
          :class="{
            on: i === segIdx && !celebrating,
            done: i < segIdx || (celebrating && i <= maxReached),
            locked: i > maxReached,
          }"
          :aria-label="`${labelNames[i]}${i > maxReached ? '（未解锁）' : ''}`"
          :disabled="i > maxReached"
          @click="jumpTo(i)"
        >
          {{ lab }}
        </button>
      </div>
    </header>
    <p class="parent-hint nav-hint">⬅️ 上一环节 · 🏠 首页 · 点喇叭听英文</p>

    <div v-if="!celebrating" class="body">
      <WarmupPanel
        v-if="segment?.type === 'warmup'"
        :key="`w-${segIdx}-${panelEpoch}`"
        :segment="segment"
        :lesson="lesson"
        @done="onSegDone"
      />
      <WordsPanel
        v-else-if="segment?.type === 'words'"
        :key="`words-${segIdx}-${panelEpoch}`"
        :segment="segment"
        :lesson="lesson"
        @done="onSegDone"
      />
      <SongPanel
        v-else-if="segment?.type === 'song'"
        :key="`song-${segIdx}-${panelEpoch}`"
        :segment="segment"
        @done="onSegDone"
      />
      <HandsOnPanel
        v-else-if="segment?.type === 'handsOn'"
        :key="`hands-${segIdx}-${panelEpoch}`"
        :segment="segment"
        :lesson="lesson"
        @done="onSegDone"
        @showcase="goShowcase"
      />
      <WrapupPanel
        v-else-if="segment?.type === 'wrapup'"
        :key="`wrap-${segIdx}-${panelEpoch}`"
        :segment="segment"
        :lesson="lesson"
        @done="onSegDone"
      />
    </div>

    <div v-else class="celebrate anim-pop">
      <h2>🎉 Lesson Complete!</h2>
      <StarMeter :earned="totalEarned" :max="Math.max(totalEarned, 5)" :size="48" />
      <p class="parent-hint">本课共得 {{ totalEarned }} 颗星</p>
      <div class="row">
        <BigButton color="--level-color" @click="goHome">🏠 回家</BigButton>
        <BigButton @click="goRewards">🎁 贴纸</BigButton>
        <BigButton v-if="unit" @click="goUnit">🗺️ 单元</BigButton>
        <BigButton v-if="lesson.showcase" color="--c-correct" @click="goShowcase">🎤 展示</BigButton>
      </div>
    </div>
  </div>
  <div v-else class="page">
    <p>找不到这节课</p>
    <BigButton @click="goHome">回家</BigButton>
  </div>
</template>

<style scoped>
.lesson {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100dvh;
}
.bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.nav-btns {
  display: flex;
  gap: 8px;
}
.nav-btn {
  min-width: 64px;
  min-height: 64px;
  font-size: 26px;
}
.nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.nav-btn.home {
  background: #fff8e7;
}
.meta {
  flex: 1;
  min-width: 140px;
}
.meta h1 {
  margin: 0;
  font-size: 22px;
}
.steps {
  display: flex;
  gap: 6px;
}
.dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  opacity: 0.45;
  cursor: pointer;
  border: none;
  padding: 0;
}
.dot.on {
  opacity: 1;
  background: var(--level-color);
  box-shadow: var(--shadow-card);
}
.dot.done {
  opacity: 0.85;
  background: #fff3c4;
}
.dot.locked {
  opacity: 0.35;
  cursor: not-allowed;
}
.nav-hint {
  margin: 0;
  text-align: center;
}
.body {
  flex: 1;
}
.celebrate {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 40px 12px;
  text-align: center;
}
.celebrate h2 {
  margin: 0;
  font-size: 36px;
}
.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
