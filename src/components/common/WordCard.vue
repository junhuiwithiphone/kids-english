<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Word } from '@/data/schema'
import { speakWord } from '@/composables/useSpeech'
import { playClick } from '@/composables/useAudioFeedback'
import { useSettingsStore } from '@/stores/settings'
import SvgIcon from './SvgIcon.vue'

/* 词卡：视觉（色块 > SVG > emoji）+ 英文大字 + 点读发音 */
const props = withDefaults(
  defineProps<{
    word: Word
    size?: 'sm' | 'md' | 'lg'
    /** null=跟随界面语言；可强制开关中文小字 */
    showZh?: boolean | null
    /** 掌握度点（家长视图/复习墙用），undefined 不显示 */
    mastery?: number
    /** 禁用点读（游戏里由宿主控制发音） */
    silent?: boolean
  }>(),
  { size: 'md', showZh: null, silent: false },
)

const emit = defineEmits<{ (e: 'tap', word: Word): void }>()

const settings = useSettingsStore()
const bumping = ref(false)
let timer: number | undefined

const showZhText = computed(() =>
  props.showZh === null ? settings.uiLang !== 'en' : props.showZh,
)

function tap() {
  if (!props.silent) {
    // 先朗读，再给极轻点击音，避免「只有叮一声」盖过英文
    void speakWord(props.word)
    playClick()
    bumping.value = true
    clearTimeout(timer)
    timer = window.setTimeout(() => (bumping.value = false), 450)
  }
  emit('tap', props.word)
}
</script>

<template>
  <button
    class="word-card"
    :class="[size, { bumping }]"
    type="button"
    :aria-label="word.en"
    @click="tap"
  >
    <span class="visual">
      <span v-if="word.colorHex" class="color-chip" :style="{ background: word.colorHex }">
        <span class="chip-shine"></span>
      </span>
      <SvgIcon v-else-if="word.svgKey" :name="word.svgKey" />
      <span v-else class="emoji" aria-hidden="true">{{ word.emoji ?? '🔤' }}</span>
    </span>
    <span class="en word-big">{{ word.en }}</span>
    <span v-if="showZhText" class="zh">{{ word.zh }}</span>
    <span v-if="mastery !== undefined" class="mastery" :title="`掌握度 ${mastery}/5`">
      <i v-for="i in 5" :key="i" :class="['dot', { on: i <= mastery }]" :style="i <= mastery ? { background: `var(--m${mastery})` } : undefined"></i>
    </span>
  </button>
</template>

<style scoped>
.word-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: var(--c-card);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-card);
  padding: 14px 10px 10px;
  min-width: var(--touch-min);
  min-height: var(--touch-min);
  transition: transform var(--t-fast) ease;
  position: relative;
}
.word-card:active {
  transform: scale(0.95);
}
.word-card.bumping {
  animation: bounce-soft 0.45s ease;
}

.visual {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.sm .visual {
  width: 56px;
  height: 56px;
  font-size: 44px;
}
.md .visual {
  width: 84px;
  height: 84px;
  font-size: 68px;
}
.lg .visual {
  width: 130px;
  height: 130px;
  font-size: 104px;
}
.emoji {
  display: block;
}
.color-chip {
  width: 100%;
  height: 100%;
  border-radius: var(--r-md);
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 -6px 0 rgba(0, 0, 0, 0.12);
}
.chip-shine {
  position: absolute;
  top: 10%;
  left: 14%;
  width: 30%;
  height: 22%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  transform: rotate(-20deg);
}

.en {
  text-align: center;
  line-height: 1.1;
}
.sm .en {
  font-size: 22px;
}
.md .en {
  font-size: 30px;
}
.lg .en {
  font-size: var(--f-word);
}
.zh {
  font-family: var(--font-parent);
  font-size: var(--f-parent);
  color: var(--c-ink-soft);
}

.mastery {
  display: flex;
  gap: 4px;
  position: absolute;
  top: 8px;
  right: 10px;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #eee;
}
</style>
