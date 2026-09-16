<script setup lang="ts">
/* 星星计量条：earned/max，逐个 pop-in 点亮 */
withDefaults(
  defineProps<{
    earned: number
    max: number
    size?: number
    /** 点亮时逐颗延迟动画 */
    animate?: boolean
  }>(),
  { size: 40, animate: true },
)
</script>

<template>
  <div class="star-meter" role="img" :aria-label="`${earned} / ${max} stars`">
    <span
      v-for="i in max"
      :key="i"
      class="star"
      :class="{ on: i <= earned, pop: animate && i <= earned }"
      :style="{
        fontSize: `${size}px`,
        animationDelay: animate ? `${(i - 1) * 0.18}s` : '0s',
      }"
      aria-hidden="true"
    >
      {{ i <= earned ? '⭐' : '✩' }}
    </span>
  </div>
</template>

<style scoped>
.star-meter {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}
.star {
  line-height: 1;
  filter: grayscale(1) opacity(0.35);
}
.star.on {
  filter: none;
}
.star.pop {
  animation: meter-pop 0.4s ease backwards;
}
</style>
