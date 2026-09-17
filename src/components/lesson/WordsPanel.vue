<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Lesson, WordsSegment } from '@/data/schema'
import { getWord } from '@/data/levels'
import { playStar, playWin } from '@/composables/useAudioFeedback'
import { stopSpeech } from '@/composables/useSpeech'
import WordCard from '@/components/common/WordCard.vue'
import BigButton from '@/components/common/BigButton.vue'
import StarMeter from '@/components/common/StarMeter.vue'
import GameHost from '@/components/games/GameHost.vue'
import ReadAloudGate from '@/components/games/ReadAloudGate.vue'

const props = defineProps<{
  segment: WordsSegment
  lesson: Lesson
}>()
const emit = defineEmits<{ (e: 'done', stars: number): void }>()

/** present → games → readAloud → done */
type Phase = 'present' | 'game' | 'read' | 'done'
const phase = ref<Phase>('present')
const gameIdx = ref(0)
const stars = ref(0)

const newWords = computed(() => props.segment.wordIds.map(getWord))
const reviewWords = computed(() => (props.segment.reviewWordIds ?? []).map(getWord))
const currentGame = computed(() => props.segment.games[gameIdx.value])

function startGames() {
  stopSpeech()
  if (props.segment.games.length) {
    phase.value = 'game'
  } else if (props.segment.readAloud.enabled) {
    phase.value = 'read'
  } else {
    finish()
  }
}

function onGameDone(s: number) {
  stopSpeech()
  stars.value += s
  if (gameIdx.value + 1 < props.segment.games.length) {
    gameIdx.value++
    return
  }
  if (props.segment.readAloud.enabled && props.segment.readAloud.wordIds.length) {
    phase.value = 'read'
  } else {
    finish()
  }
}

function onReadDone(s: number) {
  stopSpeech()
  stars.value += s
  finish()
}

function skipRead() {
  stopSpeech()
  finish()
}

function finish() {
  if (phase.value === 'done') return
  stopSpeech()
  // 保底：至少给 1 星鼓励（若全程跳过游戏）
  if (stars.value === 0) stars.value = Math.min(1, props.segment.maxStars)
  stars.value = Math.min(stars.value, props.segment.maxStars)
  phase.value = 'done'
  playStar()
  playWin()
  emit('done', stars.value)
}
</script>

<template>
  <div class="seg words anim-fade-up">
    <template v-if="phase === 'present'">
      <h2>📖 Words</h2>
      <p v-if="segment.presentMode === 'card+tpr'" class="parent-hint">
        边点词卡边做动作（TPR），家长一起夸张演示
      </p>
      <div v-if="reviewWords.length" class="block">
        <p class="label">🔁 Review</p>
        <div class="cards">
          <WordCard v-for="w in reviewWords" :key="w.id" :word="w" size="md" />
        </div>
      </div>
      <div class="block">
        <p class="label">✨ New</p>
        <div class="cards">
          <WordCard v-for="w in newWords" :key="w.id" :word="w" size="lg" />
        </div>
      </div>
      <BigButton color="--level-color" @click="startGames">
        {{ segment.games.length ? '玩游戏 ▶' : '继续 ▶' }}
      </BigButton>
    </template>

    <template v-else-if="phase === 'game' && currentGame">
      <h2>🎮 Game {{ gameIdx + 1 }}/{{ segment.games.length }}</h2>
      <GameHost
        :config="currentGame"
        :lesson-id="lesson.id"
        @done="onGameDone"
      />
    </template>

    <template v-else-if="phase === 'read'">
      <h2>🎤 Read</h2>
      <ReadAloudGate
        :word-ids="segment.readAloud.wordIds"
        @done="onReadDone"
      />
      <button class="skip parent-hint" type="button" @click="skipRead">跳过跟读（零输出日）</button>
    </template>

    <StarMeter class="meter" :earned="Math.min(stars, segment.maxStars)" :max="segment.maxStars" />
  </div>
</template>

<style scoped>
.words {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
h2 {
  margin: 0;
  font-size: 30px;
}
.block {
  width: 100%;
  text-align: center;
}
.label {
  font-weight: 800;
  margin: 0 0 8px;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.skip {
  background: none;
  text-decoration: underline;
  cursor: pointer;
}
.meter {
  margin-top: 8px;
}
</style>
