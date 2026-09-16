import type { Bilingual } from './data/schema'
import { useSettingsStore } from './stores/settings'

/* ═══════════════════════════════════════════════════════════
   极简双语：不引 i18n 库，Bilingual 结构 + resolve 函数。
   儿童屏学习内容恒英文；中文只出现在家长提示/家长中心。
   ═══════════════════════════════════════════════════════════ */

export type UiLang = 'zh' | 'en' | 'both'

/** 按语言偏好解析双语文案 */
export function resolve(b: Bilingual | string, lang: UiLang): string {
  if (typeof b === 'string') return b
  if (lang === 'en') return b.en
  if (lang === 'zh') return b.zh
  return `${b.en} · ${b.zh}`
}

/** 组件内使用：const t = useT(); t(lesson.title) */
export function useT() {
  const settings = useSettingsStore()
  return (b: Bilingual | string) => resolve(b, settings.uiLang)
}

/** 双语文案是否显示中文副行（儿童界面用） */
export function useShowZh() {
  const settings = useSettingsStore()
  return () => settings.uiLang !== 'en'
}
