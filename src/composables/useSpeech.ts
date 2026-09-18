import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import type { Word } from '../data/schema'
import { useSettingsStore } from '../stores/settings'

/* ═══════════════════════════════════════════════════════════
   发音引擎
   1) 本机 Web Speech（离线）
   2) 有道词典美音（单词可靠；整句常失败 → 自动拆词连播）
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

/** 首次手势：唤醒引擎 + 预拉声线列表 */
export function unlockSpeech() {
  if (unlockDone || !speechSupported) return
  unlockDone = true
  try {
    speechSynthesis.resume()
    void waitForVoices()
    // 空 utterance 预热，降低首次被吞的概率
    const warm = new SpeechSynthesisUtterance(' ')
    warm.volume = 0
    speechSynthesis.speak(warm)
    speechSynthesis.cancel()
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

/** 有道词典美音（单词级稳定；整句常 404/解码失败） */
function youdaoUrl(text: string): string {
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`
}

function tokenizeEnglish(text: string): string[] {
  return text
    .replace(/[^a-zA-Z0-9'-]+/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0)
}

function playOneAudio(url: string, gen: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (gen !== speakGen) {
      resolve(false)
      return
    }
    stopAudio()
    const el = new Audio()
    audioEl = el
    el.preload = 'auto'
    el.src = url
    let settled = false
    const finish = (ok: boolean) => {
      if (settled) return
      settled = true
      window.clearTimeout(watchdog)
      resolve(ok)
    }
    const watchdog = window.setTimeout(() => finish(false), 2800)
    el.onended = () => finish(true)
    el.onerror = () => finish(false)
    void el.play().catch(() => finish(false))
  })
}

/** 整句失败时，按词连播有道美音（已验证可用） */
async function playAudioWordByWord(text: string, gen: number): Promise<SpeakEngine> {
  const words = tokenizeEnglish(text)
  if (!words.length) return 'none'
  for (const w of words) {
    if (gen !== speakGen) return 'none'
    const ok = await playOneAudio(youdaoUrl(w), gen)
    if (!ok) return 'none'
    await delay(80)
  }
  return 'audio'
}

async function playAudioFallback(text: string, gen: number): Promise<SpeakEngine> {
  // 1) 整句试一次（短词/短语偶发可用）
  if (await playOneAudio(youdaoUrl(text), gen)) {
    lastSpeakStatus.value = { text, engine: 'audio', at: Date.now() }
    return 'audio'
  }
  // 2) 含空格 → 拆词连播
  if (/\s/.test(text)) {
    const engine = await playAudioWordByWord(text, gen)
    if (engine === 'audio') {
      lastSpeakStatus.value = { text, engine: 'audio', at: Date.now() }
      return 'audio'
    }
  }
  lastSpeakStatus.value = { text, engine: 'none', error: 'audio-failed', at: Date.now() }
  return 'none'
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
      u.pitch = opts.pitch ?? 1.1
      u.volume = 1

      let voiceName = ''
      try {
        voiceName = useSettingsStore().voiceName
      } catch {
        /* */
      }
      const v = pickVoice(voiceName)
      if (v) u.voice = v

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
      }, Math.min(1200, 450 + text.length * 20))

      window.setTimeout(() => {
        if (!settled) finish(started)
      }, Math.max(5000, text.length * 450))
    } catch {
      resolve('fail')
    }
  })
}

/**
 * 朗读策略：
 * - 默认：在线拆词美音优先（国内稳定、有声），失败再本机
 * - forceAudio：只测在线
 * 原因：Windows 上本机常「onstart 却无声」；有道整句失败但单词可用。
 */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  const cleaned = text.trim()
  if (!cleaned) return
  unlockSpeech()
  const gen = ++speakGen
  stopAudio()

  try {
    if (opts.interrupt !== false && speechSupported) {
      speechSynthesis.cancel()
      stopResumeWatch()
      await delay(120)
    }

    if (gen !== speakGen) return

    // 在线优先（单词/拆词）；家长测本机时不要 forceAudio
    if (!opts.forceAudio) {
      const online = await playAudioFallback(cleaned, gen)
      if (gen !== speakGen) return
      if (online === 'audio') return
    } else {
      await playAudioFallback(cleaned, gen)
      return
    }

    // 在线失败 → 本机
    if (!speechSupported) return
    await waitForVoices()
    if (gen !== speakGen) return

    const native = await speakNative(cleaned, opts, gen)
    if (gen !== speakGen) return
    if (native === 'ok') {
      lastSpeakStatus.value = { text: cleaned, engine: 'native', at: Date.now() }
      return
    }

    lastSpeakStatus.value = {
      text: cleaned,
      engine: 'none',
      error: 'native-and-audio-failed',
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
