<script setup lang="ts">
import { computed } from 'vue'
import { svgIcons } from './svgIcons'

/* 内联 SVG 查表渲染（词图 / 涂色页线稿） */
const props = withDefaults(defineProps<{ name: string; printMode?: boolean }>(), {
  printMode: false,
})

const def = computed(() => svgIcons[props.name])
</script>

<template>
  <svg
    v-if="def"
    class="svg-icon"
    :viewBox="def.viewBox ?? '0 0 100 100'"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    v-html="def.body"
  ></svg>
  <span v-else class="svg-missing" aria-hidden="true">🖼️</span>
</template>

<style scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  display: block;
}
.svg-missing {
  font-size: 48px;
}
</style>
