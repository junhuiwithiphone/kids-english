<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getLevel, unitMap } from '@/data/levels'
import { useProgressStore } from '@/stores/progress'
import { playClick, playWrong } from '@/composables/useAudioFeedback'
import { resolve } from '@/i18n'
import StarMeter from '@/components/common/StarMeter.vue'

/* ═══ 级别地图：蜿蜒路径，每单元一行，课时节点三态（锁定/可玩/完成） ═══ */

const props = defineProps<{ levelId: string }>()
const router = useRouter()
const progress = useProgressStore()

const level = computed(() => getLevel(props.levelId))
const shaking = ref<string | null>(null)

const units = computed(() => level.value?.units ?? [])

function lessonState(lessonId: string): 'done' | 'open' | 'locked' {
  if (progress.isLessonDone(lessonId)) return 'done'
  return progress.isLessonAvailable(lessonId) ? 'open' : 'locked'
}

function tapLesson(lessonId: string) {
  if (lessonState(lessonId) === 'locked') {
    playWrong()
    shaking.value = lessonId
    setTimeout(() => (shaking.value = null), 550)
    return
  }
  playClick()
  router.push({ name: 'lesson', params: { lessonId } })
}

function openUnit(unitId: string) {
  playClick()
  router.push({ name: 'unit', params: { unitId } })
}

function backHome() {
  playClick()
  router.push({ name: 'home' })
}

/** 单元完成度（✅数/课数），供单元头显示 */
function unitProgress(unitId: string) {
  const u = unitMap.get(unitId)
  if (!u) return { done: 0, total: 0 }
  return {
    done: u.lessons.filter((l) => progress.isLessonDone(l.id)).length,
    total: u.lessons.length,
  }
}
</script>

<template>
  <div v-if="level" class="page map" :class="`level-${level.id}`">
    <header class="map-head">
      <button class="back-btn big-btn" type="button" aria-label="返回首页" @click="backHome">🏠</button>
      <div class="head-text">
        <h1>{{ level.emoji }} {{ resolve(level.name, 'zh') }}</h1>
        <p class="parent-hint">{{ resolve(level.subtitle, 'zh') }}</p>
      </div>
      <div class="head-count">
        {{ progress.levelDoneCount(level.id) }}/{{ progress.levelLessonCount(level.id) }}
      </div>
    </header>

    <p v-if="units.length === 0" class="parent-hint empty-tip">
      本级别内容制作中，先去 ⭐ 启蒙级 玩一玩吧！
    </p>

    <section
      v-for="(unit, ui) in units"
      :key="unit.id"
      class="unit-row"
    >
      <button class="unit-head" type="button" @click="openUnit(unit.id)">
        <span class="unit-emoji" aria-hidden="true">{{ unit.emoji }}</span>
        <span class="unit-title">{{ resolve(unit.title, 'zh') }}</span>
        <span class="unit-prog parent-hint">
          {{ unitProgress(unit.id).done }}/{{ unitProgress(unit.id).total }} ✅
        </span>
      </button>

      <div class="path" :class="{ reverse: ui % 2 === 1 }">
        <button
          v-for="lesson in unit.lessons"
          :key="lesson.id"
          class="node"
          :class="[lessonState(lesson.id), { shaking: shaking === lesson.id }]"
          type="button"
          :aria-label="`Day ${lesson.day}`"
          @click="tapLesson(lesson.id)"
        >
          <template v-if="lessonState(lesson.id) === 'locked'">
            <span class="node-icon">🔒</span>
          </template>
          <template v-else-if="lessonState(lesson.id) === 'done'">
            <span class="node-icon">✅</span>
            <StarMeter :earned="progress.starsOf(lesson.id)" :max="3" :size="14" :animate="false" />
          </template>
          <template v-else>
            <span class="node-icon bounce">{{ lesson.showcase ? '🎤' : '🎮' }}</span>
          </template>
          <span class="node-day">D{{ lesson.day }}</span>
        </button>
      </div>
    </section>
  </div>
  <div v-else class="page">
    <p class="parent-hint">未知级别… <button class="big-btn" @click="backHome">🏠</button></p>
  </div>
</template>

<style scoped>
.map {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.map-head {
  display: flex;
  align-items: center;
  gap: 14px;
}
.back-btn {
  font-size: 36px;
  width: var(--touch-min);
  height: var(--touch-min);
  flex-shrink: 0;
}
.head-text h1 {
  margin: 0;
  font-size: 26px;
  color: var(--level-color);
}
.head-text .parent-hint {
  margin: 2px 0 0;
}
.head-count {
  margin-left: auto;
  font-weight: 800;
  font-size: 20px;
  background: var(--c-card);
  border-radius: var(--r-full);
  padding: 8px 18px;
  box-shadow: var(--shadow-card);
}

.empty-tip {
  text-align: center;
  padding: 60px 0;
  font-size: 16px;
}

.unit-row {
  background: rgba(255, 255, 255, 0.55);
  border-radius: var(--r-lg);
  padding: 10px 12px 16px;
}
.unit-head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border-radius: var(--r-md);
  transition: background var(--t-fast);
}
.unit-head:active {
  background: rgba(0, 0, 0, 0.05);
}
.unit-emoji {
  font-size: 38px;
}
.unit-title {
  font-size: 20px;
  font-weight: 800;
}
.unit-prog {
  margin-left: auto;
}

/* 蜿蜒路径：奇数单元行反向排列 */
.path {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  padding: 8px 4px 0;
}
.path.reverse {
  flex-direction: row-reverse;
}

.node {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--c-card);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  position: relative;
  transition: transform var(--t-fast) ease;
  border: 4px solid transparent;
}
.node:active {
  transform: scale(0.94);
}
.node.open {
  border-color: var(--level-color);
  background: color-mix(in srgb, var(--level-color) 14%, #fff);
}
.node.open .node-icon.bounce {
  animation: bounce-soft 1.6s ease-in-out infinite;
}
.node.done {
  border-color: var(--c-correct);
}
.node.locked {
  filter: grayscale(0.9);
  opacity: 0.6;
}
.node.shaking {
  animation: wiggle 0.5s ease;
}
.node-icon {
  font-size: 34px;
  line-height: 1;
}
.node-day {
  font-size: 13px;
  font-weight: 800;
  color: var(--c-ink-soft);
}
</style>
