import { onUnmounted, ref } from 'vue'
import type { Song } from '@/data/schema'
import { stopSpeech } from '@/composables/useSpeech'

/* ═══════════════════════════════════════════════════════════
   儿歌真实音频播放（public/songs/*.mp3）
   有 audioUrl → 播 MP3；无则返回 false 由调用方降级 TTS
   ═══════════════════════════════════════════════════════════ */

let shared: HTMLAudioElement | null = null

export const songPlayingId = ref<string | null>(null)

function resolveUrl(path: string): string {
  const base = import.meta.env.BASE_URL || './'
  const root = base.endsWith('/') ? base : `${base}/`
  return `${root}${path.replace(/^\//, '')}`
}

function stopShared() {
  if (shared) {
    try {
      shared.pause()
      shared.removeAttribute('src')
      shared.load()
    } catch {
      /* */
    }
    shared = null
  }
  songPlayingId.value = null
}

export function stopSongAudio() {
  stopShared()
}

/** 播放歌曲音频；成功 true，无音源/失败 false */
export function playSongAudio(song: Song): Promise<boolean> {
  if (!song.audioUrl) return Promise.resolve(false)
  stopSpeech()
  stopShared()

  return new Promise((resolve) => {
    const el = new Audio()
    shared = el
    songPlayingId.value = song.id
    el.preload = 'auto'
    el.src = resolveUrl(song.audioUrl!)

    const done = (ok: boolean) => {
      if (shared === el) {
        songPlayingId.value = null
        shared = null
      }
      resolve(ok)
    }

    el.onended = () => done(true)
    el.onerror = () => done(false)
    void el.play().catch(() => done(false))
  })
}

/** 切换播放：点同一首再点则停止 */
export async function toggleSongAudio(song: Song): Promise<'playing' | 'stopped' | 'missing'> {
  if (songPlayingId.value === song.id) {
    stopShared()
    return 'stopped'
  }
  const ok = await playSongAudio(song)
  return ok ? 'playing' : 'missing'
}

export function useSongAudio() {
  onUnmounted(() => stopShared())
  return { songPlayingId, playSongAudio, toggleSongAudio, stopSongAudio }
}
