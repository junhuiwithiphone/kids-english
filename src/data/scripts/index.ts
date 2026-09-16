import type { LessonScript } from '../schema'
import { l1Scripts } from './l1'
import { l2Scripts } from './l2'
import { l3Scripts } from './l3'

/* ═══ 教案脚本汇总 ═══ */

export const allScripts: LessonScript[] = [...l1Scripts, ...l2Scripts, ...l3Scripts]

export const scriptMap = new Map(allScripts.map((s) => [s.id, s]))

export function getScript(id: string): LessonScript | undefined {
  return scriptMap.get(id)
}

export function getScriptByLesson(lessonId: string): LessonScript | undefined {
  return allScripts.find((s) => s.lessonId === lessonId)
}

/** 教案总原则（家长中心置顶展示，来自庭雨教案"专八级落地建议"） */
export const teachingPrinciples = [
  {
    title: '每天只记 3 个"必胜词"',
    content:
      '当天她只要主动说出这 3 个词（哪怕发音严重不准），就算教学成功，不要贪多。网站上每课开头的"今日必胜词"预告即对应此原则。',
  },
  {
    title: '第二天前 3 分钟必复盘（衔接锚点）',
    content:
      'Day N 的 warm-up 必须用 Day N-1 的最后一个道具（比如 Day2 拿 Day1 的小人），这叫"衔接锚点"，4 岁孩子极其吃这一套。',
  },
  {
    title: '允许"零输出日"',
    content:
      '如果某天她全程只说中文，没关系。你只需把英文输入量加倍，用动作回应她中文（她说"我要苹果"，你递给她时夸张说 "APPLE! Here!"），这叫"沉浸式接收期"，下个月她会井喷。',
  },
  {
    title: '每 15 分钟切换活动（动静交替）',
    content:
      '若她第 30 分钟明显走神，直接跳入唱歌环节，不要硬拉回座位。',
  },
]

/** 每日 60 分钟流程表（家长中心展示） */
export const dailyFlow = [
  { minutes: '0–5′', name: 'Warm-up Greeting', purpose: '建立情感联结 + 唤醒英文耳朵' },
  { minutes: '5–20′', name: 'Topic Input + TPR Game', purpose: '新词输入（每次≤5个）＋身体反应' },
  { minutes: '20–35′', name: 'Active Song / Movement', purpose: '节奏＋动作＋听力辨音' },
  { minutes: '35–50′', name: 'Hands-on Activity', purpose: '精细动作/桌游/绘本（安静输出）' },
  { minutes: '50–60′', name: 'Wrap-up & Reward', purpose: '回顾＋拥抱＋预告明日惊喜' },
]
