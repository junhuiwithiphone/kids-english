import { defineStore } from 'pinia'
import type { Lesson } from '../data/schema'
import { allLessons, findNextLesson, getLesson, levelMap, unitMap } from '../data/levels'
import { stickerMap } from '../data/rewards'

/* ═══════════════════════════════════════════════════════════
   学习进度：课时完成 / 词汇掌握度 / 星星 / 贴纸勋章 /
   打卡 streak / 断点续玩 —— localStorage 持久化
   ═══════════════════════════════════════════════════════════ */

const KEY = 'kids-english:progress:v1'
const VERSION = 1

export interface LessonRecord {
  stars: number
  completedAt: string
  /** 5 环节各自得星（结算页回放动画用） */
  segmentStars: number[]
}

export interface DailyEntry {
  lessons: number
  stars: number
  /** 跟读次数（零输出日标注用） */
  reads: number
}

export interface ReadAloudStat {
  count: number
  total: number
  best: number
}

export interface ProgressState {
  version: number
  lessons: Record<string, LessonRecord>
  /** wordId → mastery 0-5 */
  mastery: Record<string, number>
  totalStars: number
  stickers: string[]
  badges: string[]
  /** 'YYYY-MM-DD' → 当日汇总 */
  daily: Record<string, DailyEntry>
  streak: number
  lastPlayedDate: string | null
  /** 断点续玩 */
  resume: { lessonId: string; segmentIndex: number; savedAt: string } | null
  /** wordId → 跟读成绩（家长报告均分用） */
  readAlouds: Record<string, ReadAloudStat>
}

/* ── 工具 ── */

export function dateKey(d = new Date()): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function yesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return dateKey(d)
}

const defaults = (): ProgressState => ({
  version: VERSION,
  lessons: {},
  mastery: {},
  totalStars: 0,
  stickers: [],
  badges: [],
  daily: {},
  streak: 0,
  lastPlayedDate: null,
  resume: null,
  readAlouds: {},
})

export const useProgressStore = defineStore('progress', {
  state: defaults,

  getters: {
    doneSet(): Set<string> {
      return new Set(Object.keys(this.lessons))
    },
    doneCount(): number {
      return Object.keys(this.lessons).length
    },
    /** 下一节未完成的课（不考虑级别锁，UI 层再过滤） */
    nextLesson(): Lesson | undefined {
      return findNextLesson(this.doneSet)
    },
    /** 今天的 daily 条目（无则 undefined） */
    todayEntry(): DailyEntry | undefined {
      return this.daily[dateKey()]
    },
  },

  actions: {
    /* ── 持久化 ── */
    load() {
      try {
        const raw = localStorage.getItem(KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (parsed && typeof parsed === 'object' && parsed.version === VERSION) {
            this.$patch({ ...defaults(), ...parsed })
          }
          // 版本不符：暂不迁移，直接弃用旧数据（v1 首版）
        }
      } catch {
        /* 忽略 */
      }
    },
    persist() {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.$state))
      } catch {
        /* 静默 */
      }
    },

    /* ── 查询 ── */
    isLessonDone(lessonId: string): boolean {
      return !!this.lessons[lessonId]
    },
    starsOf(lessonId: string): number {
      return this.lessons[lessonId]?.stars ?? 0
    },
    masteryOf(wordId: string): number {
      return this.mastery[wordId] ?? 0
    },
    /** 某课当前是否可玩：自身已完成，或前一课已完成，或全路径第一课 */
    isLessonAvailable(lessonId: string): boolean {
      if (this.lessons[lessonId]) return true
      const idx = allLessons.findIndex((l) => l.id === lessonId)
      if (idx <= 0) return idx === 0
      return !!this.lessons[allLessons[idx - 1].id]
    },
    isLevelComplete(levelId: string): boolean {
      const level = levelMap.get(levelId as 'L1' | 'L2' | 'L3')
      if (!level || level.units.length === 0) return false
      return level.units
        .flatMap((u) => u.lessons)
        .every((l) => !!this.lessons[l.id])
    },
    levelDoneCount(levelId: string): number {
      const level = levelMap.get(levelId as 'L1' | 'L2' | 'L3')
      if (!level) return 0
      return level.units.flatMap((u) => u.lessons).filter((l) => !!this.lessons[l.id]).length
    },
    levelLessonCount(levelId: string): number {
      const level = levelMap.get(levelId as 'L1' | 'L2' | 'L3')
      if (!level) return 0
      return level.units.flatMap((u) => u.lessons).length
    },

    /* ── 打卡 / 星 ── */
    touchDaily(lessonDelta = 0, starDelta = 0, readDelta = 0) {
      const today = dateKey()
      if (this.lastPlayedDate !== today) {
        this.streak = this.lastPlayedDate === yesterdayKey() ? this.streak + 1 : 1
        this.lastPlayedDate = today
      }
      const entry = this.daily[today] ?? { lessons: 0, stars: 0, reads: 0 }
      this.daily[today] = {
        lessons: entry.lessons + lessonDelta,
        stars: entry.stars + starDelta,
        reads: entry.reads + readDelta,
      }
    },

    /** 完成一课：入账星星/贴纸/掌握度/打卡/勋章（重玩按最高分补差） */
    completeLesson(lessonId: string, segmentStars: number[]) {
      const lesson = getLesson(lessonId)
      if (!lesson) return
      const stars = segmentStars.reduce((a, b) => a + b, 0)
      const prev = this.lessons[lessonId]
      this.lessons[lessonId] = {
        stars,
        completedAt: new Date().toISOString(),
        segmentStars,
      }
      const delta = Math.max(0, stars - (prev?.stars ?? 0))
      this.totalStars += delta

      // 贴纸（wrapup 环节配置）
      const wrap = lesson.segments.find((s) => s.type === 'wrapup')
      if (wrap && wrap.type === 'wrapup' && stickerMap.has(wrap.stickerId)) {
        if (!this.stickers.includes(wrap.stickerId)) this.stickers.push(wrap.stickerId)
      }
      // 新词至少「见过」
      for (const id of lesson.newWordIds) this.bumpMastery(id, 1)
      // 必胜词若本课跟读过（readAlouds 有记录）自然已 ≥3，这里保底 2
      for (const id of lesson.mustWinWords) this.bumpMastery(id, 2)

      this.touchDaily(1, delta)
      this.clearResume()
      this.checkBadges()
    },

    /* ── 词汇掌握度（0未学 1见过 2听懂 3跟读过 4游戏连对 5主动输出） ── */
    bumpMastery(wordId: string, to: number) {
      if ((this.mastery[wordId] ?? 0) < to) this.mastery[wordId] = to
    },

    recordReadAloud(wordId: string, score: number) {
      const stat = this.readAlouds[wordId] ?? { count: 0, total: 0, best: 0 }
      this.readAlouds[wordId] = {
        count: stat.count + 1,
        total: stat.total + score,
        best: Math.max(stat.best, score),
      }
      this.bumpMastery(wordId, score >= 60 ? 3 : 2)
      this.touchDaily(0, 0, 1)
      this.checkBadges()
    },

    /** Showcase / 自由点读主动输出 → mastery 5 */
    markOutput(wordId: string) {
      this.bumpMastery(wordId, 5)
    },

    completeShowcase(lessonId: string) {
      this.completeLesson(lessonId, [1, 0, 0, 0, 0])
      this.awardBadge('showcase-l1')
    },

    /* ── 勋章 ── */
    awardBadge(id: string) {
      if (!this.badges.includes(id)) this.badges.push(id)
    },
    checkBadges() {
      if (this.doneCount >= 1) this.awardBadge('first-lesson')
      if (this.streak >= 7) this.awardBadge('streak-7')
      if (this.totalStars >= 100) this.awardBadge('stars-100')
      // 单元勋章（unit-l1-u1 = `unit-${unit.id}`）
      for (const [unitId, unit] of unitMap) {
        if (unit.lessons.length > 0 && unit.lessons.every((l) => !!this.lessons[l.id])) {
          this.awardBadge(`unit-${unitId}`)
        }
      }
      // 跟读小能手：10 个词 best ≥ 60
      const readers = Object.values(this.readAlouds).filter((s) => s.best >= 60).length
      if (readers >= 10) this.awardBadge('reader-10')
      // 级别毕业
      for (const lid of ['L1', 'L2', 'L3'] as const) {
        if (this.isLevelComplete(lid)) this.awardBadge(`level-${lid.toLowerCase()}`)
      }
    },

    /* ── 断点续玩 ── */
    saveResume(lessonId: string, segmentIndex: number) {
      this.resume = { lessonId, segmentIndex, savedAt: new Date().toISOString() }
    },
    clearResume() {
      this.resume = null
    },

    /* ── 家长：导出 / 导入 / 重置 ── */
    exportData(): string {
      return JSON.stringify({ app: 'kids-english', version: VERSION, state: this.$state }, null, 2)
    },
    importData(json: string): boolean {
      try {
        const obj = JSON.parse(json)
        const state = obj?.state ?? obj
        if (!state || typeof state !== 'object' || typeof state.lessons !== 'object') return false
        this.$patch({ ...defaults(), ...state, version: VERSION })
        return true
      } catch {
        return false
      }
    },
    resetAll() {
      this.$patch(defaults())
      try {
        localStorage.removeItem(KEY)
      } catch {
        /* 静默 */
      }
    },
  },
})
