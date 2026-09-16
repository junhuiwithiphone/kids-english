import { computed, onUnmounted, ref } from 'vue'
import type { Word } from '@/data/schema'
import { playCorrect, playListenCue, playWrong } from '@/composables/useAudioFeedback'
import { speakWord } from '@/composables/useSpeech'
import { useProgressStore } from '@/stores/progress'
import { useSettingsStore, type MicMode } from '@/stores/settings'

/* ═══════════════════════════════════════════════════════════
   跟读评测：native SpeechRecognition → record 自评 → parent 确认
   ═══════════════════════════════════════════════════════════ */

type SRCtor = new () => SpeechRecognition

function getSR(): SRCtor | null {
  const w = window as unknown as {
    SpeechRecognition?: SRCtor
    webkitSpeechRecognition?: SRCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export type ReadPhase = 'idle' | 'demo' | 'listening' | 'recording' | 'result' | 'parent'

export interface ReadResult {
  score: number
  mode: MicMode | 'native' | 'record' | 'parent'
  transcript?: string
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, '')
}

/** 简单相似度：包含 / 编辑距离粗判 */
function scoreMatch(target: string, heard: string): number {
  const a = normalize(target)
  const b = normalize(heard)
  if (!a || !b) return 0
  if (a === b) return 100
  if (b.includes(a) || a.includes(b)) return 85
  // 前缀匹配（ap → apple）
  if (a.startsWith(b) && b.length >= 2) return 70
  if (b.startsWith(a.slice(0, Math.min(3, a.length)))) return 65
  let same = 0
  const n = Math.min(a.length, b.length)
  for (let i = 0; i < n; i++) if (a[i] === b[i]) same++
  return Math.round((same / Math.max(a.length, b.length)) * 100)
}

export function useReadAloud() {
  const settings = useSettingsStore()
  const progress = useProgressStore()

  const phase = ref<ReadPhase>('idle')
  const lastResult = ref<ReadResult | null>(null)
  const errorHint = ref('')
  const recordingUrl = ref<string | null>(null)

  let recognition: SpeechRecognition | null = null
  let mediaRecorder: MediaRecorder | null = null
  let chunks: BlobPart[] = []

  const effectiveMode = computed(() => {
    const m = settings.micMode
    if (m !== 'auto') return m
    if (getSR()) return 'native' as const
    if (typeof navigator !== 'undefined' && !!navigator.mediaDevices) return 'record' as const
    return 'parent' as const
  })

  function cleanupMedia() {
    if (recognition) {
      try {
        recognition.abort()
      } catch {
        /* */
      }
      recognition = null
    }
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      try {
        mediaRecorder.stop()
      } catch {
        /* */
      }
    }
    mediaRecorder = null
    if (recordingUrl.value) {
      URL.revokeObjectURL(recordingUrl.value)
      recordingUrl.value = null
    }
  }

  onUnmounted(cleanupMedia)

  async function demo(word: Word) {
    phase.value = 'demo'
    await speakWord(word, 'slow')
    phase.value = 'idle'
  }

  function finish(word: Word, result: ReadResult) {
    lastResult.value = result
    phase.value = 'result'
    progress.recordReadAloud(word.id, result.score)
    if (result.score >= 60) playCorrect()
    else playWrong()
  }

  async function startNative(word: Word) {
    const Ctor = getSR()
    if (!Ctor) {
      errorHint.value = '本浏览器不支持语音识别，已切到家长确认'
      return startParent(word)
    }
    cleanupMedia()
    playListenCue()
    phase.value = 'listening'
    errorHint.value = ''

    recognition = new Ctor()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 3
    recognition.onresult = (ev) => {
      const texts: string[] = []
      for (let i = 0; i < ev.results.length; i++) {
        for (let j = 0; j < ev.results[i].length; j++) {
          texts.push(ev.results[i][j].transcript)
        }
      }
      const best = texts.map((t) => scoreMatch(word.en, t)).reduce((a, b) => Math.max(a, b), 0)
      finish(word, { score: best, mode: 'native', transcript: texts[0] })
    }
    recognition.onerror = () => {
      errorHint.value = '没听清，试试再来一次，或让家长点赞'
      phase.value = 'idle'
    }
    recognition.onend = () => {
      if (phase.value === 'listening') phase.value = 'idle'
    }
    try {
      recognition.start()
    } catch {
      errorHint.value = '麦克风忙，请再试'
      phase.value = 'idle'
    }
  }

  async function startRecord(word: Word) {
    cleanupMedia()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunks = []
      mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data)
      }
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        const blob = new Blob(chunks, { type: 'audio/webm' })
        recordingUrl.value = URL.createObjectURL(blob)
        phase.value = 'result'
        lastResult.value = null // 等孩子自评
      }
      playListenCue()
      phase.value = 'recording'
      mediaRecorder.start()
      // 最长 3 秒自动停
      setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop()
      }, 3000)
    } catch {
      errorHint.value = '无法打开麦克风，改用家长确认'
      return startParent(word)
    }
  }

  function stopRecord() {
    if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop()
  }

  function rateSelf(word: Word, stars: number) {
    const score = stars >= 3 ? 90 : stars === 2 ? 70 : 40
    finish(word, { score, mode: 'record' })
  }

  function startParent(_word: Word) {
    phase.value = 'parent'
    errorHint.value = ''
  }

  function parentConfirm(word: Word, ok: boolean) {
    finish(word, { score: ok ? 85 : 40, mode: 'parent' })
  }

  async function start(word: Word) {
    lastResult.value = null
    const mode = effectiveMode.value
    if (mode === 'native') return startNative(word)
    if (mode === 'record') return startRecord(word)
    return startParent(word)
  }

  function reset() {
    cleanupMedia()
    phase.value = 'idle'
    lastResult.value = null
    errorHint.value = ''
  }

  return {
    phase,
    lastResult,
    errorHint,
    recordingUrl,
    effectiveMode,
    demo,
    start,
    stopRecord,
    rateSelf,
    parentConfirm,
    reset,
  }
}
