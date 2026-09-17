import { stopSpeech } from '@/composables/useSpeech'
import { stopSongAudio } from '@/composables/useSongAudio'

/** 停掉所有内容发音：本机 TTS、在线美音兜底、儿歌 MP3 */
export function stopAllPlayback() {
  stopSpeech()
  stopSongAudio()
}
