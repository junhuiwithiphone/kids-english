<script setup lang="ts">
import type { GameConfig } from '@/data/schema'
import ListenPickGame from './ListenPickGame.vue'
import MatchPairsGame from './MatchPairsGame.vue'
import TprCommandGame from './TprCommandGame.vue'
import MoleGame from './MoleGame.vue'
import ReadAloudGate from './ReadAloudGate.vue'

const props = defineProps<{
  config: GameConfig
  lessonId: string
}>()

const emit = defineEmits<{ (e: 'done', stars: number): void }>()
</script>

<template>
  <ListenPickGame
    v-if="config.type === 'listen-pick'"
    :config="config"
    :lesson-id="lessonId"
    @done="emit('done', $event)"
  />
  <MatchPairsGame
    v-else-if="config.type === 'match-pairs'"
    :config="config"
    @done="emit('done', $event)"
  />
  <TprCommandGame
    v-else-if="config.type === 'tpr-command'"
    :config="config"
    @done="emit('done', $event)"
  />
  <MoleGame
    v-else-if="config.type === 'mole'"
    :config="config"
    @done="emit('done', $event)"
  />
  <ReadAloudGate
    v-else-if="config.type === 'read-aloud-gate'"
    :word-ids="config.wordIds"
    :pass-threshold="config.passThreshold"
    :stars-per-pass="config.starsPerRound"
    @done="emit('done', $event)"
  />
</template>
