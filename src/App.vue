<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { unlockAudio } from '@/composables/useAudioFeedback'
import { unlockSpeech } from '@/composables/useSpeech'

/* 全局：首次手势解锁 TTS / WebAudio（移动端 autoplay 限制） */
function unlock() {
  unlockAudio()
  unlockSpeech()
}

onMounted(() => {
  window.addEventListener('pointerdown', unlock, { once: true, passive: true })
  window.addEventListener('keydown', unlock, { once: true })
})
onUnmounted(() => {
  window.removeEventListener('pointerdown', unlock)
  window.removeEventListener('keydown', unlock)
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="route-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
