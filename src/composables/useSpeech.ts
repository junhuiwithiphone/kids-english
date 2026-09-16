import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import type { Word } from '../data/schema'
import { useSettingsStore } from '../stores/settings'

/* ═══════════════════════════════════════════════════════════
   TTS 语音层（Web Speech API）
   Chrome/Edge 坑：
   - cancel() 后立刻 speak() 会被丢掉
   - Utterance 若无全局引用会被 GC，导致只有点击音、没有朗读
   - speechSynthesis 会自己 pause，需定期 resume
   ═══════════════════════════════════════════════════════════ */

export type RateMode = 'slow' | 'normal' | 'chant'
export const RATE: Record<RateMode, number> = { slow: 0.7, normal: 0.85, chant: 1.0 }

export const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

let unlockDone = false
let speakGen = 0
let heldUtterance: SpeechSynthesisUtterance | null = null
let resumeTimer: number | undefined
let voicesReady: Promise<void> | null = null

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

function stopResumeWatch() {
  if (resumeTimer !== undefined) {
    clearInterval(resumeTimer)
    resumeTimer = undefined
  }
}

function startResumeWatch() {
  stopResumeWatch()
  resumeTimer = window.setInterval(() => {
    try {
      if (speechSynthesis.paused) speechSynthesis.resume()
    } catch {
      /* */
    }
  }, 5000)
}

function waitForVoices(): Promise<void> {
  if (!speechSupported) return Promise.resolve()
  if (speechSynthesis.getVoices().length) return Promise.resolve()
  if (voicesReady) return voicesReady
  voicesReady = new Promise((resolve) => {
    const finish = () => {
      speechSynthesis.removeEventListener('voiceschanged', finish)
      resolve()
    }
    speechSynthesis.addEventListener('voiceschanged', finish)
    // Chrome 首次 getVoices 常为空，再拉一次
    setTimeout(() => {
      speechSynthesis.getVoices()
      if (speechSynthesis.getVoices().length) finish()
    }, 50)
    setTimeout(finish, 1200)
  })
  return voicesReady
}

/** 首次用户手势：只 resume / 预热声线，不要塞一句空朗读（会和第一次点读抢队列） */
export function unlockSpeech() {
  if (unlockDone || !speechSupported) return
  unlockDone = true
  try {
    speechSynthesis.resume()
    void waitForVoices()
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
    byName('Natural') ||
    byName('Google US English') ||
    byName('Samantha') ||
    byName('Aria') ||
    byName('Jenny') ||
    byName('Zira') ||
    enUS[0] ||
    en[0] ||
    null
  )
}

export interface SpeakOptions {
  rate?: number
  lang?: string
  interrupt?: boolean
  pitch?: number
}

function enqueue(text: string, opts: SpeakOptions, gen: number): Promise<void> {
  return new Promise((resolve) => {
    if (gen !== speakGen) {
      resolve()
      return
    }
    try {
      speechSynthesis.resume()
      const u = new SpeechSynthesisUtterance(text)
      heldUtterance = u
      u.lang = opts.lang ?? 'en-US'
      u.rate = opts.rate ?? RATE.normal
      u.pitch = opts.pitch ?? 1.15
      u.volume = 1
      let voiceName = ''
      try {
        voiceName = useSettingsStore().voiceName
      } catch {
        /* pinia 未就绪 */
      }
      const v = pickVoice(voiceName)
      if (v) u.voice = v

      let settled = false
      const finish = () => {
        if (settled) return
        settled = true
        stopResumeWatch()
        if (heldUtterance === u) heldUtterance = null
        resolve()
      }

      u.onstart = () => startResumeWatch()
      u.onend = finish
      u.onerror = finish
      speechSynthesis.speak(u)

      // Chrome 吞句：200ms 内没开始就再送一次
      window.setTimeout(() => {
        if (gen !== speakGen || settled) return
        if (!speechSynthesis.speaking && !speechSynthesis.pending) {
          try {
            speechSynthesis.resume()
            speechSynthesis.speak(u)
          } catch {
            finish()
          }
        }
      }, 200)

      window.setTimeout(() => {
        if (!settled) finish()
      }, Math.max(4000, text.length * 400))
    } catch {
      resolve()
    }
  })
}

/** 朗读一句话；不支持 TTS 时静默 resolve */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  if (!speechSupported || !text.trim()) return
  const gen = ++speakGen
  try {
    if (opts.interrupt !== false) {
      speechSynthesis.cancel()
      stopResumeWatch()
      // 必须等一拍，否则 Chrome 丢掉下一句
      await delay(80)
    }
    await waitForVoices()
    if (gen !== speakGen) return
    await enqueue(text, opts, gen)
  } catch {
    /* 静默 */
  }
}

/** 朗读单词（默认慢速档；词可覆盖 ttsRate/audioText） */
export function speakWord(word: Word, mode: RateMode = 'slow'): Promise<void> {
  return speak(word.audioText ?? word.en, { rate: word.ttsRate ?? RATE[mode] })
}

/** 顺序朗读多句 */
export async function speakSequence(
  items: Array<{ text: string; rate?: number }>,
  gapMs = 350,
): Promise<void> {
  for (const it of items) {
    await speak(it.text, { rate: it.rate, interrupt: true })
    if (gapMs > 0) await delay(gapMs)
  }
}

export function stopSpeech() {
  speakGen++
  stopResumeWatch()
  heldUtterance = null
  if (speechSupported) {
    try {
      speechSynthesis.cancel()
    } catch {
      /* 静默 */
    }
  }
}

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
      setTimeout(refresh, 300)
    }
  })
  onUnmounted(() => {
    if (speechSupported) speechSynthesis.removeEventListener('voiceschanged', refresh)
  })

  return { supported, voices, speak, speakWord, stop: stopSpeech, RATE }
}
