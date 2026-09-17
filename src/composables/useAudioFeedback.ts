import { useSettingsStore } from '../stores/settings'

/* ═══════════════════════════════════════════════════════════
   WebAudio 合成音效 —— 零音频文件，全部振荡器即时合成。
   原则：答对=欢快上行琶音；答错=柔和低音（无挫败设计，绝不用刺耳错误音）
   ═══════════════════════════════════════════════════════════ */

type AudioCtor = typeof AudioContext
let ctx: AudioContext | null = null

function ac(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor: AudioCtor | undefined =
        window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext
      if (!Ctor) return null
      ctx = new Ctor()
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function soundOn(): boolean {
  try {
    return useSettingsStore().soundOn
  } catch {
    return true
  }
}

function tone(
  freq: number,
  startIn: number,
  dur: number,
  type: OscillatorType = 'sine',
  gain = 0.16,
) {
  const c = ac()
  if (!c) return
  const t0 = c.currentTime + startIn
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.linearRampToValueAtTime(gain, t0 + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

/** 首次手势解锁（App.vue 全局挂一次） */
export function unlockAudio() {
  ac()
}

/** 点击/触摸反馈 —— 已关闭（用户只要内容发音，不要每点一下的滴声） */
export function playClick() {
  /* no-op */
}

/** 答对：C-E-G 上行琶音 +  sparkle */
export function playCorrect() {
  if (!soundOn()) return
  tone(523.25, 0, 0.14, 'sine', 0.18)
  tone(659.25, 0.09, 0.14, 'sine', 0.18)
  tone(783.99, 0.18, 0.24, 'sine', 0.2)
  tone(1567.98, 0.28, 0.18, 'sine', 0.06)
}

/** 答错：柔和低音两声（轻、短、不吓人） */
export function playWrong() {
  if (!soundOn()) return
  tone(220, 0, 0.16, 'sine', 0.09)
  tone(196, 0.13, 0.2, 'sine', 0.07)
}

/** 单颗星入账：清脆叮 */
export function playStar() {
  if (!soundOn()) return
  tone(1046.5, 0, 0.12, 'sine', 0.14)
  tone(1318.5, 0.07, 0.18, 'sine', 0.1)
}

/** 环节完成 / 小游戏通关：小号角 */
export function playWin() {
  if (!soundOn()) return
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.15))
  tone(1567.98, 0.5, 0.35, 'sine', 0.08)
}

/** 贴纸/勋章揭晓：win + 高光闪 */
export function playReveal() {
  if (!soundOn()) return
  playWin()
  tone(2093, 0.65, 0.4, 'sine', 0.07)
  tone(2637, 0.75, 0.5, 'sine', 0.05)
}

/** 跟读录音开始提示：两声滴 */
export function playListenCue() {
  if (!soundOn()) return
  tone(880, 0, 0.09, 'sine', 0.1)
  tone(880, 0.16, 0.09, 'sine', 0.1)
}

/** 打拍点（chant 节奏） */
export function playBeat(strong = false) {
  if (!soundOn()) return
  tone(strong ? 392 : 261.63, 0, 0.06, 'triangle', strong ? 0.12 : 0.07)
}
