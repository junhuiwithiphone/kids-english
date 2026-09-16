import type { Curriculum, Lesson, Level, LevelId, Song, Unit, Word } from '../schema'
import { levelL1 } from './l1'
import { levelL2 } from './l2'
import { levelL3 } from './l3'
import { validateCurriculum } from '../validate'

/* ═══════════════════════════════════════════════════════════
   课程汇总 + 全局查询表（应用启动时构建一次）
   ═══════════════════════════════════════════════════════════ */

export const curriculum: Curriculum = {
  version: 1,
  levels: [levelL1, levelL2, levelL3],
}

export const levelMap = new Map<LevelId, Level>(curriculum.levels.map((l) => [l.id, l]))

export const wordMap = new Map<string, Word>(
  curriculum.levels.flatMap((l) => l.wordbank).map((w) => [w.id, w]),
)

export const songMap = new Map<string, Song>(
  curriculum.levels.flatMap((l) => l.songs).map((s) => [s.id, s]),
)

/** 全部单元（按级别与顺序） */
export const allUnits: Unit[] = curriculum.levels.flatMap((l) => l.units)
export const unitMap = new Map(allUnits.map((u) => [u.id, u]))

/** 全部课时（按级别→单元→课序排列，即学习路径顺序） */
export const allLessons: Lesson[] = allUnits.flatMap((u) => u.lessons)
export const lessonMap = new Map(allLessons.map((l) => [l.id, l]))

export function getLevel(id: string | undefined | null): Level | undefined {
  return id ? levelMap.get(id as LevelId) : undefined
}
export function getUnit(id: string | undefined | null): Unit | undefined {
  return id ? unitMap.get(id) : undefined
}
export function getLesson(id: string | undefined | null): Lesson | undefined {
  return id ? lessonMap.get(id) : undefined
}
export function getWord(id: string): Word {
  const w = wordMap.get(id)
  if (!w) throw new Error(`[curriculum] 未知词 id: ${id}`)
  return w
}
export function getSong(id: string): Song {
  const s = songMap.get(id)
  if (!s) throw new Error(`[curriculum] 未知儿歌 id: ${id}`)
  return s
}
export function wordsByIds(ids: string[]): Word[] {
  return ids.map(getWord)
}

/** 某课所属级别 */
export function levelOfLesson(lessonId: string): Level | undefined {
  const lesson = getLesson(lessonId)
  if (!lesson) return undefined
  const unit = getUnit(lesson.unitId)
  return unit ? getLevel(unit.levelId) : undefined
}

/** 全部课时的有序 id 列表（跨级别） */
export const lessonOrder: string[] = allLessons.map((l) => l.id)

/** 下一节未完成的课（doneSet: 已完成 lessonId 集合） */
export function findNextLesson(doneSet: Set<string>): Lesson | undefined {
  return allLessons.find((l) => !doneSet.has(l.id))
}

/** 某课在顺序中的前一课 */
export function prevLessonOf(lessonId: string): Lesson | undefined {
  const i = lessonOrder.indexOf(lessonId)
  return i > 0 ? lessonMap.get(lessonOrder[i - 1]) : undefined
}

/* 启动时轻量校验（开发期在控制台给出警告，不阻断运行） */
validateCurriculum(curriculum)
