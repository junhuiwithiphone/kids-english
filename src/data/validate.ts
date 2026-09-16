import type { Curriculum, Lesson, Segment } from './schema'
import { L1_EXPECTED_WORDS } from './wordbank/l1'
import { stickerMap } from './rewards'
import { allScripts } from './scripts'

/* ═══════════════════════════════════════════════════════════
   启动时轻量校验：数据错误在控制台警告（不崩溃、不阻断课程）
   ═══════════════════════════════════════════════════════════ */

const SEGMENT_ORDER: Segment['type'][] = ['warmup', 'words', 'song', 'handsOn', 'wrapup']

export function validateCurriculum(c: Curriculum): string[] {
  const errors: string[] = []
  const wordIds = new Set(c.levels.flatMap((l) => l.wordbank.map((w) => w.id)))
  const songIds = new Set(c.levels.flatMap((l) => l.songs.map((s) => s.id)))
  const scriptIds = new Set(allScripts.map((s) => s.id))

  for (const level of c.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        checkLesson(lesson, unit.id, level.id, wordIds, songIds, scriptIds, errors)
      }
    }
  }

  checkL1Snapshot(c, errors)

  if (errors.length) {
    console.warn(`[curriculum validate] 发现 ${errors.length} 个问题：`)
    errors.forEach((e) => console.warn('  ·', e))
  } else if (import.meta.env.DEV) {
    console.info('[curriculum validate] 全部通过 ✔')
  }
  return errors
}

function checkLesson(
  lesson: Lesson,
  unitId: string,
  levelId: string,
  wordIds: Set<string>,
  songIds: Set<string>,
  scriptIds: Set<string>,
  errors: string[],
) {
  const tag = `${levelId}/${lesson.id}`
  if (lesson.unitId !== unitId) errors.push(`${tag}: unitId 不匹配（${lesson.unitId} ≠ ${unitId}）`)
  // 每课新词 ≤5（教学原则硬约束）
  if (lesson.newWordIds.length > 5) errors.push(`${tag}: 新词 ${lesson.newWordIds.length} 个 > 5`)
  // 必胜词 ≤3
  if (lesson.mustWinWords.length > 3) errors.push(`${tag}: 必胜词 ${lesson.mustWinWords.length} 个 > 3`)
  // 5 环节固定顺序
  const types = lesson.segments.map((s) => s.type)
  if (JSON.stringify(types) !== JSON.stringify(SEGMENT_ORDER)) {
    errors.push(`${tag}: 环节顺序应为 ${SEGMENT_ORDER.join('→')}，实际 ${types.join('→')}`)
  }
  // 教案脚本引用
  if (!scriptIds.has(lesson.scriptId)) errors.push(`${tag}: 未知教案脚本 ${lesson.scriptId}`)

  // 所有 word id 引用存在
  const refs = [...lesson.mustWinWords, ...lesson.newWordIds, ...lesson.reviewWordIds]
  for (const seg of lesson.segments) {
    if (seg.type === 'words') {
      refs.push(...seg.wordIds, ...(seg.reviewWordIds ?? []), ...seg.readAloud.wordIds)
      seg.games.forEach((g) => refs.push(...g.wordIds))
    }
    if (seg.type === 'song' && !songIds.has(seg.songId)) {
      errors.push(`${tag}: 未知儿歌 ${seg.songId}`)
    }
    if (seg.type === 'warmup') {
      refs.push(...(seg.anchorWordIds ?? []))
      if (seg.helloSongId && !songIds.has(seg.helloSongId)) {
        errors.push(`${tag}: 未知开场歌 ${seg.helloSongId}`)
      }
    }
    if (seg.type === 'wrapup') {
      refs.push(...seg.reviewWordIds)
      if (!stickerMap.has(seg.stickerId)) errors.push(`${tag}: 未知贴纸 ${seg.stickerId}`)
    }
  }
  for (const id of refs) {
    if (!wordIds.has(id)) errors.push(`${tag}: 未知词 id ${id}`)
  }
  // showcase 课
  if (lesson.showcase) {
    lesson.showcase.cards.forEach((card) => {
      if (card.hintWordId && !wordIds.has(card.hintWordId)) {
        errors.push(`${tag}: showcase 未知词 ${card.hintWordId}`)
      }
    })
  }
}

/** L1 词表快照断言：与庭雨教案词库逐词核对 */
function checkL1Snapshot(c: Curriculum, errors: string[]) {
  const l1 = c.levels.find((l) => l.id === 'L1')
  if (!l1) {
    errors.push('缺少 L1 级别')
    return
  }
  const l1En = new Set(l1.wordbank.map((w) => w.en.toLowerCase()))
  for (const expected of L1_EXPECTED_WORDS) {
    if (!l1En.has(expected)) errors.push(`L1 词表缺少教案词: "${expected}"`)
  }
  // L1 恰好 20 天且顺序 1..20
  const days = l1.units.flatMap((u) => u.lessons.map((l) => l.day))
  if (days.length !== 20) errors.push(`L1 应有 20 课，实际 ${days.length}`)
  const expectedDays = Array.from({ length: 20 }, (_, i) => i + 1)
  if (JSON.stringify(days) !== JSON.stringify(expectedDays)) {
    errors.push('L1 day 编号应严格为 1..20 顺序')
  }
}
