import type { LessonScript } from '../schema'

/* ═══════════════════════════════════════════════════════════
   L1 家长教案脚本 — 逐日录入《庭雨--Monthly英语教学-20260715.docx》
   用途：家长中心「今日任务 / 教案脚本」页签展示，
   指导线下 60 分钟完整课（网站课=其中 15 分钟屏幕部分的增强版）
   ═══════════════════════════════════════════════════════════ */

const SEC = {
  warm: { name: 'Warm-up 问候', minutes: '0–5分钟' },
  input: { name: '新词输入 + TPR游戏', minutes: '5–20分钟' },
  song: { name: '儿歌唱跳', minutes: '20–35分钟' },
  hands: { name: '动手活动', minutes: '35–50分钟' },
  wrap: { name: '总结奖励', minutes: '50–60分钟' },
}

export const l1Scripts: LessonScript[] = [
  /* ── 第1周 My Magic Body ── */
  {
    id: 'l1-sc-d1', lessonId: 'l1-u1-d1', day: 1, titleZh: '头 肩膀 膝盖 脚趾',
    materialsZh: ['小人涂色图纸', '蜡笔', '娃娃'],
    sections: [
      { ...SEC.warm, content: '抱娃娃坐垫上，摸她头说 "Hello, my little star! I\'m so happy to see you!"（中文辅助一次："老师好开心"）。' },
      { ...SEC.input, content: '只教4词：head, shoulders, knees, toes。你摸自己的头说 "head"，再轻轻摸她的头说 "head"。不做跟读要求。' },
      { ...SEC.song, content: 'Head Shoulders Knees & Toes（慢速版）：只做动作不唱词。' },
      { ...SEC.hands, content: '给一张空白小人图纸，你说 "Color the head red."（手把手帮她涂第一个，后面随她）。' },
      { ...SEC.wrap, content: '摸她的小手说 "Good job! See you tomorrow!" 预告：明天我们玩跳跳游戏。' },
    ],
  },
  {
    id: 'l1-sc-d2', lessonId: 'l1-u1-d2', day: 2, titleZh: '眼睛 耳朵 + Simon Says',
    materialsZh: ['兔子手偶', '贴纸'],
    sections: [
      { ...SEC.warm, content: '拿手偶说 "Good morning! Can you say hi to bunny?"（不强迫，你替她说）。衔接锚点：拿出昨天的小人图纸。' },
      { ...SEC.input, content: '复习 head/shoulders/knees/toes；新加 eyes, ears。Simon Says（只说 touch/point）："Simon says touch your head." 你示范她做。故意不说 Simon says 时你动她不动（笑出来就赢了）。' },
      { ...SEC.song, content: 'Head Shoulders 快版（加速，她会笑）。' },
      { ...SEC.hands, content: '镜子游戏：你们对坐，你摸 ear 她摸 ear，你喊 "Ears!"' },
      { ...SEC.wrap, content: '用贴纸在她手背贴一个，说 "One sticker for you!"' },
    ],
  },
  {
    id: 'l1-sc-d3', lessonId: 'l1-u1-d3', day: 3, titleZh: 'jump run stop + 定格舞',
    materialsZh: ['玩偶（藏找用）', '黏土', '音乐播放器'],
    sections: [
      { ...SEC.warm, content: '玩 Hide and seek：你藏玩偶让她找，找到后说 "You found it!"' },
      { ...SEC.input, content: '动作词：jump, run, stop, sit down。Freeze Dance——音乐响就 jump/run，音乐停喊 "Stop!" 她不动。' },
      { ...SEC.song, content: 'Walking Walking（Super Simple Songs 节奏）。' },
      { ...SEC.hands, content: '用黏土搓"小人"，每搓一个部位你念一次（只念，不考）。' },
      { ...SEC.wrap, content: '抱着她转一圈说 "You can jump! Amazing!"' },
    ],
  },
  {
    id: 'l1-sc-d4', lessonId: 'l1-u1-d4', day: 4, titleZh: 'clap stomp + 泡泡游戏',
    materialsZh: ['昨天的黏土小人（衔接锚点）', '泡泡水'],
    sections: [
      { ...SEC.warm, content: '拿出昨天的小人，问 "Where is head?" 让她指（指对就夸张鼓掌）。' },
      { ...SEC.input, content: '加入动作组合：clap your hands, stomp your feet。你发指令 "Clap! Stomp! Jump!" 连续三个动作，看她能否跟上。' },
      { ...SEC.song, content: "If You're Happy and You Know It（只做 clap/stomp）。" },
      { ...SEC.hands, content: '泡泡游戏：你吹泡泡，喊 "Pop!" 她去拍破。' },
      { ...SEC.wrap, content: '边挥手边说 "Bye-bye, see you!"' },
    ],
  },
  {
    id: 'l1-sc-d5', lessonId: 'l1-u1-d5', day: 5, titleZh: '复习日：障碍赛道 + 绘本',
    materialsZh: ['爬行垫', '枕头', '椅子', '绘本 From Head to Toe', '彩纸手环'],
    sections: [
      { ...SEC.warm, content: '"老师说"大合集：head/eyes/ears/jump/run/stop/sit 连发指令。' },
      { ...SEC.input, content: '不教新词，全部复习但换场景——爬行垫障碍赛道："Jump over the pillow. Stop at the chair. Sit down."' },
      { ...SEC.song, content: '本周三首歌串烧（Head Shoulders / Walking Walking / If You\'re Happy 各唱1遍）。' },
      { ...SEC.hands, content: '绘本 From Head to Toe（Eric Carle）：你学动物，她学你。' },
      { ...SEC.wrap, content: '给她一个"本周小冠军"手环（彩纸做），用英文夸3句。' },
    ],
  },
  /* ── 第2周 Colorful Zoo ── */
  {
    id: 'l1-sc-d6', lessonId: 'l1-u2-d6', day: 6, titleZh: '红 黄 蓝',
    materialsZh: ['红/黄/蓝三个彩球', '白纸', '蜡笔'],
    sections: [
      { ...SEC.warm, content: '拿出红/黄/蓝三个彩球，滚一个给她说 "Red ball for you!"' },
      { ...SEC.input, content: '3色：red, yellow, blue。I Spy——"I spy something red." 指你的衣服，再让她找。' },
      { ...SEC.song, content: 'I See Something Blue。' },
      { ...SEC.hands, content: '给一张白纸，你说 "Draw a red circle"（你手把手起笔）。' },
      { ...SEC.wrap, content: '把三个球收回来，说 "Give me red."' },
    ],
  },
  {
    id: 'l1-sc-d7', lessonId: 'l1-u2-d7', day: 7, titleZh: '猫 狗 鸭',
    materialsZh: ['彩色袜子', '动物玩偶', '海绵+颜料+纸'],
    sections: [
      { ...SEC.warm, content: '穿彩色袜子，露出脚趾问 "What color?"（你自问自答）。' },
      { ...SEC.input, content: '加动物：cat, dog, duck（配叫声）。你学猫叫 "Meow"，她猜 "Cat!"' },
      { ...SEC.song, content: 'BINGO（农场版，拍手打字母节奏）。' },
      { ...SEC.hands, content: '动物脚印画：用海绵蘸颜料印在纸上，你念 "Dog\'s foot."' },
      { ...SEC.wrap, content: '学狗喘气说 "I\'m a dog. Bye!"' },
    ],
  },
  {
    id: 'l1-sc-d8', lessonId: 'l1-u2-d8', day: 8, titleZh: '颜色+动物组合',
    materialsZh: ['动物玩偶排排坐', '颜色卡3张+动物卡3张'],
    sections: [
      { ...SEC.warm, content: '拿动物玩偶排排坐，你一个个打招呼 "Hello, yellow duck!"' },
      { ...SEC.input, content: '颜色＋动物组合：a red dog, a blue cat（只说两个组合）。你说 "Find a yellow duck"，她从一堆里挑。' },
      { ...SEC.song, content: 'Old MacDonald Had a Farm（只唱 cow/duck/dog）。' },
      { ...SEC.hands, content: '配对卡：颜色卡配动物卡，摆对夸张鼓掌。' },
      { ...SEC.wrap, content: '选她最喜欢的小动物抱着说 "See you!"' },
    ],
  },
  {
    id: 'l1-sc-d9', lessonId: 'l1-u2-d9', day: 9, titleZh: '绿 橙 + 大象涂色',
    materialsZh: ['苹果/香蕉', '大象涂色页', '绿色摇铃', '绿色垫子或绿纸'],
    sections: [
      { ...SEC.warm, content: '拿出水果（苹果/香蕉）混入动物玩偶中，问 "Is this a cat?"（摇头配合）。' },
      { ...SEC.input, content: '新颜色：green, orange。颜色跑步——你说 "Run to green!" 她跑到绿色垫子上。' },
      { ...SEC.song, content: 'The Color Song。' },
      { ...SEC.hands, content: '涂色：印一只大象，你说 "Color it gray"（她随便涂，不纠正）。' },
      { ...SEC.wrap, content: '拿出绿色摇铃摇一摇说 "Green, bye!"' },
    ],
  },
  {
    id: 'l1-sc-d10', lessonId: 'l1-u2-d10', day: 10, titleZh: '复习日：Brown Bear 精读',
    materialsZh: ['绘本 Brown Bear, Brown Bear, What Do You See?', '红笔', '狗卡片'],
    sections: [
      { ...SEC.warm, content: 'Brown Bear 预告：只翻书第一页，指熊说 "Brown bear."（制造期待后收起）。' },
      { ...SEC.input, content: '复习 red/blue/yellow/green + cat/dog/duck。游戏：你喊 "Red dog!" 她拿红色笔涂狗卡片。' },
      { ...SEC.song, content: 'Brown Bear 节奏念谣（你念，她拍手）。' },
      { ...SEC.hands, content: '绘本精读：你读每一页，停顿在颜色/动物处让她接（哪怕只接一个音节都大声夸）。' },
      { ...SEC.wrap, content: '说 "You saw brown bear today! High five!"' },
    ],
  },
  /* ── 第3周 Yummy Food ── */
  {
    id: 'l1-sc-d11', lessonId: 'l1-u3-d11', day: 11, titleZh: '苹果 香蕉 水',
    materialsZh: ['围兜', '空碗和勺子', '水果切切乐玩具'],
    sections: [
      { ...SEC.warm, content: '围兜戴上，拿一个空碗和勺子敲一敲说 "Time to eat!"' },
      { ...SEC.input, content: '3食物：apple, banana, water。你假装吃一口苹果说 "Yummy apple!" 她学。' },
      { ...SEC.song, content: 'Are You Hungry?' },
      { ...SEC.hands, content: '切水果玩具：你切时说 "Cut the apple." 然后换她切。' },
      { ...SEC.wrap, content: '把苹果玩具放她手心说 "Apple for you."' },
    ],
  },
  {
    id: 'l1-sc-d12', lessonId: 'l1-u3-d12', day: 12, titleZh: '句型 I want...',
    materialsZh: ['杯子', '食物玩具', '娃娃'],
    sections: [
      { ...SEC.warm, content: '拿出杯子，做喝水动作说 "Water, please."' },
      { ...SEC.input, content: '加句型 "I want…" + apple/banana/water。把食物放高处，她想吃必须说 "I want apple"（一开始你说前半句，她只接 apple）。' },
      { ...SEC.song, content: 'Peekaboo（换成食物版：藏起苹果再出现）。' },
      { ...SEC.hands, content: '过家家：你当妈妈她当宝宝，你问 "Apple?" 她点头，你说 "OK!"' },
      { ...SEC.wrap, content: '把香蕉玩具放在她头顶说 "Banana hat!"' },
    ],
  },
  {
    id: 'l1-sc-d13', lessonId: 'l1-u3-d13', day: 13, titleZh: '盘子 杯子 勺子',
    materialsZh: ['餐巾纸', '真实不易碎餐具（盘/杯/勺）'],
    sections: [
      { ...SEC.warm, content: '拿餐巾纸铺桌上说 "Let\'s set the table."' },
      { ...SEC.input, content: '餐具：plate, cup, spoon。你说 "Put the cup on the plate." 她执行。' },
      { ...SEC.song, content: 'Clean Up Song（收拾玩具的节奏，边唱边收）。' },
      { ...SEC.hands, content: '真实餐具摆放：你发指令 "Spoon on the plate." 晚饭时宣布这是宝宝摆的桌子。' },
      { ...SEC.wrap, content: '把餐具收进抽屉说 "Bye-bye, plate."' },
    ],
  },
  {
    id: 'l1-sc-d14', lessonId: 'l1-u3-d14', day: 14, titleZh: '饼干 面条 + 整合句',
    materialsZh: ['真饼干', '橡皮泥'],
    sections: [
      { ...SEC.warm, content: '拿出饼干（真的），咬一口说 "Mmm, cookie!"（即使不是本周词也可以引入）。' },
      { ...SEC.input, content: '整合句 "I want water, please."（完整句，但不要求她说全）。渴了饿了表演：你捂肚子说 "I\'m hungry!" 她递食物给你。' },
      { ...SEC.song, content: 'Apples & Bananas（元音歌，图个乐，越变调越好笑）。' },
      { ...SEC.hands, content: '橡皮泥做面条：你搓长条说 "Noodles!" 她也搓。' },
      { ...SEC.wrap, content: '抱抱说 "You are a good helper!"' },
    ],
  },
  {
    id: 'l1-sc-d15', lessonId: 'l1-u3-d15', day: 15, titleZh: '复习日：点餐游戏',
    materialsZh: ['全部食物餐具玩具', '玩偶熊', '真葡萄干'],
    sections: [
      { ...SEC.warm, content: '摆一个"小餐桌"场景，所有食物和餐具放桌上。' },
      { ...SEC.input, content: '复习 apple/banana/water/plate/cup/spoon + I want。点餐游戏：你点 "I want banana." 她拿给你，然后互换角色她点单。' },
      { ...SEC.song, content: '本周歌串烧（Are You Hungry / Apples & Bananas / Clean Up）。' },
      { ...SEC.hands, content: '喂玩偶：你说 "Feed the bear. Give bear apple." 她执行。' },
      { ...SEC.wrap, content: '给她一颗真的葡萄干说 "A treat for you!"' },
    ],
  },
  /* ── 第4周 Clothes & Weather ── */
  {
    id: 'l1-sc-d16', lessonId: 'l1-u4-d16', day: 16, titleZh: '帽子 鞋子 外套',
    materialsZh: ['她的帽子/鞋子/外套', '娃娃和小衣服'],
    sections: [
      { ...SEC.warm, content: '拿一顶帽子戴她头上说 "Hat!" 一起照镜子。' },
      { ...SEC.input, content: '3衣物：hat, shoes, coat。穿脱比赛：你说 "Put on your hat." 她戴，"Take off." 她脱。' },
      { ...SEC.song, content: 'Put On Your Shoes。' },
      { ...SEC.hands, content: '给娃娃穿衣服：你说 "Shoes for doll." 她执行。' },
      { ...SEC.wrap, content: '指她的鞋说 "Nice shoes!"' },
    ],
  },
  {
    id: 'l1-sc-d17', lessonId: 'l1-u4-d17', day: 17, titleZh: '晴天 雨天',
    materialsZh: ['喷壶', '手电筒', '太阳涂色页', '黄蜡笔'],
    sections: [
      { ...SEC.warm, content: '走到窗边看外面说 "Is it sunny?"（用手遮眼睛）。' },
      { ...SEC.input, content: '天气：sunny, rainy。你拿喷壶喷一点水说 "Rainy!"，打开手电筒说 "Sunny!"' },
      { ...SEC.song, content: "How's the Weather?" },
      { ...SEC.hands, content: '画一个太阳，涂黄色，说 "Sunny is yellow."' },
      { ...SEC.wrap, content: '说 "Tomorrow we play rainy!"' },
    ],
  },
  {
    id: 'l1-sc-d18', lessonId: 'l1-u4-d18', day: 18, titleZh: '天气配衣物',
    materialsZh: ['衣物卡+天气卡', '蓝色雨滴贴纸'],
    sections: [
      { ...SEC.warm, content: '把衣服和天气配对：帽子配 sunny，雨鞋配 rainy（先示范一次）。' },
      { ...SEC.input, content: '结合句 "It\'s sunny. Put on your hat." 你喊天气，她选对应衣物穿上（戴帽子/穿外套）。' },
      { ...SEC.song, content: 'Rain Rain Go Away。' },
      { ...SEC.hands, content: '贴纸书：把雨滴贴纸贴在窗户上（或纸上画的窗户）。' },
      { ...SEC.wrap, content: '摇手说 "Rainy, bye!"' },
    ],
  },
  {
    id: 'l1-sc-d19', lessonId: 'l1-u4-d19', day: 19, titleZh: '热 和 冷',
    materialsZh: ['本周所有衣物', '温热水袋/冰凉杯子', '毯子'],
    sections: [
      { ...SEC.warm, content: '把本周所有衣物摊在床上，让她挑一件穿（挑哪件都夸）。' },
      { ...SEC.input, content: '加温度词：hot, cold。你摸热水袋喊 "Hot!"，摸冰块（或冰凉杯子）喊 "Cold!" 她也摸。' },
      { ...SEC.song, content: 'Hot & Cold（自编调子，反复唱 hot/cold）。' },
      { ...SEC.hands, content: '分类游戏：把红色衣物放一堆（hot），蓝色放另一堆（cold）。' },
      { ...SEC.wrap, content: '裹她在毯子里说 "So warm! Good night!"' },
    ],
  },
  {
    id: 'l1-sc-d20', lessonId: 'l1-u4-d20', day: 20, titleZh: '月度展示日 🎉',
    materialsZh: ['观众（玩偶/家人）', '手机录影', '打印好的纪念卡', '星星贴纸'],
    sections: [
      { ...SEC.warm, content: '郑重宣布 "Today is Show Time!" 把玩偶/爸妈（或手机录影）叫来当观众。' },
      { ...SEC.input, content: 'Showcase 5分钟小表演：①指头问 "What is this?" →她说 head（不会你帮）②指红球 "What color?" →red ③"What do you want?" →apple（哪怕只说 ap）④"Is it sunny?" →点头或摇头。网站版在「展示课」页面进行。' },
      { ...SEC.song, content: '选她这月最爱的一首唱跳（大概率是 Head Shoulders）。' },
      { ...SEC.hands, content: '做一张 "My First English Month" 贴纸纪念卡（提前打印好日期），让她贴满星星。' },
      { ...SEC.wrap, content: '最长的一次（10分钟）：用中文＋英文认真总结"你这一个月学会了 head, eyes, red, apple, hat…"（数给她听）。"You are a super star! 下个月我们要学更多好玩的东西！"大大的拥抱、击掌、亲额头，说 I love you, see you tomorrow!（哪怕明天是周末，也保留仪式感）' },
    ],
  },
]
