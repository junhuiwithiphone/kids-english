import { defineStore } from 'pinia'
import type { UiLang } from '../i18n'

/* ═══════════════════════════════════════════════════════════
   设置（家长可控）：语言 / 语音 / 麦克风模式 / PIN / 级别锁
   ═══════════════════════════════════════════════════════════ */

const KEY = 'kids-english:settings:v1'

/**
 * 跟读评测模式：
 * - auto: native → record → parent 自动降级
 * - native: 强制 SpeechRecognition（Chrome/Edge）
 * - record: 录音回放 + 孩子自评星
 * - parent: 家长👍确认
 */
export type MicMode = 'auto' | 'native' | 'record' | 'parent'

export interface SettingsState {
  /** 界面语言（仅影响导航/家长文案，学习内容恒英文） */
  uiLang: UiLang
  /** 指定 TTS voice 名（'' = 自动优选美音） */
  voiceName: string
  micMode: MicMode
  /** 家长中心 PIN（'' = 未设置，首次进入家长中心时引导设置；算术题始终存在） */
  parentPin: string
  /** 孩子昵称（奖状/问候用） */
  childName: string
  /** true=L2/L3 按进度锁定（家长可解锁）；false=全部开放 */
  enforceLevelLock: boolean
  soundOn: boolean
}

const defaults = (): SettingsState => ({
  uiLang: 'zh',
  voiceName: '',
  micMode: 'auto',
  parentPin: '',
  childName: '',
  enforceLevelLock: true,
  soundOn: false,
})

export const useSettingsStore = defineStore('settings', {
  state: defaults,
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(KEY)
        if (raw) this.$patch({ ...defaults(), ...JSON.parse(raw) })
      } catch {
        /* 忽略损坏数据，用默认值 */
      }
    },
    persist() {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.$state))
      } catch {
        /* 存储满/隐私模式：静默 */
      }
    },
    reset() {
      this.$patch(defaults())
    },
  },
})
