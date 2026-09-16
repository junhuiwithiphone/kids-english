<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Lesson } from '@/data/schema'
import { curriculum, getLevel, levelOfLesson } from '@/data/levels'
import { useProgressStore } from '@/stores/progress'
import { useSettingsStore } from '@/stores/settings'
import { playClick, playWrong } from '@/composables/useAudioFeedback'
import { resolve } from '@/i18n'
import { useT } from '@/i18n'

/* ═══ 首页：继续学习超大卡 + 级别入口 + 奖励/复习/家长 ═══ */

const router = useRouter()
const progress = useProgressStore()
const settings = useSettingsStore()
const t = useT()

const lockedShake = ref<string | null>(null)

function isLevelUnlocked(levelId: string): boolean {
  if (!settings.enforceLevelLock) return true
  if (levelId === 'L1') return true
  const prev = levelId === 'L2' ? 'L1' : 'L2'
  return progress.isLevelComplete(prev)
}

/** 继续学习：优先 resume 断点，否则下一课（跳过被锁级别→回落 L1） */
const continueLesson = computed<Lesson | undefined>(() => {
  if (progress.resume && !progress.isLessonDone(progress.resume.lessonId)) {
    const l = curriculum.levels
      .flatMap((lv) => lv.units)
      .flatMap((u) => u.lessons)
      .find((x) => x.id === progress.resume!.lessonId)
    if (l) return l
  }
  const next = progress.nextLesson
  if (next) {
    const lv = levelOfLesson(next.id)
    if (lv && isLevelUnlocked(lv.id)) return next
  }
  // 下一课被锁 → 回落 L1 第一节未完成课
  return getLevel('L1')?.units.flatMap((u) => u.lessons).find((l) => !progress.isLessonDone(l.id))
})

const continueLabel = computed(() =>
  progress.doneCount === 0 ? 'Start!' : progress.resume ? 'Continue!' : 'Next!',
)

function startLesson(lesson?: Lesson) {
  if (!lesson) return
  playClick()
  router.push({ name: 'lesson', params: { lessonId: lesson.id } })
}

function openLevel(levelId: string) {
  if (!isLevelUnlocked(levelId)) {
    playWrong()
    lockedShake.value = levelId
    setTimeout(() => (lockedShake.value = null), 600)
    return
  }
  playClick()
  router.push({ name: 'level', params: { levelId } })
}

function openRoute(name: string) {
  playClick()
  router.push({ name })
}
</script>

<template>
  <div class="page home">
    <!-- 顶部问候 -->
    <header class="hello">
      <div class="mascot" aria-hidden="true">🐣</div>
      <div class="hello-text">
        <h1>绮梦英语</h1>
        <p class="parent-hint">
          {{ settings.childName ? `${settings.childName}，` : '' }}今天也要开开心心学英语呀！
          <span class="streak" v-if="progress.streak > 0">🔥 连续 {{ progress.streak }} 天</span>
        </p>
      </div>
      <div class="star-jar" @click="openRoute('rewards')" role="button" aria-label="奖励室">
        <span class="jar-emoji" aria-hidden="true">🍯</span>
        <span class="jar-count">⭐ {{ progress.totalStars }}</span>
      </div>
    </header>

    <!-- 继续学习超大卡 -->
    <button
      v-if="continueLesson"
      class="continue-card big-btn"
      type="button"
      @click="startLesson(continueLesson)"
    >
      <span class="play-icon" aria-hidden="true">▶</span>
      <span class="continue-info">
        <span class="continue-en">{{ continueLabel }}</span>
        <span class="continue-zh parent-hint">
          {{ levelOfLesson(continueLesson.id)?.emoji }} Day {{ continueLesson.day }} ·
          {{ resolve(continueLesson.title, 'zh') }}
        </span>
      </span>
      <span class="continue-emoji" aria-hidden="true">
        {{ continueLesson.showcase ? '🎤' : '🚀' }}
      </span>
    </button>

    <!-- 级别入口 -->
    <section class="levels">
      <button
        v-for="level in curriculum.levels"
        :key="level.id"
        class="level-card"
        :class="[`level-${level.id}`, { locked: !isLevelUnlocked(level.id), shake: lockedShake === level.id }]"
        type="button"
        @click="openLevel(level.id)"
      >
        <span class="level-emoji" aria-hidden="true">
          {{ isLevelUnlocked(level.id) ? level.emoji : '🔒' }}
        </span>
        <span class="level-name">{{ resolve(level.name, settings.uiLang) }}</span>
        <span class="level-sub parent-hint">
          {{ level.units.length > 0 ? `${progress.levelDoneCount(level.id)}/${progress.levelLessonCount(level.id)} 课` : '即将开放' }}
        </span>
      </button>
    </section>

    <!-- 底部入口 -->
    <nav class="bottom-nav">
      <button class="nav-btn big-btn" type="button" aria-label="奖励室" @click="openRoute('rewards')">
        🎁
      </button>
      <button class="nav-btn big-btn" type="button" aria-label="点读复习墙" @click="openRoute('review')">
        🔊
      </button>
      <button
        class="nav-btn parent-btn big-btn"
        type="button"
        aria-label="家长中心"
        @click="openRoute('parent')"
      >
        🔒
      </button>
    </nav>

    <p class="parent-hint lock-tip">
      家长提示：{{ t({ en: 'L2/L3 unlock after finishing the previous level', zh: '完成上一级别后自动解锁 L2/L3，可在家长中心关闭锁定' }) }}
    </p>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.hello {
  display: flex;
  align-items: center;
  gap: 14px;
}
.mascot {
  font-size: 56px;
  animation: bounce-soft 2.4s ease-in-out infinite;
}
.hello-text h1 {
  margin: 0;
  font-size: var(--f-title);
}
.hello-text .parent-hint {
  margin: 2px 0 0;
}
.streak {
  color: #ef6c00;
  font-weight: 700;
}
.star-jar {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 8px 16px;
  cursor: pointer;
}
.jar-emoji {
  font-size: 34px;
}
.jar-count {
  font-weight: 800;
  font-size: 16px;
}

.continue-card {
  width: 100%;
  min-height: 130px;
  background: linear-gradient(135deg, var(--c-l1), #ffd54f);
  color: #fff;
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-pop);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 26px;
  text-align: left;
  animation: breathe 3s ease-in-out infinite;
}
.play-icon {
  font-size: 40px;
  background: rgba(255, 255, 255, 0.28);
  border-radius: 50%;
  width: 76px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.continue-info {
  display: flex;
  flex-direction: column;
}
.continue-en {
  font-size: 34px;
  font-weight: 800;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.12);
}
.continue-zh {
  color: rgba(255, 255, 255, 0.9) !important;
}
.continue-emoji {
  margin-left: auto;
  font-size: 56px;
}

.levels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--touch-gap);
}
.level-card {
  --level-color: var(--c-l1);
  min-height: 150px;
  background: var(--c-card);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-bottom: 8px solid var(--level-color);
  transition: transform var(--t-fast) ease;
  padding: 12px;
}
.level-card:active {
  transform: scale(0.96);
}
.level-card.locked {
  filter: grayscale(0.7);
  opacity: 0.75;
}
.level-card.shake {
  animation: wiggle 0.5s ease;
}
.level-emoji {
  font-size: 52px;
}
.level-name {
  font-size: 22px;
  font-weight: 800;
}
.level-sub {
  font-size: var(--f-parent);
}

.bottom-nav {
  display: flex;
  gap: var(--touch-gap);
  justify-content: center;
}
.nav-btn {
  font-size: 44px;
  width: var(--touch-min);
  height: var(--touch-min);
}
.parent-btn {
  font-size: 26px;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  align-self: center;
  opacity: 0.65;
  box-shadow: var(--shadow-card);
}
.lock-tip {
  text-align: center;
  margin: 0 auto;
  max-width: 520px;
}
</style>
