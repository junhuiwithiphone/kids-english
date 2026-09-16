import type { Word } from './schema'
import { allLessons, getLesson, getUnit, wordMap } from './levels'

/* ═══════════════════════════════════════════════════════════
   组卷策略：干扰项抽取 / 复习词池
   ═══════════════════════════════════════════════════════════ */

/** Fisher-Yates 洗牌（返回新数组，不改原数组） */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * 为 word 抽取 n 个干扰项：
 * 1. 优先同 tag（如 body 词互扰、颜色词互扰）
 * 2. 不足时从同级别词库补齐
 */
export function pickDistractors(word: Word, pool: readonly Word[], n: number): Word[] {
  const mainTag = word.tags[0]
  const sameTag = shuffle(pool.filter((w) => w.id !== word.id && w.tags.includes(mainTag)))
  const others = shuffle(pool.filter((w) => w.id !== word.id && !w.tags.includes(mainTag)))
  return [...sameTag, ...others].slice(0, n)
}

/** 某级别的全部词（供组卷） */
export function wordsOfLevel(levelId: string): Word[] {
  const ids = new Set<string>()
  for (const lesson of allLessons) {
    const unit = getUnit(lesson.unitId)
    if (unit?.levelId !== levelId) continue
    lesson.newWordIds.forEach((id) => ids.add(id))
    lesson.reviewWordIds.forEach((id) => ids.add(id))
  }
  return [...ids].map((id) => wordMap.get(id)!).filter(Boolean)
}

/**
 * 复习词池：某课之前（同级别）学过的所有新词，
 * 未掌握（mastery 低）的排前面 —— 打地鼠/自由复习组卷用。
 */
export function buildReviewPool(lessonId: string, masteryOf: (wordId: string) => number): Word[] {
  const lesson = getLesson(lessonId)
  if (!lesson) return []
  const unit = getUnit(lesson.unitId)
  if (!unit) return []
  const seen: string[] = []
  for (const l of allLessons) {
    const u = getUnit(l.unitId)
    if (u?.levelId !== unit.levelId) continue
    if (l.day >= lesson.day) break
    seen.push(...l.newWordIds)
  }
  const uniq = [...new Set(seen)]
  return uniq
    .map((id) => wordMap.get(id)!)
    .filter(Boolean)
    .sort((a, b) => masteryOf(a.id) - masteryOf(b.id))
}

/** 随机整数 [min, max] */
export function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1))
}
