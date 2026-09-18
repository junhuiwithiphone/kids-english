import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import type { Word } from '../data/schema'
import { useSettingsStore } from '../stores/settings'

/* ═══════════════════════════════════════════════════════════
   发音引擎
   - 整句 / 短语：本机 Web Speech 一次连读（不拆词）
   - 单词：本机失败时再用有道词典美音兜底
   ═══════════════════════════════════════════════════════════ */

export type RateMode = 'slow' | 'normal' | 'chant'
export const RATE: Record<RateMode, number> = { slow: 0.7, normal: 0.85, chant: 1.0 }

export const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

export type SpeakEngine = 'native' | 'audio' | 'none'

/** 最近一次发音结果（家长诊断 / UI 提示） */
export const lastSpeakStatus = ref<{
  text: string
  engine: SpeakEngine
  error?: string
  at: number
} | null>(null)

let unlockDone = false
let speakGen = 0
let heldUtterance: SpeechSynthesisUtterance | null = null
let audioEl: HTMLAudioElement | null = null
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
  }, 2500)
}

function waitForVoices(): Promise<void> {
  if (!speechSupported) return Promise.resolve()
  if (speechSynthesis.getVoices().length) return Promise.resolve()
  if (voicesReady) return voicesReady
  voicesReady = new Promise((resolve) => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      speechSynthesis.removeEventListener('voiceschanged', finish)
      resolve()
    }
    speechSynthesis.addEventListener('voiceschanged', finish)
    setTimeout(() => {
      speechSynthesis.getVoices()
      if (speechSynthesis.getVoices().length) finish()
    }, 50)
    setTimeout(finish, 1500)
  })
  return voicesReady
}

/** 首次手势：唤醒引擎 + 预拉声线 */
export function unlockSpeech() {
  if (unlockDone || !speechSupported) return
  unlockDone = true
  try {
    speechSynthesis.resume()
    void waitForVoices()
  } catch {
    /* */
  }
}

export function pickVoice(preferredName?: string): SpeechSynthesisVoice | null {
  if (!speechSupported) return null
  const voices = speechSynthesis.getVoices()
  if (!voices.length) return null
  if (preferredName) {
    const v = voices.find((x) => x.name === preferredName)
    if (v) return v
  }
  const enUS = voices.filter((v) => v.lang.replace('_', '-') === 'en-US')
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  const byName = (frag: string) =>
    enUS.find((v) => v.name.includes(frag)) || en.find((v) => v.name.includes(frag))
  return (
    byName('Natural') ||
    byName('Google US English') ||
    byName('Samantha') ||
    byName('Aria') ||
    byName('Jenny') ||
    byName('Zira') ||
    byName('David') ||
    byName('Mark') ||
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
  /** 强制走在线音频（家长中心「测试有道」用） */
  forceAudio?: boolean
}

function stopAudio() {
  if (audioEl) {
    try {
      audioEl.pause()
      audioEl.removeAttribute('src')
      audioEl.load()
    } catch {
      /* */
    }
    audioEl = null
  }
}

function youdaoUrl(text: string): string {
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`
}

/** 单词级在线美音（整句有道不可用，勿对句子调用） */
function playWordAudio(text: string, gen: number): Promise<SpeakEngine> {
  return new Promise((resolve) => {
    if (gen !== speakGen) {
      resolve('none')
      return
    }
    stopAudio()
    const el = new Audio()
    audioEl = el
    el.preload = 'auto'
    el.src = youdaoUrl(text)
    let settled = false
    const finish = (engine: SpeakEngine) => {
      if (settled) return
      settled = true
      window.clearTimeout(watchdog)
      lastSpeakStatus.value = {
        text,
        engine,
        error: engine === 'none' ? 'audio-failed' : undefined,
        at: Date.now(),
      }
      resolve(engine)
    }
    const watchdog = window.setTimeout(() => finish('none'), 2800)
    el.onended = () => finish('audio')
    el.onerror = () => finish('none')
    void el.play().catch(() => finish('none'))
  })
}

function speakNative(text: string, opts: SpeakOptions, gen: number): Promise<'ok' | 'fail'> {
  return new Promise((resolve) => {
    if (!speechSupported || gen !== speakGen) {
      resolve('fail')
      return
    }
    try {
      speechSynthesis.resume()
      const u = new SpeechSynthesisUtterance(text)
      heldUtterance = u
      u.lang = opts.lang ?? 'en-US'
      u.rate = opts.rate ?? RATE.normal
      u.pitch = opts.pitch ?? 1.05
      u.volume = 1

      let voiceName = ''
      try {
        voiceName = useSettingsStore().voiceName
      } catch {
        /* */
      }
      const v = pickVoice(voiceName)
      if (v) {
        u.voice = v
        // 与所选声线语言对齐，减少整句被静默
        if (v.lang) u.lang = v.lang
      }

      let started = false
      let settled = false
      const finish = (ok: boolean) => {
        if (settled) return
        settled = true
        stopResumeWatch()
        if (heldUtterance === u) heldUtterance = null
        resolve(ok ? 'ok' : 'fail')
      }

      u.onstart = () => {
        started = true
        startResumeWatch()
      }
      u.onend = () => finish(started)
      u.onerror = () => finish(false)

      speechSynthesis.speak(u)

      // 等 onstart；整句稍长一点
      window.setTimeout(() => {
        if (gen !== speakGen || settled) return
        if (!started) {
          try {
            speechSynthesis.cancel()
          } catch {
            /* */
          }
          finish(false)
        }
      }, Math.min(1500, 600 + text.length * 25))

      window.setTimeout(() => {
        if (!settled) finish(started)
      }, Math.max(8000, text.length * 500))
    } catch {
      resolve('fail')
    }
  })
}

/**
 * 整句连读：一次 utterance，不拆词。
 * 本机优先；仅单单词在本机失败时用有道兜底。
 */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  const cleaned = text.trim()
  if (!cleaned) return
  unlockSpeech()
  const gen = ++speakGen
  stopAudio()

  const isSingleWord = !/\s/.test(cleaned.replace(/[.,!?;:'"]+/g, ''))

  try {
    if (opts.interrupt !== false && speechSupported) {
      speechSynthesis.cancel()
      stopResumeWatch()
      // cancel 后立刻 speak 会被 Chrome/Edge 吞掉
      await delay(180)
    }
    if (gen !== speakGen) return

    // 家长中心强制测在线：只对单词有意义
    if (opts.forceAudio) {
      await playWordAudio(cleaned, gen)
      return
    }

    if (speechSupported) {
      await waitForVoices()
      if (gen !== speakGen) return
      const native = await speakNative(cleaned, opts, gen)
      if (gen !== speakGen) return
      if (native === 'ok') {
        lastSpeakStatus.value = { text: cleaned, engine: 'native', at: Date.now() }
        return
      }
    }

    // 本机失败：仅单词走有道；整句不再拆词连播
    if (isSingleWord) {
      await playWordAudio(cleaned, gen)
      return
    }

    lastSpeakStatus.value = {
      text: cleaned,
      engine: 'none',
      error: 'native-failed-for-sentence',
      at: Date.now(),
    }
  } catch (e) {
    lastSpeakStatus.value = {
      text: cleaned,
      engine: 'none',
      error: String(e),
      at: Date.now(),
    }
  }
}

export function speakWord(word: Word, mode: RateMode = 'slow'): Promise<void> {
  return speak(word.audioText ?? word.en, { rate: word.ttsRate ?? RATE[mode] })
}

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
  stopAudio()
  if (speechSupported) {
    try {
      speechSynthesis.cancel()
    } catch {
      /* */
    }
  }
}

/** 家长中心：列出本机英语声线 */
export function listEnglishVoices(): SpeechSynthesisVoice[] {
  if (!speechSupported) return []
  return speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'))
}

export function useSpeech() {
  const voices = shallowRef<SpeechSynthesisVoice[]>([])
  const supported = ref(speechSupported)

  const refresh = () => {
    voices.value = listEnglishVoices()
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

  return {
    supported,
    voices,
    speak,
    speakWord,
    stop: stopSpeech,
    RATE,
    lastSpeakStatus,
  }
}
