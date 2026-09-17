<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Word } from '@/data/schema'
import { curriculum } from '@/data/levels'
import { useProgressStore } from '@/stores/progress'
import { playClick } from '@/composables/useAudioFeedback'
import WordCard from '@/components/common/WordCard.vue'

/* ═══ 自由点读墙：按级别/主题 tag 分组，全部词随便点（复习 + 主动输出信号） ═══ */

const router = useRouter()
const progress = useProgressStore()

const mode = ref<'all' | 'learned'>('all')

interface Group {
  key: string
  label: string
  words: Word[]
}

const groups = computed<Group[]>(() => {
  const out: Group[] = []
  for (const level of curriculum.levels) {
    if (level.wordbank.length === 0) continue
    // 主题 tag = 第一个非单元/非拼读 tag
    const byTheme = new Map<string, Word[]>()
    for (const w of level.wordbank) {
      if (mode.value === 'learned' && progress.masteryOf(w.id) === 0) continue
      const theme = w.tags.find((t) => !/^(u\d|w\d|phonics-|sentence)/.test(t)) ?? 'other'
      if (!byTheme.has(theme)) byTheme.set(theme, [])
      byTheme.get(theme)!.push(w)
    }
    for (const [theme, ws] of byTheme) {
      out.push({ key: `${level.id}-${theme}`, label: `${level.emoji} ${theme}`, words: ws })
    }
  }
  return out
})

function onWordTap(wordId: string) {
  // 自由点读 = 主动输出信号（保守：只把已学词提升到 4，Showcase 才给 5）
  if (progress.masteryOf(wordId) >= 1) progress.bumpMastery(wordId, 4)
}

function back() {
  playClick()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="page review">
    <header class="head">
      <button class="back-btn big-btn" type="button" aria-label="返回首页" @click="back">🏠</button>
      <h1>🔊 点读墙</h1>
      <div class="mode-switch">
        <button
          class="mode-btn"
          :class="{ on: mode === 'all' }"
          type="button"
          @click="mode = 'all'"
        >
          全部
        </button>
        <button
          class="mode-btn"
          :class="{ on: mode === 'learned' }"
          type="button"
          @click="mode = 'learned'"
        >
          学过
        </button>
      </div>
    </header>

    <p class="parent-hint tip">
      点词卡直接读英文（无点击滴声）。若本机语音异常会自动改用在线美音（需联网）。
      点读属于「主动输出」，不记录失败。
    </p>

    <section v-for="g in groups" :key="g.key" class="group">
      <h2>{{ g.label }}</h2>
      <div class="wall">
        <WordCard
          v-for="w in g.words"
          :key="w.id"
          :word="w"
          size="sm"
          :mastery="progress.masteryOf(w.id)"
          @tap="onWordTap(w.id)"
        />
      </div>
    </section>

    <p v-if="groups.length === 0" class="parent-hint empty">
      还没有学过的单词，先去上一课吧！
    </p>
  </div>
</template>

<style scoped>
.review {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.head {
  display: flex;
  align-items: center;
  gap: 14px;
}
.head h1 {
  margin: 0;
  font-size: 26px;
}
.back-btn {
  font-size: 32px;
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
}
.mode-switch {
  margin-left: auto;
  display: flex;
  background: var(--c-card);
  border-radius: var(--r-full);
  box-shadow: var(--shadow-card);
  padding: 4px;
  gap: 4px;
}
.mode-btn {
  border-radius: var(--r-full);
  padding: 10px 20px;
  font-weight: 700;
  font-size: 16px;
  color: var(--c-ink-soft);
}
.mode-btn.on {
  background: var(--c-l1);
  color: #fff;
}
.tip {
  margin: 0;
}
.group h2 {
  font-size: 18px;
  margin: 0 0 10px;
  text-transform: capitalize;
}
.wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--touch-gap);
}
.empty {
  text-align: center;
  padding: 40px 0;
}
</style>
