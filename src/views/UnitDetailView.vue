<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Song, Word } from '@/data/schema'
import { getLevel, getSong, getUnit, getWord } from '@/data/levels'
import { useProgressStore } from '@/stores/progress'
import { playClick, playWrong } from '@/composables/useAudioFeedback'
import { speak, RATE } from '@/composables/useSpeech'
import { resolve } from '@/i18n'
import WordCard from '@/components/common/WordCard.vue'
import StarMeter from '@/components/common/StarMeter.vue'

/* ═══ 单元详情：词预览墙（点读）+ 儿歌试听 + 课列表 ═══ */

const props = defineProps<{ unitId: string }>()
const router = useRouter()
const progress = useProgressStore()

const unit = computed(() => getUnit(props.unitId))
const level = computed(() => (unit.value ? getLevel(unit.value.levelId) : undefined))

/** 本单元全部新词（按课序去重） */
const words = computed<Word[]>(() => {
  if (!unit.value) return []
  const ids: string[] = []
  for (const l of unit.value.lessons) {
    for (const id of l.newWordIds) if (!ids.includes(id)) ids.push(id)
  }
  return ids.map((id) => getWord(id))
})

/** 本单元出现的儿歌（song 环节 + 开场/告别歌去重） */
const songs = computed<Song[]>(() => {
  if (!unit.value) return []
  const ids = new Set<string>()
  for (const l of unit.value.lessons) {
    for (const seg of l.segments) {
      if (seg.type === 'song') ids.add(seg.songId)
    }
  }
  return [...ids].map((id) => getSong(id))
})

const shaking = ref<string | null>(null)

function lessonState(lessonId: string): 'done' | 'open' | 'locked' {
  if (progress.isLessonDone(lessonId)) return 'done'
  return progress.isLessonAvailable(lessonId) ? 'open' : 'locked'
}

function tapLesson(lessonId: string) {
  if (lessonState(lessonId) === 'locked') {
    playWrong()
    shaking.value = lessonId
    setTimeout(() => (shaking.value = null), 550)
    return
  }
  playClick()
  router.push({ name: 'lesson', params: { lessonId } })
}

/** 儿歌试听：标题 + 前两句（完整逐行播放器在课程内） */
async function previewSong(song: Song) {
  playClick()
  await speak(song.title.en, { rate: RATE.normal })
  for (const line of song.lines.slice(0, 2)) {
    await speak(line.text, { rate: song.baseRate })
  }
}

function back() {
  playClick()
  if (level.value) router.push({ name: 'level', params: { levelId: level.value.id } })
  else router.push({ name: 'home' })
}
</script>

<template>
  <div v-if="unit && level" class="page unit-detail" :class="`level-${level.id}`">
    <header class="head">
      <button class="back-btn big-btn" type="button" aria-label="返回地图" @click="back">⬅️</button>
      <div class="head-text">
        <h1>{{ unit.emoji }} {{ resolve(unit.title, 'zh') }}</h1>
        <p class="parent-hint">{{ resolve(level.name, 'zh') }} · 第 {{ unit.order }} 单元 · 共 {{ unit.lessons.length }} 课</p>
      </div>
    </header>

    <!-- 词预览墙 -->
    <section class="block">
      <h2>📖 <span class="en-h">Words</span> <span class="parent-hint">点一点，听发音</span></h2>
      <div class="word-wall">
        <WordCard
          v-for="w in words"
          :key="w.id"
          :word="w"
          size="sm"
          :mastery="progress.masteryOf(w.id)"
        />
      </div>
    </section>

    <!-- 儿歌试听 -->
    <section v-if="songs.length" class="block">
      <h2>🎵 <span class="en-h">Songs</span> <span class="parent-hint">上课时会带着宝宝唱跳</span></h2>
      <div class="song-row">
        <button
          v-for="song in songs"
          :key="song.id"
          class="song-chip big-btn"
          type="button"
          @click="previewSong(song)"
        >
          <span aria-hidden="true">▶</span> {{ song.title.en }}
        </button>
      </div>
    </section>

    <!-- 课列表 -->
    <section class="block">
      <h2>🗺️ <span class="en-h">Lessons</span></h2>
      <div class="lesson-list">
        <button
          v-for="lesson in unit.lessons"
          :key="lesson.id"
          class="lesson-row"
          :class="[lessonState(lesson.id), { shaking: shaking === lesson.id }]"
          type="button"
          @click="tapLesson(lesson.id)"
        >
          <span class="l-state" aria-hidden="true">
            {{ lessonState(lesson.id) === 'done' ? '✅' : lessonState(lesson.id) === 'locked' ? '🔒' : lesson.showcase ? '🎤' : '🎮' }}
          </span>
          <span class="l-info">
            <span class="l-title">Day {{ lesson.day }} · {{ resolve(lesson.title, 'zh') }}</span>
            <span class="l-words parent-hint">
              {{ lesson.newWordIds.length ? lesson.newWordIds.map((id) => getWord(id).en).join(' · ') : '复习课' }}
            </span>
          </span>
          <StarMeter
            v-if="lessonState(lesson.id) === 'done'"
            :earned="progress.starsOf(lesson.id)"
            :max="3"
            :size="16"
            :animate="false"
          />
          <span v-else class="l-go" aria-hidden="true">▶</span>
        </button>
      </div>
    </section>
  </div>
  <div v-else class="page">
    <p class="parent-hint">未知单元… <button class="big-btn" @click="back">🏠</button></p>
  </div>
</template>

<style scoped>
.unit-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.head {
  display: flex;
  align-items: center;
  gap: 14px;
}
.back-btn {
  font-size: 32px;
  width: var(--touch-min);
  height: var(--touch-min);
  flex-shrink: 0;
}
.head-text h1 {
  margin: 0;
  font-size: 24px;
  color: var(--level-color);
}
.head-text .parent-hint {
  margin: 2px 0 0;
}

.block h2 {
  font-size: 20px;
  margin: 0 0 12px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.en-h {
  color: var(--level-color);
}

.word-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--touch-gap);
}

.song-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--touch-gap);
}
.song-chip {
  font-size: 18px;
  padding: 0 22px;
  min-height: 64px;
  border-radius: var(--r-full);
  color: var(--level-color);
}

.lesson-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.lesson-row {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 12px 18px;
  min-height: 84px;
  text-align: left;
  border-left: 8px solid transparent;
  transition: transform var(--t-fast) ease;
}
.lesson-row:active {
  transform: scale(0.98);
}
.lesson-row.open {
  border-left-color: var(--level-color);
}
.lesson-row.done {
  border-left-color: var(--c-correct);
}
.lesson-row.locked {
  filter: grayscale(0.8);
  opacity: 0.65;
}
.lesson-row.shaking {
  animation: wiggle 0.5s ease;
}
.l-state {
  font-size: 32px;
}
.l-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.l-title {
  font-weight: 800;
  font-size: 18px;
}
.l-words {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.l-go {
  margin-left: auto;
  font-size: 22px;
  color: var(--level-color);
}
.lesson-row :deep(.star-meter) {
  margin-left: auto;
}
</style>
