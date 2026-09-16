import type { Song } from '../schema'

/* ═══════════════════════════════════════════════════════════
   L3 ☀️ Sun 进阶级儿歌库 — 8 首
   traditional=公版传统儿歌改编 / original=自编 chant
   U1 一日流程（Good Morning / This Is the Way / Good Night）
   U2 情绪（If You're Happy 情绪版）
   U3 动物家园（The Animals Walk / Whale Song；农场复用 l1-s-old-macdonald）
   U4 小探险家（Big Blue Earth / Phonics Chant sh-ch-th）
   ═══════════════════════════════════════════════════════════ */

export const l3Songs: Song[] = [
  {
    id: 'l3-s-good-morning',
    title: { en: 'Good Morning Song', zh: '早安歌（自编）' },
    source: 'original',
    baseRate: 0.9,
    beatMode: 'chant',
    lines: [
      { text: 'Good morning, good morning, good morning to you!', zh: '早安，早安，跟你说早安！', action: '🌞 张开双臂迎接太阳' },
      { text: 'Good morning, good morning, what a brand new day!', zh: '早安早安，全新的一天！', action: '🙌 双手举高高', repeat: 1 },
      { text: 'Wake up! Wake up! Stretch, stretch, stretch!', zh: '起床啦！伸伸大懒腰！', action: '🌅 伸个大懒腰' },
      { text: 'I can eat, I can play, I can sing today!', zh: '我会吃饭、会玩、还会唱歌！', action: '💪 拍拍小胸脯' },
      { text: 'Good morning, good morning, good morning to you!', zh: '早安，早安，跟你说早安！', action: '👋 挥挥手再唱一遍' },
    ],
  },
  {
    id: 'l3-s-this-is-the-way',
    title: { en: 'This Is the Way We Get Dressed', zh: '我们这样穿衣服（传统改编）' },
    source: 'traditional',
    baseRate: 0.9,
    beatMode: 'chant',
    lines: [
      { text: 'This is the way we brush our teeth,', zh: '我们这样刷牙齿', action: '🪥 手指当牙刷刷刷刷' },
      { text: 'Brush our teeth, brush our teeth!', zh: '刷牙齿，刷牙齿！', action: '🪥 继续刷，露出小白牙', repeat: 1 },
      { text: 'This is the way we get dressed,', zh: '我们这样穿衣服', action: '👕 做穿衣服的动作' },
      { text: 'Get dressed, get dressed, hooray, hooray!', zh: '穿好衣服，耶耶！', action: '🙌 举手欢呼' },
      { text: 'This is the way we take a bath,', zh: '我们这样洗香香', action: '🛁 搓搓手臂假装洗澡' },
      { text: 'So early in the morning!', zh: '一大早就洗得香喷喷！', action: '🌞 双手比大太阳' },
    ],
  },
  {
    id: 'l3-s-feelings',
    title: { en: "If You're Happy (Feelings)", zh: '如果感到幸福·情绪版（传统改编）' },
    source: 'traditional',
    baseRate: 0.9,
    beatMode: 'chant',
    lines: [
      { text: "If you're happy and you know it, show a big smile!", zh: '开心就露出大大的笑', action: '😄 咧嘴大笑指脸蛋' },
      { text: "If you're sad and you know it, hug yourself tight.", zh: '难过就抱抱自己', action: '😢 双手抱紧自己撇撇嘴' },
      { text: "If you're angry and you know it, stomp your feet!", zh: '生气就跺跺脚', action: '😠 叉腰皱眉跺跺脚' },
      { text: "If you're scared and you know it, hide your eyes.", zh: '害怕就捂住眼睛', action: '😨 双手捂脸偷偷看' },
      { text: 'How are you? How are you? Tell me how you feel!', zh: '你好吗？告诉我你的感觉！', action: '💬 摊手歪头问一问' },
    ],
  },
  {
    id: 'l3-s-animals-walk',
    title: { en: 'The Animals Walk', zh: '动物走走走（自编）' },
    source: 'original',
    baseRate: 0.9,
    beatMode: 'chant',
    lines: [
      { text: 'The lion walks stomp, stomp, stomp!', zh: '狮子走路 咚咚咚', action: '🦁 张大爪子大踏步' },
      { text: 'The monkey jumps hop, hop, hop!', zh: '猴子跳跳 蹦蹦蹦', action: '🐵 学猴子蹦蹦跳' },
      { text: 'The horse runs clip-clop, clip-clop!', zh: '小马跑步 哒哒哒', action: '🐴 骑小马原地跑' },
      { text: 'The bee flies buzz, buzz, buzz!', zh: '蜜蜂飞飞 嗡嗡嗡', action: '🐝 张开手臂绕圈飞' },
      { text: 'Where do they live? Where do they live?', zh: '它们住在哪里呀？', action: '🏠 手搭凉棚找一找' },
    ],
  },
  {
    id: 'l3-s-whale-song',
    title: { en: 'Whale Song (Ocean Chant)', zh: '鲸鱼歌·海洋韵律（自编）' },
    source: 'original',
    baseRate: 0.85,
    beatMode: 'chant',
    lines: [
      { text: 'The whale in the ocean goes swish, swish, swish!', zh: '海洋里的大鲸鱼 刷刷刷', action: '🐳 双臂慢慢摆动像大鲸鱼' },
      { text: 'Swish, swish, swish! Swish, swish, swish!', zh: '刷刷刷！刷刷刷！', action: '🌊 全身做波浪起伏', repeat: 1 },
      { text: 'The shark in the ocean goes chomp, chomp, chomp!', zh: '海洋里的大鲨鱼 啊啊啊', action: '🦈 手掌当鲨鱼鳍游一游' },
      { text: 'The fish in the ocean goes blub, blub, blub!', zh: '海洋里的小鱼儿 咕噜噜', action: '🐟 双手合掌学小鱼游' },
      { text: 'The ocean is big! The ocean is blue!', zh: '海洋好大！海洋好蓝！', action: '🌊 双手画一个大大的圆' },
    ],
  },
  {
    id: 'l3-s-phonics-chant',
    title: { en: 'Phonics Chant: sh ch th', zh: '双字母音韵律操（自编）' },
    source: 'original',
    baseRate: 0.85,
    beatMode: 'chant',
    lines: [
      { text: 'Sh, sh, ship! Sh, sh, shop! Sh, sh, fish!', zh: '嘘嘘嘘——船！商店！小鱼！', action: '🚢 手指放嘴边做"嘘"声再拍手' },
      { text: 'Ch, ch, chair! Ch, ch, lunch! Ch, ch, beach!', zh: '恰恰恰——椅子！午餐！海滩！', action: '🪑 学小火车 ch-ch 开起来' },
      { text: 'Th, th, this! Th, th, that! Th, th, mouth!', zh: '咬舌尖——这个！那个！嘴巴！', action: '👉 舌尖轻咬送气，指一指' },
      { text: 'Sh! Ch! Th! Say it with me!', zh: 'sh！ch！th！大声跟我念！', action: '🎤 举"话筒"大声念', repeat: 2 },
    ],
  },
  {
    id: 'l3-s-explorer',
    title: { en: 'The Big Blue Earth', zh: '大大的蓝色地球（自编）' },
    source: 'original',
    baseRate: 0.85,
    beatMode: 'chant',
    lines: [
      { text: 'The earth is big, the earth is round!', zh: '地球大大的，地球圆圆的！', action: '🌍 双手抱大球慢慢转圈' },
      { text: 'The ocean is blue, blue, blue!', zh: '海洋蓝蓝蓝！', action: '🌊 双手做波浪' },
      { text: 'The mountain is tall, the river runs long!', zh: '高山高高高，小河长长长！', action: '⛰️ 双手从低举到最高' },
      { text: 'Desert, forest, island too!', zh: '沙漠、森林、还有小岛！', action: '🏝️ 伸出手指头数一数' },
      { text: 'I am a little explorer! Yay!', zh: '我是小小探险家！耶！', action: '🙌 举手欢呼跳一跳' },
    ],
  },
  {
    id: 'l3-s-good-night',
    title: { en: 'Good Night Song', zh: '晚安歌（自编慢速，睡前唱）' },
    source: 'original',
    baseRate: 0.7,
    beatMode: 'slow',
    lines: [
      { text: 'Good night, good night, the sun goes down.', zh: '晚安晚安，太阳下山了。', action: '🌙 双手慢慢落下' },
      { text: 'Good night, teddy, sleep tight.', zh: '晚安小熊，好好睡。', action: '🧸 抱抱玩偶轻轻摇' },
      { text: 'I had a bath, I brushed my teeth.', zh: '我洗了澡，刷了牙。', action: '🛁 轻声做洗澡刷牙的小动作' },
      { text: 'Good night, Mommy. Good night, Daddy.', zh: '晚安妈妈，晚安爸爸。', action: '🤗 亲亲爸爸妈妈' },
      { text: 'Good night, good night, sweet dreams.', zh: '晚安晚安，做个好梦。', action: '💤 闭眼装睡，声音越来越轻' },
      { text: 'I can sleep all by myself.', zh: '我会自己睡觉啦。', action: '💪 轻拍胸脯（悄悄话说）' },
    ],
  },
]
