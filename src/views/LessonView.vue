<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Segment } from '@/data/schema'
import { getLesson, getUnit, levelOfLesson } from '@/data/levels'
import { useProgressStore } from '@/stores/progress'
import { playClick } from '@/composables/useAudioFeedback'
import { stopAllPlayback } from '@/composables/stopAllPlayback'
import { resolve } from '@/i18n'
import StarMeter from '@/components/common/StarMeter.vue'
import BigButton from '@/components/common/BigButton.vue'
import WarmupPanel from '@/components/lesson/WarmupPanel.vue'
import WordsPanel from '@/components/lesson/WordsPanel.vue'
import SongPanel from '@/components/lesson/SongPanel.vue'
import HandsOnPanel from '@/components/lesson/HandsOnPanel.vue'
import WrapupPanel from '@/components/lesson/WrapupPanel.vue'

const props = defineProps<{ lessonId: string }>()
const router = useRouter()
const progress = useProgressStore()

const lesson = computed(() => getLesson(props.lessonId))
const unit = computed(() => (lesson.value ? getUnit(lesson.value.unitId) : undefined))
const level = computed(() => levelOfLesson(props.lessonId))

const segIdx = ref(0)
const segmentStars = ref<number[]>([0, 0, 0, 0, 0])
const celebrating = ref(false)
const totalEarned = computed(() => segmentStars.value.reduce((a, b) => a + b, 0))

const segment = computed<Segment | undefined>(() => lesson.value?.segments[segIdx.value])

const labels = ['👋', '📖', '🎵', '✋', '🌟']

onMounted(() => {
  if (!lesson.value) return
  // 断点续玩
  if (progress.resume?.lessonId === props.lessonId) {
    segIdx.value = Math.min(progress.resume.segmentIndex, lesson.value.segments.length - 1)
  }
  progress.saveResume(props.lessonId, segIdx.value)
})

onUnmounted(() => stopAllPlayback())

watch(segIdx, (i) => {
  stopAllPlayback()
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
}

function goShowcase() {
  playClick()
  stopAllPlayback()
  router.push({ name: 'showcase', params: { lessonId: props.lessonId } })
}

function exit() {
  playClick()
  stopAllPlayback()
  if (unit.value) router.push({ name: 'unit', params: { unitId: unit.value.id } })
  else router.push({ name: 'home' })
}

function goHome() {
  playClick()
  stopAllPlayback()
  router.push({ name: 'home' })
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
      <button class="back big-btn" type="button" aria-label="退出" @click="exit">⬅️</button>
      <div class="meta">
        <h1>Day {{ lesson.day }} · {{ resolve(lesson.title, 'en') }}</h1>
        <p class="parent-hint">{{ resolve(lesson.title, 'zh') }} · 约 {{ lesson.estimatedMinutes }} 分钟</p>
      </div>
      <div class="steps" aria-hidden="true">
        <span
          v-for="(lab, i) in labels"
          :key="i"
          class="dot"
          :class="{ on: i === segIdx, done: i < segIdx }"
        >{{ lab }}</span>
      </div>
    </header>

    <div v-if="!celebrating" class="body">
      <WarmupPanel
        v-if="segment?.type === 'warmup'"
        :key="`w-${segIdx}`"
        :segment="segment"
        :lesson="lesson"
        @done="onSegDone"
      />
      <WordsPanel
        v-else-if="segment?.type === 'words'"
        :key="`words-${segIdx}`"
        :segment="segment"
        :lesson="lesson"
        @done="onSegDone"
      />
      <SongPanel
        v-else-if="segment?.type === 'song'"
        :key="`song-${segIdx}`"
        :segment="segment"
        @done="onSegDone"
      />
      <HandsOnPanel
        v-else-if="segment?.type === 'handsOn'"
        :key="`hands-${segIdx}`"
        :segment="segment"
        :lesson="lesson"
        @done="onSegDone"
        @showcase="goShowcase"
      />
      <WrapupPanel
        v-else-if="segment?.type === 'wrapup'"
        :key="`wrap-${segIdx}`"
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
  gap: 16px;
  min-height: 100dvh;
}
.bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.back {
  min-width: 72px;
  min-height: 72px;
  font-size: 28px;
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
}
.dot.on {
  opacity: 1;
  background: var(--level-color);
  box-shadow: var(--shadow-card);
  transform: scale(1.08);
}
.dot.done {
  opacity: 0.85;
  background: #fff3c4;
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
