import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import type { Word } from '../data/schema'
import { useSettingsStore } from '../stores/settings'

/* ═══════════════════════════════════════════════════════════
   发音引擎（双通道）
   1) 优先 Web Speech API（本机音色）
   2) 若未真正开声 / 报错 → 有道词典美音 MP3 兜底
   这样即使用户「装了语言包但浏览器不读」，也能听到英文。
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

/** 在线美音：短词走词典，整句再走 TTS；多源兜底 */
function audioUrls(text: string): string[] {
  const q = encodeURIComponent(text)
  return [
    `https://dict.youdao.com/dictvoice?audio=${q}&type=2`,
    `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=en&q=${q}`,
    `https://fanyi.baidu.com/gettts?lan=en&text=${q}&spd=3&source=web`,
  ]
}

function playAudioFallback(text: string): Promise<SpeakEngine> {
  return new Promise((resolve) => {
    const urls = audioUrls(text)
    let idx = 0
    let settled = false
    let watchdog: number | undefined

    const done = (engine: SpeakEngine) => {
      if (settled) return
      settled = true
      if (watchdog !== undefined) window.clearTimeout(watchdog)
      if (engine === 'none') {
        lastSpeakStatus.value = { text, engine: 'none', error: 'audio-failed', at: Date.now() }
      } else {
        lastSpeakStatus.value = { text, engine, at: Date.now() }
      }
      resolve(engine)
    }

    const tryNext = () => {
      if (settled) return
      if (idx >= urls.length) {
        done('none')
        return
      }
      stopAudio()
      const el = new Audio()
      audioEl = el
      el.preload = 'auto'
      const url = urls[idx++]
      el.src = url
      const fail = () => {
        if (settled) return
        tryNext()
      }
      el.onended = () => done('audio')
      el.onerror = fail
      // 单个源卡住太久就换下一个
      if (watchdog !== undefined) window.clearTimeout(watchdog)
      watchdog = window.setTimeout(fail, 2500)
      void el.play().catch(fail)
    }

    tryNext()
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

      // 句长时给更多时间等 onstart；仍无则交给在线兜底
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

/** 朗读：本机 TTS 优先（离线可用），失败再试在线美音 */
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
      // cancel 后立刻 speak 会被 Chrome/Edge 吞掉
      await delay(150)
    }

    // 家长中心「强制在线」才跳过本机
    if (opts.forceAudio || !speechSupported) {
      if (gen !== speakGen) return
      const engine = await playAudioFallback(cleaned)
      if (engine !== 'none' || !speechSupported) return
      // 在线失败 → 继续本机
    }

    await waitForVoices()
    if (gen !== speakGen) return

    const native = await speakNative(cleaned, opts, gen)
    if (gen !== speakGen) return
    if (native === 'ok') {
      lastSpeakStatus.value = { text: cleaned, engine: 'native', at: Date.now() }
      return
    }

    // 本机未真正开声 → 在线兜底（失败也不再报死，由调用方看 status）
    if (!opts.forceAudio) await playAudioFallback(cleaned)
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
