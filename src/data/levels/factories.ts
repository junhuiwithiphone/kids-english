import type {
  GameConfig,
  GameType,
  HandsOnSegment,
  SongSegment,
  TtsLine,
  WarmupSegment,
  WordsSegment,
  WrapupSegment,
} from '../schema'

/* ═══════════════════════════════════════════════════════════
   环节/游戏数据工厂 — 减少课程数据文件样板代码
   L1/L2/L3 课程文件共用；默认值即 4 岁规范（选项3个、每轮1星）
   ═══════════════════════════════════════════════════════════ */

/** 教案标准开场问候（可被单课覆盖） */
export const defaultGreeting: TtsLine[] = [
  { text: 'Hello, my little star!', zh: '抱抱宝宝，热情地说：Hello, my little star!' },
  { text: "I'm so happy to see you!", zh: "中文辅助一次：老师好开心见到你！" },
]

export function warmup(opts: Partial<WarmupSegment> = {}): WarmupSegment {
  return {
    type: 'warmup',
    greetingLines: defaultGreeting,
    helloSongId: 'l1-s-hello',
    announceMustWin: true,
    maxStars: 1,
    ...opts,
  }
}

export function words(
  wordIds: string[],
  games: GameConfig[] = [],
  readAloudWordIds: string[] = [],
  opts: Partial<WordsSegment> = {},
): WordsSegment {
  return {
    type: 'words',
    wordIds,
    reviewWordIds: [],
    presentMode: wordIds.some((id) => id.includes('-w-')) ? 'card+tpr' : 'card',
    games,
    readAloud: { enabled: readAloudWordIds.length > 0, wordIds: readAloudWordIds },
    maxStars: 4,
    ...opts,
  }
}

export function song(songId: string, movementZh: string, movementEn = 'Stand up and move!'): SongSegment {
  return {
    type: 'song',
    songId,
    movement: { en: movementEn, zh: movementZh },
    maxStars: 2,
  }
}

export function handsOn(activity: HandsOnSegment['activity'], maxStars = 2): HandsOnSegment {
  return { type: 'handsOn', activity, maxStars }
}

export function wrapup(
  reviewWordIds: string[],
  stickerId: string,
  opts: Partial<WrapupSegment> = {},
): WrapupSegment {
  return {
    type: 'wrapup',
    reviewWordIds,
    stickerId,
    goodbyeLines: [
      { text: 'Good job! See you tomorrow!', zh: '夸夸宝宝：做得好！明天见！（大大的拥抱）' },
    ],
    maxStars: 2,
    ...opts,
  }
}

/** 游戏配置工厂：按题型给 4 岁友好默认值 */
export function game(
  type: GameType,
  wordIds: string[],
  rounds: number,
  extra: Partial<GameConfig> = {},
): GameConfig {
  const base: GameConfig = { type, wordIds, rounds, starsPerRound: 1 }
  switch (type) {
    case 'listen-pick':
      return { ...base, optionsPerRound: 3, ...extra }
    case 'tpr-command':
      return { ...base, starsPerRound: 2, allowParentConfirm: true, rounds: 1, ...extra }
    case 'match-pairs':
      return { ...base, rounds: 1, ...extra }
    case 'mole':
      return { ...base, ...extra }
    case 'read-aloud-gate':
      return { ...base, starsPerRound: 2, passThreshold: wordIds.length, rounds: wordIds.length, ...extra }
  }
}
