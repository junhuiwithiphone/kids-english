<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getLesson, getWord, levelOfLesson } from '@/data/levels'
import { useProgressStore } from '@/stores/progress'
import { useSettingsStore } from '@/stores/settings'
import { playCorrect, playReveal, playClick } from '@/composables/useAudioFeedback'
import { speak } from '@/composables/useSpeech'
import { resolve } from '@/i18n'
import BigButton from '@/components/common/BigButton.vue'
import WordCard from '@/components/common/WordCard.vue'

const props = defineProps<{ lessonId: string }>()
const router = useRouter()
const progress = useProgressStore()
const settings = useSettingsStore()

const lesson = computed(() => getLesson(props.lessonId))
const level = computed(() => levelOfLesson(props.lessonId))
const showcase = computed(() => lesson.value?.showcase)

const idx = ref(0)
const doneIds = ref<Set<number>>(new Set())
const showCert = ref(false)

const card = computed(() => showcase.value?.cards[idx.value])
const allDone = computed(() => showcase.value && doneIds.value.size >= showcase.value.cards.length)

async function ask() {
  if (!card.value) return
  playClick()
  await speak(card.value.prompt)
}

function success() {
  if (!card.value) return
  playCorrect()
  doneIds.value = new Set([...doneIds.value, idx.value])
  if (card.value.hintWordId) progress.markOutput(card.value.hintWordId)
  if (idx.value + 1 < (showcase.value?.cards.length ?? 0)) {
    idx.value++
  } else {
    finish()
  }
}

function finish() {
  showCert.value = true
  playReveal()
  progress.completeShowcase(props.lessonId)
}

function printCert() {
  playClick()
  window.print()
}

function home() {
  playClick()
  router.push({ name: 'home' })
}
</script>

<template>
  <div v-if="lesson && showcase && level" class="page showcase" :class="`level-${level.id}`">
    <template v-if="!showCert">
      <header>
        <h1>🎤 Show Time!</h1>
        <p class="parent-hint">{{ card?.promptZh }}</p>
      </header>

      <div v-if="card" class="stage anim-fade-up">
        <p class="prompt">{{ card.prompt }}</p>
        <span v-if="card.hintEmoji" class="hint-emoji">{{ card.hintEmoji }}</span>
        <WordCard
          v-if="card.hintWordId"
          :word="getWord(card.hintWordId)"
          size="lg"
          :show-zh="true"
        />
        <div class="row">
          <BigButton @click="ask">🔊 Ask</BigButton>
          <BigButton color="--c-correct" @click="success">👍 成功啦</BigButton>
        </div>
        <p class="parent-hint">进度 {{ doneIds.size }}/{{ showcase.cards.length }} · 点头/动作/近似发音都算成功</p>
      </div>
    </template>

    <div v-else class="cert-wrap">
      <div class="print-area certificate anim-stamp">
        <p class="cert-eyebrow">绮梦英语</p>
        <h2>{{ resolve(showcase.certificateTitle, 'en') }}</h2>
        <p class="zh">{{ resolve(showcase.certificateTitle, 'zh') }}</p>
        <p class="name">{{ settings.childName || 'Little Star' }}</p>
        <p class="parent-hint">Day 20 · Super Star 🏆</p>
        <p class="date">{{ new Date().toLocaleDateString() }}</p>
      </div>
      <div class="row">
        <BigButton @click="printCert">🖨️ 打印奖状</BigButton>
        <BigButton color="--level-color" @click="home">🏠 回家</BigButton>
      </div>
      <p v-if="allDone" class="parent-hint">展示勋章已收入奖励室</p>
    </div>
  </div>
  <div v-else class="page">
    <p>本课没有展示环节</p>
    <BigButton @click="home">回家</BigButton>
  </div>
</template>

<style scoped>
.showcase {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}
header h1 {
  margin: 0;
  font-size: 34px;
}
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.prompt {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
}
.hint-emoji {
  font-size: 56px;
}
.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.cert-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}
.certificate {
  width: min(480px, 92vw);
  background: linear-gradient(160deg, #fffde7, #fff8e1);
  border: 8px solid var(--c-l1);
  border-radius: var(--r-lg);
  padding: 36px 24px;
  box-shadow: var(--shadow-pop);
}
.cert-eyebrow {
  letter-spacing: 4px;
  font-size: 14px;
  color: var(--c-ink-soft);
  margin: 0;
}
.certificate h2 {
  margin: 8px 0;
  font-size: 28px;
}
.name {
  font-size: 36px;
  font-weight: 800;
  color: var(--c-l1);
  margin: 12px 0;
}
.date {
  margin: 8px 0 0;
  font-family: var(--font-parent);
}
</style>
