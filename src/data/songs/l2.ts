import type { Song } from '../schema'

/* ═══════════════════════════════════════════════════════════
   L2 儿歌库 — 对齐 L2 四单元主题
   U1 Family: Finger Family / Family Song
   U2 Toys: Teddy Bear / Phonics Chant(-at)
   U3 Park: Twinkle Twinkle / Phonics Chant(-og)
   U4 Move: Wheels on the Bus / Row Row / Phonics Chant(-ig)
   开场/结束歌复用 L1 全局：l1-s-hello / l1-s-goodbye（不重写）
   ═══════════════════════════════════════════════════════════ */

export const l2Songs: Song[] = [
  {
    id: 'l2-s-finger-family',
    title: { en: 'Finger Family', zh: '手指一家人（传统）' },
    source: 'traditional',
    baseRate: 0.9,
    beatMode: 'chant',
    lines: [
      { text: 'Daddy finger, daddy finger, where are you?', zh: '爸爸手指，爸爸手指，你在哪里？', action: '👍 伸出大拇指摇一摇' },
      { text: 'Here I am! Here I am! How do you do?', zh: '我在这里！你好呀！', action: '👍 另一只手的大拇指出来点点头' },
      { text: 'Mommy finger, mommy finger, where are you?', zh: '妈妈手指，妈妈手指，你在哪里？', action: '☝️ 伸出食指摇一摇' },
      { text: 'Here I am! Here I am! How do you do?', zh: '我在这里！你好呀！', action: '☝️ 两根食指碰一碰' },
      { text: 'Brother finger, brother finger, where are you?', zh: '兄弟手指，你在哪里？', action: '✌️ 伸出最高的那根手指摇一摇' },
      { text: 'Here I am! Here I am! How do you do?', zh: '我在这里！你好呀！', action: '✌️ 手指出来点点头' },
      { text: 'Sister finger, sister finger, where are you?', zh: '姐妹手指，你在哪里？', action: '💍 伸出无名指摇一摇' },
      { text: 'Here I am! Here I am! How do you do?', zh: '我在这里！你好呀！', action: '💍 无名指出来点点头' },
      { text: 'Baby finger, baby finger, where are you?', zh: '宝宝手指，你在哪里？', action: '🤙 伸出小指摇一摇' },
      { text: 'Here I am! Here I am! How do you do?', zh: '我在这里！你好呀！', action: '🤙 双手十指一起摇，全家到齐啦' },
    ],
  },
  {
    id: 'l2-s-teddy-bear',
    title: { en: 'Teddy Bear, Teddy Bear', zh: '泰迪熊泰迪熊（传统）' },
    source: 'traditional',
    baseRate: 0.9,
    beatMode: 'chant',
    lines: [
      { text: 'Teddy bear, teddy bear, turn around.', zh: '泰迪熊泰迪熊，转个圈', action: '🧸 原地转一圈' },
      { text: 'Teddy bear, teddy bear, touch the ground.', zh: '泰迪熊泰迪熊，摸摸地', action: '🧸 弯腰摸摸地板' },
      { text: 'Teddy bear, teddy bear, jump up high.', zh: '泰迪熊泰迪熊，跳高高', action: '🦘 向上跳一下' },
      { text: 'Teddy bear, teddy bear, touch the sky.', zh: '泰迪熊泰迪熊，摸摸天', action: '🙌 手往上够一够' },
      { text: 'Teddy bear, teddy bear, touch your nose.', zh: '泰迪熊泰迪熊，摸鼻子', action: '👃 点点小鼻子' },
      { text: 'Teddy bear, teddy bear, touch your toes.', zh: '泰迪熊泰迪熊，摸脚趾', action: '🦶 弯腰摸脚趾' },
      { text: 'Teddy bear, teddy bear, sit down please!', zh: '泰迪熊泰迪熊，请坐下', action: '🪑 扑通坐下，抱紧泰迪' },
    ],
  },
  {
    id: 'l2-s-wheels-on-bus',
    title: { en: 'The Wheels on the Bus', zh: '巴士上的轮子（传统）' },
    source: 'traditional',
    baseRate: 0.9,
    beatMode: 'chant',
    lines: [
      { text: 'The wheels on the bus go round and round,', zh: '巴士的轮子转呀转', action: '🚌 双手手臂绕圈圈' },
      { text: 'Round and round! Round and round!', zh: '转呀转！转呀转！', action: '🚌 继续绕圈，越绕越快' },
      { text: 'The wipers on the bus go swish, swish, swish,', zh: '巴士的雨刷刷刷刷', action: '🌧️ 双手在面前左右刷' },
      { text: 'Swish, swish, swish! Swish, swish, swish!', zh: '刷刷刷！刷刷刷！', action: '🌧️ 再刷三下' },
      { text: 'The horn on the bus goes beep, beep, beep,', zh: '巴士的喇叭滴滴滴', action: '📣 按喇叭的手势' },
      { text: 'Beep, beep, beep! Beep, beep, beep!', zh: '滴滴滴！滴滴滴！', action: '📣 用力按三下' },
      { text: 'The doors on the bus go open and shut,', zh: '巴士的门开了又关', action: '🚪 双手开合开合' },
      { text: 'Open... shut! Open... shut!', zh: '开……关！开……关！', action: '🚪 夸张地开合' },
      { text: 'The people on the bus go up and down!', zh: '车上的人上上下下', action: '🧍 踮脚站高→蹲下' },
    ],
  },
  {
    id: 'l2-s-row-row',
    title: { en: 'Row, Row, Row Your Boat', zh: '划呀划小船（传统）' },
    source: 'traditional',
    baseRate: 0.85,
    beatMode: 'slow',
    lines: [
      { text: 'Row, row, row your boat,', zh: '划呀划呀划小船', action: '🚣 双手做划船动作', repeat: 1 },
      { text: 'Gently down the stream.', zh: '顺流而下轻轻漂', action: '🌊 手像水波轻轻流动' },
      { text: 'Merrily, merrily, merrily, merrily,', zh: '快快乐乐，快快乐乐', action: '😊 左右摇摆笑嘻嘻' },
      { text: 'Life is but a dream!', zh: '生活就像一场梦', action: '😴 双手合十枕脸做睡觉状' },
    ],
  },
  {
    id: 'l2-s-twinkle',
    title: { en: 'Twinkle Twinkle Little Star', zh: '一闪一闪小星星（传统）' },
    source: 'traditional',
    baseRate: 0.85,
    beatMode: 'slow',
    lines: [
      { text: 'Twinkle, twinkle, little star,', zh: '一闪一闪小星星', action: '✨ 五指张开做星星闪烁' },
      { text: 'How I wonder what you are!', zh: '你到底是什么呢', action: '🤔 歪头做思考状' },
      { text: 'Up above the world so high,', zh: '高高挂在天上', action: '🙌 手指向高高的天空' },
      { text: 'Like a diamond in the sky.', zh: '像天空中的钻石', action: '💎 双手比一个大钻石' },
      { text: 'Twinkle, twinkle, little star,', zh: '一闪一闪小星星', action: '✨ 再闪一闪', repeat: 1 },
      { text: 'How I wonder what you are!', zh: '你到底是什么呢', action: '🤔 再歪头想一想' },
    ],
  },
  {
    id: 'l2-s-family-song',
    title: { en: 'My Family Song', zh: '我的一家人（自编 chant）' },
    source: 'original',
    baseRate: 0.9,
    beatMode: 'chant',
    lines: [
      { text: 'This is my mom, this is my dad.', zh: '这是我妈妈，这是我爸爸', action: '👨‍👩‍👧 拿全家福，唱到谁指谁' },
      { text: 'This is my grandma, this is my grandpa.', zh: '这是我奶奶，这是我爷爷', action: '👵 指一指，或学老人弯弯腰' },
      { text: 'Sister, brother, baby too,', zh: '姐妹兄弟，还有小宝宝', action: '👶 依次点点照片上的人' },
      { text: 'I love you! I love you!', zh: '我爱你们！我爱你们！', action: '❤️ 双手比心，给全家一个飞吻', repeat: 1 },
    ],
  },
  {
    id: 'l2-s-phonics-chant',
    title: { en: 'Phonics Chant: -at, -og, -ig', zh: '拼读节奏谣：-at / -og / -ig（自编）' },
    source: 'original',
    baseRate: 0.85,
    beatMode: 'chant',
    lines: [
      { text: 'C-a-t, cat! H-a-t, hat!', zh: 'c-a-t 猫！h-a-t 帽子！', action: '👏 每个字母拍一下手，读完整词双手一拍' },
      { text: 'S-a-t, sat! M-a-t, mat!', zh: 's-a-t 坐！m-a-t 垫子！', action: '🪑 说 sat 时扑通坐下' },
      { text: 'D-o-g, dog! L-o-g, log!', zh: 'd-o-g 狗！l-o-g 原木！', action: '🐶 说 dog 时学汪汪叫' },
      { text: 'F-r-o-g, frog! J-o-g, jog!', zh: 'f-r-o-g 青蛙！j-o-g 慢跑！', action: '🐸 说 frog 时学青蛙跳一下' },
      { text: 'P-i-g, pig! B-i-g, big!', zh: 'p-i-g 猪！b-i-g 大！', action: '🐷 说 pig 时按个猪鼻子' },
      { text: 'D-i-g, dig! W-i-g, wig!', zh: 'd-i-g 挖！w-i-g 假发！', action: '⛏️ 说 dig 时做挖土动作' },
      { text: 'Sound it out! You can do it!', zh: '拼出来！你可以的！', action: '🎉 竖大拇指欢呼' },
    ],
  },
]
