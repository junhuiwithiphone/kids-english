<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { unlockAudio } from '@/composables/useAudioFeedback'
import { unlockSpeech } from '@/composables/useSpeech'
import { stopAllPlayback } from '@/composables/stopAllPlayback'

/* 全局：首次手势解锁；离开页面前清掉残留发音（不在进入后清，避免掐掉新页开场朗读） */
const router = useRouter()

function unlock() {
  unlockAudio()
  unlockSpeech()
}

const removeGuard = router.beforeEach(() => {
  stopAllPlayback()
})

onMounted(() => {
  window.addEventListener('pointerdown', unlock, { once: true, passive: true })
  window.addEventListener('keydown', unlock, { once: true })
})
onUnmounted(() => {
  removeGuard()
  window.removeEventListener('pointerdown', unlock)
  window.removeEventListener('keydown', unlock)
  stopAllPlayback()
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="route-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
