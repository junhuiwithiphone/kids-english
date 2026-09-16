<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { badges, stickers } from '@/data/rewards'
import { useProgressStore } from '@/stores/progress'
import { playClick } from '@/composables/useAudioFeedback'
import { resolve } from '@/i18n'
import { useSettingsStore } from '@/stores/settings'
import StarMeter from '@/components/common/StarMeter.vue'

const router = useRouter()
const progress = useProgressStore()
const settings = useSettingsStore()

const ownedStickers = computed(() =>
  stickers.map((s) => ({ ...s, owned: progress.stickers.includes(s.id) })),
)
const ownedBadges = computed(() =>
  badges.map((b) => ({ ...b, owned: progress.badges.includes(b.id) })),
)

function back() {
  playClick()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="page rewards">
    <header class="head">
      <button class="back-btn big-btn" type="button" @click="back">🏠</button>
      <h1>🎁 Rewards</h1>
      <div class="stars">⭐ {{ progress.totalStars }}</div>
    </header>

    <section class="block">
      <h2>🍯 星星罐</h2>
      <StarMeter :earned="Math.min(progress.totalStars, 20)" :max="20" :size="28" :animate="false" />
      <p class="parent-hint">累计 {{ progress.totalStars }} 星 · 连续打卡 {{ progress.streak }} 天</p>
    </section>

    <section class="block">
      <h2>🏅 勋章</h2>
      <div class="grid">
        <div
          v-for="b in ownedBadges"
          :key="b.id"
          class="item"
          :class="{ locked: !b.owned }"
        >
          <span class="emoji">{{ b.owned ? b.emoji : '❔' }}</span>
          <span class="name">{{ resolve(b.name, settings.uiLang) }}</span>
          <span class="parent-hint">{{ resolve(b.desc, 'zh') }}</span>
        </div>
      </div>
    </section>

    <section class="block">
      <h2>✨ 贴纸册</h2>
      <div class="grid stickers">
        <div
          v-for="s in ownedStickers"
          :key="s.id"
          class="item"
          :class="{ locked: !s.owned }"
        >
          <span class="emoji">{{ s.owned ? s.emoji : '⬜' }}</span>
          <span class="name">{{ resolve(s.name, settings.uiLang) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.rewards {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.head h1 {
  margin: 0;
  flex: 1;
}
.back-btn {
  min-width: 72px;
  min-height: 72px;
  font-size: 28px;
}
.stars {
  font-size: 22px;
  font-weight: 800;
}
.block h2 {
  margin: 0 0 12px;
  font-size: 22px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}
.item {
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  min-height: 120px;
}
.item.locked {
  filter: grayscale(1);
  opacity: 0.55;
}
.emoji {
  font-size: 40px;
}
.name {
  font-weight: 700;
  font-size: 15px;
}
</style>
