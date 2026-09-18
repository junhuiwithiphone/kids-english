<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import type { HandsOnSegment, Lesson } from '@/data/schema'
import { playStar, playWin, playClick } from '@/composables/useAudioFeedback'
import { speak, stopSpeech, lastSpeakStatus } from '@/composables/useSpeech'
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
/** -1 = 尚未点选任一步；只有点击才高亮并播该步音频 */
const stepIdx = ref(-1)
const finished = ref(false)
const speaking = ref(false)
const speakFail = ref(false)
let speakToken = 0

onUnmounted(() => {
  speakToken++
  stopSpeech()
})

async function readStep(i: number) {
  if (finished.value) return
  const s = props.segment.activity.steps[i]
  if (!s?.text) return

  const token = ++speakToken
  stepIdx.value = i
  speaking.value = true
  speakFail.value = false

  // 本机优先；在线仅作兜底（国内访问有道/Google 常被拦）
  await speak(s.text, { interrupt: true })

  if (token !== speakToken) return
  speaking.value = false
  if (lastSpeakStatus.value?.engine === 'none') {
    speakFail.value = true
  }
}

function printPage() {
  playClick()
  window.print()
}

function confirmDone() {
  if (finished.value) return
  finished.value = true
  speakToken++
  speaking.value = false
  stopSpeech()
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

    <p class="parent-hint tip">点喇叭听这一句英文</p>
    <p v-if="speakFail" class="parent-hint fail">本机朗读失败，请到「家长中心」选一个英语声线后再试</p>
    <ol class="steps">
      <li
        v-for="(s, i) in segment.activity.steps"
        :key="i"
        :class="{ on: i === stepIdx, speaking: i === stepIdx && speaking }"
      >
        <button type="button" class="step-btn" :aria-busy="i === stepIdx && speaking" @click="readStep(i)">
          <span class="horn" aria-hidden="true">{{ i === stepIdx && speaking ? '🔈' : '🔊' }}</span>
          <span class="texts">
            <span class="en">{{ s.text }}</span>
            <span class="parent-hint">{{ s.zh }}</span>
          </span>
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
.tip {
  margin: 0;
  text-align: center;
}
.fail {
  margin: 0;
  color: #c62828;
  font-weight: 700;
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
  align-items: flex-start;
  gap: 12px;
}
.horn {
  flex-shrink: 0;
  font-size: 28px;
  line-height: 1.2;
}
.texts {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.steps li.on .step-btn {
  outline: 3px solid var(--level-color);
}
.steps li.speaking .horn {
  animation: horn-pulse 0.7s ease-in-out infinite;
}
@keyframes horn-pulse {
  50% {
    transform: scale(1.15);
  }
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
