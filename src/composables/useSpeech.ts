import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import type { Word } from '../data/schema'
import { useSettingsStore } from '../stores/settings'

/* ═══════════════════════════════════════════════════════════
   TTS 语音层（Web Speech API）
   - en-US voice 优选链（Edge Natural > Google US > Samantha…）
   - 三档语速：slow 0.7 / normal 0.85 / chant 1.0
   - 首次手势解锁（移动端 autoplay 限制）
   - 不支持时 supported=false，组件降级为「请家长读」
   ═══════════════════════════════════════════════════════════ */

export type RateMode = 'slow' | 'normal' | 'chant'
export const RATE: Record<RateMode, number> = { slow: 0.7, normal: 0.85, chant: 1.0 }

export const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

let unlockDone = false
/** 首次用户手势时调用（App.vue 全局挂一次） */
export function unlockSpeech() {
  if (unlockDone || !speechSupported) return
  unlockDone = true
  try {
    speechSynthesis.resume()
    const u = new SpeechSynthesisUtterance(' ')
    u.volume = 0.01
    speechSynthesis.speak(u)
  } catch {
    /* 静默 */
  }
}

/** 美音 voice 优选链 */
export function pickVoice(preferredName?: string): SpeechSynthesisVoice | null {
  if (!speechSupported) return null
  const voices = speechSynthesis.getVoices()
  if (!voices.length) return null
  if (preferredName) {
    const v = voices.find((x) => x.name === preferredName)
    if (v) return v
  }
  const enUS = voices.filter((v) => v.lang.replace('_', '-') === 'en-US')
  const en = voices.filter((v) => v.lang.startsWith('en'))
  const byName = (frag: string) => enUS.find((v) => v.name.includes(frag))
  return (
    byName('Natural') || // Edge 自然语音（最佳）
    byName('Google US English') || // Chrome 在线
    byName('Samantha') || // macOS
    byName('Aria') ||
    byName('Jenny') ||
    byName('Zira') || // Windows
    enUS[0] ||
    en[0] ||
    null
  )
}

export interface SpeakOptions {
  /** 覆盖语速（默认 normal 档） */
  rate?: number
  lang?: string
  /** true=先打断当前朗读（默认 true） */
  interrupt?: boolean
  pitch?: number
}

/** 朗读一句话；不支持 TTS 时静默 resolve（组件可查 supported 做降级提示） */
export function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  return new Promise((resolve) => {
    if (!speechSupported || !text.trim()) {
      resolve()
      return
    }
    try {
      if (opts.interrupt !== false) speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = opts.lang ?? 'en-US'
      u.rate = opts.rate ?? RATE.normal
      u.pitch = opts.pitch ?? 1.15 // 稍高音更贴近儿童内容
      let voiceName = ''
      try {
        voiceName = useSettingsStore().voiceName
      } catch {
        /* pinia 未就绪时用自动链 */
      }
      const v = pickVoice(voiceName)
      if (v) u.voice = v
      u.onend = () => resolve()
      u.onerror = () => resolve()
      speechSynthesis.speak(u)
    } catch {
      resolve()
    }
  })
}

/** 朗读单词（默认慢速档；词可覆盖 ttsRate/audioText） */
export function speakWord(word: Word, mode: RateMode = 'slow'): Promise<void> {
  return speak(word.audioText ?? word.en, { rate: word.ttsRate ?? RATE[mode] })
}

/** 顺序朗读多句（可打断：返回的 promise 在全部读完后 resolve） */
export async function speakSequence(
  items: Array<{ text: string; rate?: number }>,
  gapMs = 350,
): Promise<void> {
  for (const it of items) {
    await speak(it.text, { rate: it.rate, interrupt: true })
    if (gapMs > 0) await new Promise((r) => setTimeout(r, gapMs))
  }
}

export function stopSpeech() {
  if (speechSupported) {
    try {
      speechSynthesis.cancel()
    } catch {
      /* 静默 */
    }
  }
}

/** 组合式入口：voices 列表（设置页手选）+ supported */
export function useSpeech() {
  const voices = shallowRef<SpeechSynthesisVoice[]>([])
  const supported = ref(speechSupported)

  const refresh = () => {
    if (!speechSupported) return
    voices.value = speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'))
  }

  onMounted(() => {
    refresh()
    if (speechSupported) {
      speechSynthesis.addEventListener('voiceschanged', refresh)
      // Chrome 首次 getVoices 常为空，延迟再拉一次
      setTimeout(refresh, 300)
    }
  })
  onUnmounted(() => {
    if (speechSupported) speechSynthesis.removeEventListener('voiceschanged', refresh)
  })

  return { supported, voices, speak, speakWord, stop: stopSpeech, RATE }
}
