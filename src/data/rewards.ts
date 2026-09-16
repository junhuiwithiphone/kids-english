import type { Badge, Sticker } from './schema'

/* ═══ 贴纸目录：每课一枚，按单元分组进贴纸册 ═══ */

export const stickers: Sticker[] = [
  // ── L1（20课，对齐庭雨教案 Day1-20）──
  { id: 'l1-st-01', emoji: '🧸', name: { en: 'Teddy', zh: '小玩偶' } },
  { id: 'l1-st-02', emoji: '🐰', name: { en: 'Bunny', zh: '小兔子' } },
  { id: 'l1-st-03', emoji: '🎪', name: { en: 'Circus', zh: '跳跳马戏团' } },
  { id: 'l1-st-04', emoji: '🫧', name: { en: 'Bubbles', zh: '泡泡' } },
  { id: 'l1-st-05', emoji: '🥇', name: { en: 'Week 1 Champion', zh: '第一周小冠军' } },
  { id: 'l1-st-06', emoji: '🔴', name: { en: 'Red Ball', zh: '红彩球' } },
  { id: 'l1-st-07', emoji: '🐾', name: { en: 'Paw Print', zh: '动物脚印' } },
  { id: 'l1-st-08', emoji: '🦆', name: { en: 'Yellow Duck', zh: '黄鸭子' } },
  { id: 'l1-st-09', emoji: '🐘', name: { en: 'Gray Elephant', zh: '灰大象' } },
  { id: 'l1-st-10', emoji: '📗', name: { en: 'Brown Bear', zh: '棕熊绘本' } },
  { id: 'l1-st-11', emoji: '🍎', name: { en: 'Apple', zh: '苹果' } },
  { id: 'l1-st-12', emoji: '🍌', name: { en: 'Banana Hat', zh: '香蕉帽' } },
  { id: 'l1-st-13', emoji: '🥄', name: { en: 'Little Spoon', zh: '小勺子' } },
  { id: 'l1-st-14', emoji: '🍪', name: { en: 'Cookie', zh: '小饼干' } },
  { id: 'l1-st-15', emoji: '🍇', name: { en: 'Grapes', zh: '葡萄干奖励' } },
  { id: 'l1-st-16', emoji: '🧢', name: { en: 'Cool Hat', zh: '酷帽子' } },
  { id: 'l1-st-17', emoji: '🌈', name: { en: 'Sunshine', zh: '小太阳' } },
  { id: 'l1-st-18', emoji: '☂️', name: { en: 'Umbrella', zh: '小雨伞' } },
  { id: 'l1-st-19', emoji: '🧣', name: { en: 'Warm & Cozy', zh: '暖暖和和' } },
  { id: 'l1-st-20', emoji: '🏆', name: { en: 'Super Star', zh: '月度超级明星' } },
  // ── L2（16课）──
  { id: 'l2-st-01', emoji: '👨‍👩‍👧', name: { en: 'My Family', zh: '我的家' } },
  { id: 'l2-st-02', emoji: '💝', name: { en: 'Love', zh: '爱心' } },
  { id: 'l2-st-03', emoji: '👶', name: { en: 'Baby', zh: '小宝宝' } },
  { id: 'l2-st-04', emoji: '🏡', name: { en: 'Home', zh: '温暖的家' } },
  { id: 'l2-st-05', emoji: '⚽', name: { en: 'Ball', zh: '小皮球' } },
  { id: 'l2-st-06', emoji: '🚗', name: { en: 'Toy Car', zh: '玩具车' } },
  { id: 'l2-st-07', emoji: '🧸', name: { en: 'Teddy Bear', zh: '泰迪熊' } },
  { id: 'l2-st-08', emoji: '🎁', name: { en: 'Gift', zh: '礼物' } },
  { id: 'l2-st-09', emoji: '🌳', name: { en: 'Big Tree', zh: '大树' } },
  { id: 'l2-st-10', emoji: '🌸', name: { en: 'Flower', zh: '小花' } },
  { id: 'l2-st-11', emoji: '🐦', name: { en: 'Little Bird', zh: '小鸟' } },
  { id: 'l2-st-12', emoji: '🪁', name: { en: 'Kite', zh: '风筝' } },
  { id: 'l2-st-13', emoji: '🚌', name: { en: 'Bus', zh: '公交车' } },
  { id: 'l2-st-14', emoji: '🚂', name: { en: 'Train', zh: '小火车' } },
  { id: 'l2-st-15', emoji: '✈️', name: { en: 'Plane', zh: '飞机' } },
  { id: 'l2-st-16', emoji: '🌙', name: { en: 'Moon', zh: '月亮班毕业' } },
  // ── L3（16课）──
  { id: 'l3-st-01', emoji: '🌅', name: { en: 'Sunrise', zh: '日出' } },
  { id: 'l3-st-02', emoji: '🛁', name: { en: 'Bath Time', zh: '洗澡时间' } },
  { id: 'l3-st-03', emoji: '🌛', name: { en: 'Good Night', zh: '晚安' } },
  { id: 'l3-st-04', emoji: '⏰', name: { en: 'My Day', zh: '我的一天' } },
  { id: 'l3-st-05', emoji: '😄', name: { en: 'Happy', zh: '开心' } },
  { id: 'l3-st-06', emoji: '💪', name: { en: 'Brave', zh: '勇敢' } },
  { id: 'l3-st-07', emoji: '🤗', name: { en: 'Hug', zh: '抱抱' } },
  { id: 'l3-st-08', emoji: '💖', name: { en: 'Feelings', zh: '情绪小主人' } },
  { id: 'l3-st-09', emoji: '🐮', name: { en: 'Farm', zh: '农场' } },
  { id: 'l3-st-10', emoji: '🦁', name: { en: 'Jungle', zh: '丛林' } },
  { id: 'l3-st-11', emoji: '🐳', name: { en: 'Ocean', zh: '海洋' } },
  { id: 'l3-st-12', emoji: '🦒', name: { en: 'Animal Homes', zh: '动物之家' } },
  { id: 'l3-st-13', emoji: '🌍', name: { en: 'Earth', zh: '地球' } },
  { id: 'l3-st-14', emoji: '⛰️', name: { en: 'Mountain', zh: '高山' } },
  { id: 'l3-st-15', emoji: '🏜️', name: { en: 'Desert', zh: '沙漠' } },
  { id: 'l3-st-16', emoji: '☀️', name: { en: 'Sun', zh: '太阳班毕业' } },
]

/* ═══ 勋章目录 ═══ */

export const badges: Badge[] = [
  {
    id: 'first-lesson',
    emoji: '🌱',
    name: { en: 'First Step', zh: '第一课' },
    desc: { en: 'Finished the very first lesson!', zh: '完成了人生中第一节英语课！' },
  },
  {
    id: 'unit-l1-u1',
    emoji: '🧒',
    name: { en: 'Body Master', zh: '身体小达人' },
    desc: { en: 'Finished My Magic Body unit.', zh: '学完「我的神奇身体」单元。' },
  },
  {
    id: 'unit-l1-u2',
    emoji: '🎨',
    name: { en: 'Color Explorer', zh: '颜色探险家' },
    desc: { en: 'Finished Colorful Zoo unit.', zh: '学完「彩色动物园」单元。' },
  },
  {
    id: 'unit-l1-u3',
    emoji: '🍽️',
    name: { en: 'Foodie Star', zh: '餐桌小明星' },
    desc: { en: 'Finished Yummy Food unit.', zh: '学完「美味食物」单元。' },
  },
  {
    id: 'unit-l1-u4',
    emoji: '🧥',
    name: { en: 'Weather Watcher', zh: '天气观察员' },
    desc: { en: 'Finished Clothes & Weather unit.', zh: '学完「穿衣与天气」单元。' },
  },
  {
    id: 'showcase-l1',
    emoji: '🏆',
    name: { en: 'Show Time!', zh: '月度展示之星' },
    desc: { en: 'Completed the Day 20 showcase!', zh: '完成了 Day 20 月度展示！' },
  },
  {
    id: 'streak-7',
    emoji: '🔥',
    name: { en: '7-Day Streak', zh: '连续7天' },
    desc: { en: 'Studied 7 days in a row.', zh: '连续学习7天，坚持就是胜利！' },
  },
  {
    id: 'stars-100',
    emoji: '💯',
    name: { en: '100 Stars', zh: '百星闪耀' },
    desc: { en: 'Collected 100 stars in total.', zh: '累计获得100颗星星。' },
  },
  {
    id: 'reader-10',
    emoji: '🎤',
    name: { en: 'Little Reader', zh: '跟读小能手' },
    desc: { en: 'Scored 60+ on 10 read-aloud words.', zh: '10个单词跟读得分达到60分以上。' },
  },
  {
    id: 'level-l1',
    emoji: '⭐',
    name: { en: 'L1 Graduate', zh: '星星班毕业' },
    desc: { en: 'Finished all L1 lessons.', zh: '完成启蒙级全部课程！' },
  },
  {
    id: 'level-l2',
    emoji: '🌙',
    name: { en: 'L2 Graduate', zh: '月亮班毕业' },
    desc: { en: 'Finished all L2 lessons.', zh: '完成基础级全部课程！' },
  },
  {
    id: 'level-l3',
    emoji: '☀️',
    name: { en: 'L3 Graduate', zh: '太阳班毕业' },
    desc: { en: 'Finished all L3 lessons.', zh: '完成进阶级全部课程！' },
  },
]

export const stickerMap = new Map(stickers.map((s) => [s.id, s]))
export const badgeMap = new Map(badges.map((b) => [b.id, b]))
