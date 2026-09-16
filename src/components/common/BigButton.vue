<script setup lang="ts">
import { playClick } from '@/composables/useAudioFeedback'

/* 大按钮：≥96px 触控 + 按下回弹；color 可覆盖背景 */
const props = withDefaults(
  defineProps<{
    color?: string
    ink?: string
    disabled?: boolean
    ariaLabel?: string
  }>(),
  { disabled: false },
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

function onClick(ev: MouseEvent) {
  if (props.disabled) return
  playClick()
  emit('click', ev)
}
</script>

<template>
  <button
    class="big-btn"
    :class="{ disabled }"
    type="button"
    :aria-label="ariaLabel"
    :style="{
      background: color ? `var(${color})` : undefined,
      color: ink ? `var(${ink})` : undefined,
    }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.big-btn.disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
