<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import type { SongSegment } from '@/data/schema'
import { getSong } from '@/data/levels'
import { playBeat, playStar, playWin, playClick } from '@/composables/useAudioFeedback'
import { speak, stopSpeech, RATE } from '@/composables/useSpeech'
import { playSongAudio, stopSongAudio } from '@/composables/useSongAudio'
import BigButton from '@/components/common/BigButton.vue'
import StarMeter from '@/components/common/StarMeter.vue'

const props = defineProps<{ segment: SongSegment }>()
const emit = defineEmits<{ (e: 'done', stars: number): void }>()

const song = computed(() => getSong(props.segment.songId))
const lineIdx = ref(-1)
const playing = ref(false)
const stars = ref(0)
const finished = ref(false)
const mode = ref<'audio' | 'tts' | null>(null)
let abort = false

onUnmounted(() => {
  abort = true
  stopSpeech()
  stopSongAudio()
})

async function playAll() {
  if (playing.value) return
  abort = false
  playing.value = true
  playClick()

  // 优先真实歌曲
  if (song.value.audioUrl) {
    mode.value = 'audio'
    lineIdx.value = 0
    const ok = await playSongAudio(song.value)
    if (abort) {
      playing.value = false
      return
    }
    if (ok) {
      playing.value = false
      if (!finished.value) {
        stars.value = props.segment.maxStars
        playStar()
      }
      return
    }
    // 音频失败 → TTS 降级
  }

  mode.value = 'tts'
  await speak(song.value.title.en, { rate: RATE.normal })
  for (let i = 0; i < song.value.lines.length; i++) {
    if (abort) break
    const line = song.value.lines[i]
    const times = line.repeat ?? 1
    for (let r = 0; r < times; r++) {
      if (abort) break
      lineIdx.value = i
      if (song.value.beatMode === 'chant') playBeat(r === 0)
      await speak(line.text, { rate: song.value.baseRate, interrupt: true })
    }
  }
  playing.value = false
  if (!finished.value && !abort) {
    stars.value = props.segment.maxStars
    playStar()
  }
}

function stop() {
  abort = true
  stopSpeech()
  stopSongAudio()
  playing.value = false
}

function finish() {
  if (finished.value) return
  finished.value = true
  stop()
  if (stars.value === 0) stars.value = props.segment.maxStars
  playWin()
  emit('done', stars.value)
}
</script>

<template>
  <div class="seg song anim-fade-up">
    <h2>🎵 {{ song.title.en }}</h2>
    <p class="movement">{{ segment.movement.en }}</p>
    <p class="parent-hint">{{ segment.movement.zh }}</p>
    <p v-if="song.audioUrl" class="parent-hint">
      {{ mode === 'audio' && playing ? '正在播放歌曲音频…' : '有真实歌曲，点 Sing 播放' }}
    </p>

    <div class="lyrics">
      <p
        v-for="(line, i) in song.lines"
        :key="i"
        class="lyric"
        :class="{ on: i === lineIdx || (mode === 'audio' && playing) }"
      >
        <span class="en">{{ line.text }}</span>
        <span v-if="line.action" class="action">{{ line.action }}</span>
      </p>
    </div>

    <div class="row">
      <BigButton v-if="!playing" color="--level-color" @click="playAll">▶ Sing</BigButton>
      <BigButton v-else @click="stop">⏹ Stop</BigButton>
      <BigButton @click="finish">Done ✅</BigButton>
    </div>
    <StarMeter :earned="stars" :max="segment.maxStars" />
  </div>
</template>

<style scoped>
.song {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
h2 {
  margin: 0;
  font-size: 28px;
}
.movement {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}
.lyrics {
  width: 100%;
  max-width: 560px;
  background: var(--c-card);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-card);
  padding: 16px 20px;
  max-height: 42vh;
  overflow: auto;
}
.lyric {
  margin: 0 0 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: 0.55;
  transition: opacity var(--t-fast);
}
.lyric.on {
  opacity: 1;
}
.en {
  font-size: 20px;
  font-weight: 700;
}
.action {
  font-size: 14px;
  color: var(--c-ink-soft);
}
.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
