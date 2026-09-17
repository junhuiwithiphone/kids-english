/* ═══════════════════════════════════════════════════════════
   绮梦英语 · 课程数据模型
   数据驱动：组件/引擎不含课程硬编码，扩级只加数据文件。
   L1 对齐《庭雨--Monthly英语教学-20260715.docx》20天教案。
   ═══════════════════════════════════════════════════════════ */

/** 双语文案：儿童界面学习内容恒英文，导航/家长文案按 uiLang 取 */
export interface Bilingual {
  en: string
  zh: string
}

export type LevelId = 'L1' | 'L2' | 'L3'

/* ─────────────── 词汇 ─────────────── */

export type WordKind = 'noun' | 'verb' | 'phrase' | 'adj'

export interface Word {
  /** 全局唯一 id（掌握度主键），如 'l1-w-head' */
  id: string
  en: string
  zh: string
  /** 首选视觉：emoji */
  emoji?: string
  /** emoji 不佳时用内联 SVG（components/common/svg 注册表键） */
  svgKey?: string
  /** 颜色词：直接渲染大色块 */
  colorHex?: string
  /** TTS 朗读文本覆盖（默认 = en） */
  audioText?: string
  /** 单词单独语速覆盖（默认走全局慢速档） */
  ttsRate?: number
  kind: WordKind
  /** 组卷标签：['body','w1','phonics-at',...] 干扰项按同 tag 抽取 */
  tags: string[]
  /** TPR 动作提示（中文，给家长/图标下小字） */
  tprAction?: string
}

/* ─────────────── 儿歌 ─────────────── */

export interface SongLine {
  text: string
  /** 家长参考译文（儿童界面默认隐藏） */
  zh?: string
  /** 动作提示：emoji + 中文，如 '🙌 双手摸头' */
  action?: string
  /** 该行连读次数（副歌重复） */
  repeat?: number
}

export interface Song {
  id: string
  title: Bilingual
  /** traditional=公版传统儿歌 / original=自编 chant */
  source: 'traditional' | 'original'
  lines: SongLine[]
  /** TTS 节奏语速 0.7~1.0（无 audioUrl 时用） */
  baseRate: number
  /** chant=行间隔打拍点；slow=慢速逐行 */
  beatMode?: 'chant' | 'slow'
  /** 真实歌曲音频（public/songs/…），有则优先播放，不再念标题 */
  audioUrl?: string
}

/* ─────────────── 游戏（数据驱动） ─────────────── */

export type GameType =
  | 'listen-pick' // 听音选图
  | 'match-pairs' // 图词配对
  | 'tpr-command' // TPR 指令 Simon Says（家长确认）
  | 'mole' // 打地鼠复习
  | 'read-aloud-gate' // 跟读闯关

export interface GameConfig {
  type: GameType
  /** 题池 word id；干扰项自动从同 tag 词池抽取 */
  wordIds: string[]
  /** 题数/轮数 */
  rounds: number
  /** 听音选图每屏选项数（4岁默认3） */
  optionsPerRound?: number
  /** 每轮星星 */
  starsPerRound: number
  /** tpr-command 必为 true：家长长按确认得星 */
  allowParentConfirm?: boolean
  /** read-aloud-gate：过关词数 */
  passThreshold?: number
  /** 游戏标题（可选，儿童界面用图标） */
  title?: Bilingual
}

/* ─────────────── 课程环节（判别联合，5环节固定顺序） ─────────────── */

export interface TtsLine {
  /** 屏显英文 */
  text: string
  /** 家长中文引导 */
  zh: string
}

/** 环节1：Warm-up 问候（衔接锚点 + 必胜词预告） */
export interface WarmupSegment {
  type: 'warmup'
  greetingLines: TtsLine[]
  /** 固定开场歌 */
  helloSongId?: string
  /** 衔接锚点：复用上节课的词卡（教案原则） */
  anchorWordIds?: string[]
  /** 预告今日3必胜词 */
  announceMustWin: boolean
  maxStars: number
}

/** 环节2：Words + TPR（新词输入 ≤5 + 游戏 + 跟读可跳过） */
export interface WordsSegment {
  type: 'words'
  /** 新词（≤5，validate 强制） */
  wordIds: string[]
  /** 复习旧词 */
  reviewWordIds?: string[]
  presentMode: 'card' | 'card+tpr'
  games: GameConfig[]
  readAloud: {
    /** false=本课不开跟读（零输出日原则） */
    enabled: boolean
    /** 跟读目标词（通常 = mustWinWords） */
    wordIds: string[]
  }
  maxStars: number
}

/** 环节3：Song 儿歌唱跳 */
export interface SongSegment {
  type: 'song'
  songId: string
  /** 「站起来跟着做动作！」 */
  movement: Bilingual
  maxStars: number
}

/** 环节4：Hands-on 线下动手活动 */
export interface HandsOnSegment {
  type: 'handsOn'
  activity: {
    kind: 'coloring' | 'craft' | 'pretend-play' | 'worksheet' | 'book'
    title: Bilingual
    /** 指导卡片步骤 */
    steps: TtsLine[]
    /** 可打印涂色页（SVG 注册表键，line-art 变体） */
    printableSvgKey?: string
    /** 给家长的中文引导话术 */
    parentGuideZh: string
  }
  maxStars: number
}

/** 环节5：Wrap-up 总结奖励 */
export interface WrapupSegment {
  type: 'wrapup'
  /** 快速点读回顾词 */
  reviewWordIds: string[]
  /** 本课贴纸 id（data/rewards 目录） */
  stickerId: string
  /** 告别语 */
  goodbyeLines?: TtsLine[]
  maxStars: number
}

export type Segment =
  | WarmupSegment
  | WordsSegment
  | SongSegment
  | HandsOnSegment
  | WrapupSegment

/* ─────────────── Showcase 展示课（Day 20） ─────────────── */

export interface ShowcaseCard {
  /** 家长问的英文问题（TTS 朗读） */
  prompt: string
  promptZh: string
  /** 期望答案提示词 */
  hintWordId?: string
  hintEmoji?: string
}

export interface ShowcaseConfig {
  cards: ShowcaseCard[]
  certificateTitle: Bilingual
}

/* ─────────────── 课时 / 单元 / 级别 ─────────────── */

export interface Lesson {
  /** 如 'l1-u1-d1' */
  id: string
  unitId: string
  /** 教案第几天（L1: 1~20 严格对齐庭雨教案） */
  day: number
  title: Bilingual
  /** 网站课建议时长（分钟） */
  estimatedMinutes: number
  /** ★ 今日3个必胜词 id（主动输出目标） */
  mustWinWords: string[]
  /** 新词 id（≤5） */
  newWordIds: string[]
  /** 复习词 id */
  reviewWordIds: string[]
  /** 固定5环节，顺序即播放顺序 */
  segments: Segment[]
  /** 指向 data/scripts 的家长教案脚本 id */
  scriptId: string
  /** Day20 展示课专用 */
  showcase?: ShowcaseConfig
}

export interface Unit {
  /** 如 'l1-u1' */
  id: string
  levelId: LevelId
  order: number
  title: Bilingual
  emoji: string
  /** 对齐教案周主题：'body'|'colors'|'food'|'clothes'|... */
  weekTheme: string
  lessons: Lesson[]
}

export interface Level {
  id: LevelId
  /** L1: { en:'Magic Start', zh:'启蒙级' } */
  name: Bilingual
  subtitle: Bilingual
  emoji: string
  /** 主题色 token：'L1'|'L2'|'L3' 对应 --c-l1/2/3 */
  themeColor: string
  units: Unit[]
  /** 由 levels/index.ts 注入 */
  wordbank: Word[]
  songs: Song[]
}

export interface Curriculum {
  /** 数据版本（localStorage 迁移用） */
  version: number
  levels: Level[]
}

/* ─────────────── 家长教案脚本 ─────────────── */

export interface ScriptSection {
  /** 环节名：'Warm-up' / '输入与游戏' / ... */
  name: string
  /** 建议用时：'0–5分钟' */
  minutes: string
  /** 中文脚本内容（含英文话术原文） */
  content: string
}

export interface LessonScript {
  id: string
  lessonId: string
  day: number
  titleZh: string
  /** 教具准备清单 */
  materialsZh: string[]
  sections: ScriptSection[]
}

/* ─────────────── 奖励目录 ─────────────── */

export interface Sticker {
  id: string
  emoji: string
  name: Bilingual
}

export interface Badge {
  id: string
  emoji: string
  name: Bilingual
  desc: Bilingual
}
