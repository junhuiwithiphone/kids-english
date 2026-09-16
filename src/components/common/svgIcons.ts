/* ═══════════════════════════════════════════════════════════
   内联 SVG 注册表 —— 零外部图片资源。
   两类：
   1. 教学词图（彩色卡通，emoji 表现不佳的身体部位/餐具等）
   2. coloring-* 涂色页（line-art 线稿，可打印，.print-area 配合）
   键名与 Word.svgKey / HandsOn.printableSvgKey 对应。
   ═══════════════════════════════════════════════════════════ */

export interface SvgIconDef {
  /** 默认 0 0 100 100 */
  viewBox?: string
  /** SVG 内部标记（不含 <svg> 外壳） */
  body: string
  /** 涂色线稿（打印时用黑色描边） */
  lineArt?: boolean
}

const SKIN = '#ffd8a8'
const SKIN_DARK = '#f4b183'
const HAIR = '#8d6e63'
const INK = '#5d4037'

export const svgIcons: Record<string, SvgIconDef> = {
  /* ── 身体部位（L1 U1） ── */
  'body-head': {
    body: `
      <path d="M18 44 Q16 12 50 10 Q84 12 82 44 Q70 26 50 26 Q30 26 18 44 Z" fill="${HAIR}"/>
      <circle cx="50" cy="50" r="34" fill="${SKIN}"/>
      <path d="M18 44 Q16 12 50 10 Q84 12 82 44 Q76 30 62 24 L58 34 Q44 28 34 34 Q24 38 18 44 Z" fill="${HAIR}"/>
      <circle cx="38" cy="48" r="4.5" fill="${INK}"/>
      <circle cx="62" cy="48" r="4.5" fill="${INK}"/>
      <circle cx="39.5" cy="46.5" r="1.5" fill="#fff"/>
      <circle cx="63.5" cy="46.5" r="1.5" fill="#fff"/>
      <circle cx="30" cy="60" r="5" fill="#ffb3a7" opacity=".7"/>
      <circle cx="70" cy="60" r="5" fill="#ffb3a7" opacity=".7"/>
      <path d="M38 64 Q50 74 62 64" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  'body-shoulders': {
    body: `
      <circle cx="50" cy="22" r="15" fill="${SKIN}"/>
      <path d="M44 20 Q44 12 52 13" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="22" r="2" fill="${INK}"/><circle cx="56" cy="22" r="2" fill="${INK}"/>
      <path d="M50 40 C26 40 14 56 12 86 L88 86 C86 56 74 40 50 40 Z" fill="#43c463"/>
      <path d="M50 40 C40 40 32 43 26 48 M50 40 C60 40 68 43 74 48" stroke="#2e7d32" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="56" r="6" fill="#fff" opacity=".5"/>
      <circle cx="78" cy="56" r="6" fill="#fff" opacity=".5"/>`,
  },
  'body-knees': {
    body: `
      <path d="M22 4 h30 v22 q0 6 -6 6 h-18 q-6 0 -6 -6 z" fill="#2fa8e0"/>
      <path d="M48 4 h30 v22 q0 6 -6 6 h-18 q-6 0 -6 -6 z" fill="#2fa8e0"/>
      <rect x="27" y="26" width="20" height="60" rx="10" fill="${SKIN}"/>
      <rect x="53" y="26" width="20" height="60" rx="10" fill="${SKIN}"/>
      <circle cx="37" cy="56" r="8.5" fill="${SKIN_DARK}" opacity=".75"/>
      <circle cx="63" cy="56" r="8.5" fill="${SKIN_DARK}" opacity=".75"/>
      <path d="M33 54 q4 5 8 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M59 54 q4 5 8 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <rect x="23" y="84" width="28" height="12" rx="6" fill="#ffb300"/>
      <rect x="49" y="84" width="28" height="12" rx="6" fill="#ffb300"/>`,
  },
  'body-toes': {
    body: `
      <path d="M36 96 Q14 96 14 72 Q14 40 28 18 L56 18 Q66 46 64 72 Q62 96 36 96 Z" fill="${SKIN}"/>
      <circle cx="30" cy="12" r="7" fill="${SKIN}"/><circle cx="43" cy="9" r="6" fill="${SKIN}"/>
      <circle cx="55" cy="12" r="5.5" fill="${SKIN}"/><circle cx="65" cy="18" r="5" fill="${SKIN}"/>
      <circle cx="73" cy="26" r="4.5" fill="${SKIN}"/>
      <circle cx="30" cy="12" r="7" fill="none" stroke="${SKIN_DARK}" stroke-width="2"/>
      <path d="M22 60 Q38 52 56 62" stroke="${SKIN_DARK}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
      <circle cx="34" cy="76" r="4" fill="#ffb3a7" opacity=".6"/>`,
  },
  'body-eyes': {
    body: `
      <ellipse cx="27" cy="50" rx="21" ry="24" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <ellipse cx="73" cy="50" rx="21" ry="24" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <circle cx="30" cy="52" r="11" fill="#6d4c41"/>
      <circle cx="70" cy="52" r="11" fill="#6d4c41"/>
      <circle cx="27" cy="47" r="4" fill="#fff"/><circle cx="67" cy="47" r="4" fill="#fff"/>
      <path d="M10 26 Q27 14 44 24" stroke="${HAIR}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M56 24 Q73 14 90 26" stroke="${HAIR}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  },
  'body-ears': {
    body: `
      <path d="M34 14 Q8 26 8 52 Q8 80 32 90" stroke="${SKIN_DARK}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <path d="M66 14 Q92 26 92 52 Q92 80 68 90" stroke="${SKIN_DARK}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <path d="M28 30 Q16 38 16 52 Q16 68 28 76" stroke="#e8a87c" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M72 30 Q84 38 84 52 Q84 68 72 76" stroke="#e8a87c" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="52" r="16" fill="#ffe082"/>
      <path d="M44 50 h12 M50 44 v12" stroke="${INK}" stroke-width="0" fill="none"/>
      <text x="50" y="60" font-size="22" text-anchor="middle" fill="${INK}">👂</text>`,
  },

  /* ── 餐具（L1 U3） ── */
  'food-cup': {
    body: `
      <path d="M18 24 h56 l-6 60 q-1 8 -9 8 h-26 q-8 0 -9 -8 z" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <path d="M74 36 q22 4 16 26 q-5 16 -21 13" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M22 44 h48 l-3.5 36 q-1 6 -7 6 h-27 q-6 0 -7 -6 z" fill="#81d4fa"/>
      <path d="M28 52 q8 4 16 0 q8 -4 16 0" stroke="#b3e5fc" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="34" cy="16" r="4" fill="#90caf9" opacity=".8"/>`,
  },

  /* ── 涂色页 line-art（可打印） ── */
  'coloring-kid': {
    lineArt: true,
    body: `
      <g stroke="#333" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="210" cy="90" r="42"/>
        <path d="M172 74 Q180 40 210 40 Q240 40 248 74"/>
        <circle cx="196" cy="88" r="4"/><circle cx="224" cy="88" r="4"/>
        <path d="M198 106 Q210 116 222 106"/>
        <path d="M210 132 L210 230"/>
        <path d="M210 150 L150 190 M210 150 L270 190"/>
        <path d="M210 230 L170 310 M210 230 L250 310"/>
        <path d="M162 310 h20 M238 310 h20"/>
        <path d="M186 140 h48 l14 90 h-76 z"/>
        <circle cx="70" cy="70" r="24"/>
        <path d="M70 34 v-16 M70 106 v16 M34 70 h-16 M106 70 h16 M45 45 l-11 -11 M95 45 l11 -11 M45 95 l-11 11 M95 95 l11 11"/>
      </g>`,
    viewBox: '0 0 420 360',
  },
  'coloring-elephant': {
    lineArt: true,
    body: `
      <g stroke="#333" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="240" cy="200" rx="120" ry="90"/>
        <circle cx="120" cy="160" r="70"/>
        <path d="M60 190 Q40 260 70 300 Q85 318 100 305 Q88 285 82 260"/>
        <circle cx="150" cy="150" r="38"/>
        <circle cx="102" cy="142" r="6" fill="#333"/>
        <path d="M120 300 h36 M204 290 v40 M268 288 v42 M150 296 v38"/>
        <path d="M358 190 q30 -6 34 -40"/>
        <path d="M60 90 l10 -20 M90 70 l4 -22 M120 66 l14 -16"/>
      </g>`,
    viewBox: '0 0 420 360',
  },
  'coloring-sun': {
    lineArt: true,
    body: `
      <g stroke="#333" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="210" cy="180" r="80"/>
        <path d="M210 60 L210 20 M210 300 L210 340 M90 180 L50 180 M330 180 L370 180
                 M125 95 L97 67 M295 95 L323 67 M125 265 L97 293 M295 265 L323 293"/>
        <circle cx="182" cy="160" r="7" fill="#333"/><circle cx="238" cy="160" r="7" fill="#333"/>
        <path d="M178 205 Q210 230 242 205"/>
        <path d="M150 330 q30 -18 60 0 q30 -18 60 0"/>
      </g>`,
    viewBox: '0 0 420 360',
  },
  'coloring-star': {
    lineArt: true,
    body: `
      <g stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M210 30 L258 150 L390 158 L288 240 L322 368 L210 296 L98 368 L132 240 L30 158 L162 150 Z"/>
        <circle cx="180" cy="190" r="7" fill="#333"/><circle cx="240" cy="190" r="7" fill="#333"/>
        <path d="M182 230 Q210 252 238 230"/>
        <path d="M60 60 l8 -18 M360 60 l-8 -18 M60 320 l-14 12 M360 320 l14 12"/>
      </g>`,
    viewBox: '0 0 420 400',
  },
}
