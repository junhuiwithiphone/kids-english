<script setup lang="ts">
import { ref } from 'vue'
import type { HandsOnSegment, Lesson } from '@/data/schema'
import { playStar, playWin, playClick } from '@/composables/useAudioFeedback'
import { speak } from '@/composables/useSpeech'
import SvgIcon from '@/components/common/SvgIcon.vue'
import BigButton from '@/components/common/BigButton.vue'
import StarMeter from '@/components/common/StarMeter.vue'

const props = defineProps<{
  segment: HandsOnSegment
  lesson: Lesson
}>()
const emit = defineEmits<{
  (e: 'done', stars: number): void
  (e: 'showcase'): void
}>()

const stars = ref(0)
const stepIdx = ref(0)
const finished = ref(false)

async function readStep(i: number) {
  stepIdx.value = i
  const s = props.segment.activity.steps[i]
  if (s) await speak(s.text)
}

function printPage() {
  playClick()
  window.print()
}

function confirmDone() {
  if (finished.value) return
  finished.value = true
  stars.value = props.segment.maxStars
  playStar()
  playWin()
  emit('done', stars.value)
}

function goShowcase() {
  playClick()
  emit('showcase')
}
</script>

<template>
  <div class="seg hands anim-fade-up">
    <h2>✋ {{ segment.activity.title.en }}</h2>
    <p class="parent-hint title-zh">{{ segment.activity.title.zh }}</p>
    <p class="guide parent-hint">{{ segment.activity.parentGuideZh }}</p>

    <ol class="steps">
      <li v-for="(s, i) in segment.activity.steps" :key="i" :class="{ on: i === stepIdx }">
        <button type="button" class="step-btn" @click="readStep(i)">
          <span class="en">{{ s.text }}</span>
          <span class="parent-hint">{{ s.zh }}</span>
        </button>
      </li>
    </ol>

    <div v-if="segment.activity.printableSvgKey" class="print-wrap">
      <div class="print-area sheet">
        <SvgIcon :name="segment.activity.printableSvgKey" print-mode />
      </div>
      <BigButton @click="printPage">🖨️ 打印涂色页</BigButton>
    </div>

    <div class="row">
      <BigButton color="--c-correct" @click="confirmDone">我们做完啦 ✅</BigButton>
      <BigButton v-if="lesson.showcase" color="--level-color" @click="goShowcase">
        🎤 开始展示
      </BigButton>
    </div>
    <StarMeter :earned="stars" :max="segment.maxStars" />
  </div>
</template>

<style scoped>
.hands {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
h2 {
  margin: 0;
  font-size: 28px;
}
.title-zh {
  margin: -6px 0 0;
}
.guide {
  max-width: 560px;
  text-align: center;
  background: #fff3e0;
  padding: 10px 14px;
  border-radius: var(--r-md);
}
.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.step-btn {
  width: 100%;
  text-align: left;
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.steps li.on .step-btn {
  outline: 3px solid var(--level-color);
}
.en {
  font-weight: 700;
  font-size: 18px;
}
.print-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.sheet {
  width: min(360px, 90vw);
  background: #fff;
  border-radius: var(--r-md);
  padding: 12px;
  box-shadow: var(--shadow-card);
}
.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
