<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '@/stores/progress'
import { useSettingsStore, type MicMode } from '@/stores/settings'
import { useSpeech } from '@/composables/useSpeech'
import { playClick, playCorrect, playWrong } from '@/composables/useAudioFeedback'
import { getScript } from '@/data/scripts'
import { getLesson, allLessons } from '@/data/levels'
import BigButton from '@/components/common/BigButton.vue'

/* 家长中心：算术题 + 可选 PIN 守卫 */
const router = useRouter()
const progress = useProgressStore()
const settings = useSettingsStore()
const { voices, supported } = useSpeech()

const unlocked = ref(false)
const a = ref(0)
const b = ref(0)
const answer = ref('')
const pinInput = ref('')
const pinSetup = ref('')
const pinSetup2 = ref('')
const msg = ref('')
const tab = ref<'today' | 'script' | 'settings' | 'data'>('today')
const scriptDay = ref(1)

function rollMath() {
  a.value = 2 + Math.floor(Math.random() * 8)
  b.value = 2 + Math.floor(Math.random() * 8)
  answer.value = ''
  msg.value = ''
}
rollMath()

function tryUnlock() {
  playClick()
  const okMath = Number(answer.value) === a.value + b.value
  if (!okMath) {
    playWrong()
    msg.value = '算术不对哦，再试一次'
    rollMath()
    return
  }
  if (settings.parentPin) {
    if (pinInput.value !== settings.parentPin) {
      playWrong()
      msg.value = 'PIN 不对'
      return
    }
  } else if (pinSetup.value) {
    if (pinSetup.value.length < 4 || pinSetup.value !== pinSetup2.value) {
      playWrong()
      msg.value = 'PIN 需至少4位且两次一致（也可留空跳过）'
      return
    }
    settings.parentPin = pinSetup.value
  }
  playCorrect()
  unlocked.value = true
}

const today = computed(() => progress.todayEntry)
const recentLessons = computed(() =>
  Object.entries(progress.lessons)
    .map(([id, rec]) => ({ id, ...rec, lesson: getLesson(id) }))
    .sort((x, y) => y.completedAt.localeCompare(x.completedAt))
    .slice(0, 8),
)

const script = computed(() => {
  const lesson = allLessons.find((l) => l.day === scriptDay.value && l.unitId.startsWith('l1-'))
  return lesson ? getScript(lesson.scriptId) : undefined
})

function setMic(m: MicMode) {
  settings.micMode = m
  playClick()
}

function exportJson() {
  playClick()
  const blob = new Blob([progress.exportData()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const aEl = document.createElement('a')
  aEl.href = url
  aEl.download = `kids-english-progress-${Date.now()}.json`
  aEl.click()
  URL.revokeObjectURL(url)
}

async function importJson(ev: Event) {
  const file = (ev.target as HTMLInputElement).files?.[0]
  if (!file) return
  const text = await file.text()
  if (progress.importData(text)) {
    playCorrect()
    msg.value = '导入成功'
  } else {
    playWrong()
    msg.value = '导入失败，文件格式不对'
  }
}

function resetProgress() {
  if (!confirm('确定清空全部学习进度？不可恢复')) return
  progress.resetAll()
  playWrong()
  msg.value = '进度已清空'
}

function back() {
  playClick()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="page parent">
    <header class="head">
      <button class="back-btn big-btn" type="button" @click="back">🏠</button>
      <h1>🔒 家长中心</h1>
    </header>

    <div v-if="!unlocked" class="gate anim-fade-up">
      <p class="parent-hint">请完成算术题进入（防止宝宝误入）</p>
      <p class="math">{{ a }} + {{ b }} = ?</p>
      <input v-model="answer" class="input" type="number" inputmode="numeric" placeholder="答案" />

      <template v-if="settings.parentPin">
        <input v-model="pinInput" class="input" type="password" maxlength="8" placeholder="PIN" />
      </template>
      <template v-else>
        <p class="parent-hint">可选：设置家长 PIN（至少4位，可留空）</p>
        <input v-model="pinSetup" class="input" type="password" maxlength="8" placeholder="新 PIN" />
        <input v-model="pinSetup2" class="input" type="password" maxlength="8" placeholder="再输一次" />
      </template>

      <BigButton color="--c-l3" @click="tryUnlock">进入</BigButton>
      <p v-if="msg" class="parent-hint warn">{{ msg }}</p>
    </div>

    <template v-else>
      <nav class="tabs">
        <button
          v-for="t in [
            { id: 'today', label: '今日' },
            { id: 'script', label: '教案' },
            { id: 'settings', label: '设置' },
            { id: 'data', label: '数据' },
          ]"
          :key="t.id"
          class="tab"
          :class="{ on: tab === t.id }"
          type="button"
          @click="tab = t.id as typeof tab"
        >
          {{ t.label }}
        </button>
      </nav>

      <section v-if="tab === 'today'" class="panel">
        <h2>今日学习</h2>
        <ul class="stats">
          <li>课次：{{ today?.lessons ?? 0 }}</li>
          <li>星星：{{ today?.stars ?? 0 }}</li>
          <li>跟读：{{ today?.reads ?? 0 }}</li>
          <li>连续打卡：{{ progress.streak }} 天</li>
          <li>总星：{{ progress.totalStars }} · 已完成课 {{ progress.doneCount }}</li>
        </ul>
        <h3>最近完成</h3>
        <ul class="list">
          <li v-for="r in recentLessons" :key="r.id">
            Day {{ r.lesson?.day }} · {{ r.lesson?.title.zh }} · ⭐{{ r.stars }}
          </li>
          <li v-if="!recentLessons.length" class="parent-hint">还没有完成的课</li>
        </ul>
      </section>

      <section v-else-if="tab === 'script'" class="panel">
        <h2>L1 家长教案</h2>
        <label class="field">
          Day
          <input v-model.number="scriptDay" class="input sm" type="number" min="1" max="20" />
        </label>
        <template v-if="script">
          <h3>{{ script.titleZh }}</h3>
          <p class="parent-hint">教具：{{ script.materialsZh.join('、') }}</p>
          <div v-for="(sec, i) in script.sections" :key="i" class="script-sec">
            <h4>{{ sec.name }} <span class="parent-hint">{{ sec.minutes }}</span></h4>
            <pre>{{ sec.content }}</pre>
          </div>
        </template>
        <p v-else class="parent-hint">找不到 Day {{ scriptDay }} 教案</p>
      </section>

      <section v-else-if="tab === 'settings'" class="panel">
        <h2>设置</h2>
        <label class="field">
          孩子昵称
          <input v-model="settings.childName" class="input" type="text" maxlength="20" />
        </label>
        <label class="field">
          界面语言
          <select v-model="settings.uiLang" class="input">
            <option value="zh">中文</option>
            <option value="en">English</option>
            <option value="both">双语</option>
          </select>
        </label>
        <label class="field">
          跟读模式
          <select :value="settings.micMode" class="input" @change="setMic(($event.target as HTMLSelectElement).value as MicMode)">
            <option value="auto">自动降级</option>
            <option value="native">语音识别</option>
            <option value="record">录音自评</option>
            <option value="parent">家长确认</option>
          </select>
        </label>
        <label class="field">
          TTS 音色 {{ supported ? '' : '（本机不支持）' }}
          <select v-model="settings.voiceName" class="input">
            <option value="">自动优选美音</option>
            <option v-for="v in voices" :key="v.name" :value="v.name">{{ v.name }} ({{ v.lang }})</option>
          </select>
        </label>
        <label class="check">
          <input v-model="settings.soundOn" type="checkbox" />
          音效开
        </label>
        <label class="check">
          <input v-model="settings.enforceLevelLock" type="checkbox" />
          级别锁定（完成上一级才开下一级）
        </label>
        <label class="field">
          修改 PIN（留空不改）
          <input
            class="input"
            type="password"
            maxlength="8"
            placeholder="新 PIN"
            @change="settings.parentPin = ($event.target as HTMLInputElement).value"
          />
        </label>
      </section>

      <section v-else class="panel">
        <h2>数据</h2>
        <div class="row">
          <BigButton @click="exportJson">导出进度 JSON</BigButton>
          <label class="file-btn big-btn">
            导入进度
            <input type="file" accept="application/json,.json" hidden @change="importJson" />
          </label>
        </div>
        <BigButton color="--c-danger" @click="resetProgress">清空全部进度</BigButton>
        <p v-if="msg" class="parent-hint">{{ msg }}</p>
      </section>
    </template>
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-parent);
}
.head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.head h1 {
  margin: 0;
  font-size: 24px;
}
.back-btn {
  min-width: 72px;
  min-height: 72px;
}
.gate {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 12px;
}
.math {
  font-size: 40px;
  font-weight: 800;
  margin: 0;
  font-family: var(--font-kid);
}
.input {
  font-family: var(--font-parent);
  font-size: 18px;
  padding: 12px 14px;
  border-radius: var(--r-sm);
  border: 2px solid #e0d0c0;
  width: min(280px, 90vw);
  background: #fff;
}
.input.sm {
  width: 80px;
}
.warn {
  color: #c62828;
}
.tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.tab {
  padding: 10px 16px;
  border-radius: var(--r-full);
  background: #fff;
  box-shadow: var(--shadow-card);
  font-weight: 700;
}
.tab.on {
  background: var(--c-l3);
  color: #fff;
}
.panel h2 {
  margin: 0 0 12px;
}
.stats,
.list {
  padding-left: 20px;
  line-height: 1.8;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--c-ink-soft);
}
.check {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.script-sec {
  background: #fff;
  border-radius: var(--r-md);
  padding: 12px 14px;
  margin-bottom: 10px;
  box-shadow: var(--shadow-card);
}
.script-sec pre {
  white-space: pre-wrap;
  font-family: var(--font-parent);
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
}
.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.file-btn {
  cursor: pointer;
  padding: 0 18px;
}
</style>
