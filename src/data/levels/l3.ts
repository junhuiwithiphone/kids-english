import type { Level } from '../schema'
import { l3Wordbank } from '../wordbank/l3'
import { l3Songs } from '../songs/l3'
import { game, handsOn, song, warmup, words, wrapup } from './factories'

/* ═══════════════════════════════════════════════════════════
   L3 ☀️ Sun 进阶级 — 4 单元 × 4 课 = 16 课
   U1 My Day 我的一天 / U2 Feelings 情绪小主人
   U3 Animal Homes 动物家园 / U4 Little Explorer 小探险家
   （U4 简化地理大词 earth/ocean/mountain/river/desert，
     衔接 Core Knowledge History & Geography 教材远期路线）
   穿插 sh/ch/th 双字母音；每单元第 4 课为复习课（不教新词）
   L3 是进阶级：readAloud 目标多用完整短句，句型输出比 L1/L2 多
   ═══════════════════════════════════════════════════════════ */

const w = (name: string) => `l3-w-${name}`
const st = (n: number) => `l3-st-${String(n).padStart(2, '0')}`
const sc = (n: number) => `l3-sc-d${n}`

export const levelL3: Level = {
  id: 'L3',
  name: { en: 'Sun Shine', zh: '进阶级' },
  subtitle: { en: 'Sun Class · Age 5-7', zh: '太阳班 · 5-7岁能输出简单句' },
  emoji: '☀️',
  themeColor: 'L3',
  wordbank: l3Wordbank,
  songs: l3Songs,
  units: [
    /* ═══════ U1 My Day 我的一天 ═══════ */
    {
      id: 'l3-u1',
      levelId: 'L3',
      order: 1,
      title: { en: 'My Day', zh: '我的一天' },
      emoji: '⏰',
      weekTheme: 'daily',
      lessons: [
        {
          id: 'l3-u1-d1',
          unitId: 'l3-u1',
          day: 1,
          title: { en: 'Wake Up, Eat, Sleep', zh: '起床 吃饭 睡觉' },
          estimatedMinutes: 15,
          mustWinWords: [w('wake-up'), w('eat'), w('sleep')],
          newWordIds: [w('wake-up'), w('eat'), w('drink'), w('play'), w('sleep')],
          reviewWordIds: [],
          scriptId: sc(1),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              greetingLines: [
                { text: 'Good morning, my big kid!', zh: '太阳班开课啦！她已经是大孩子了，摸摸头郑重地说：Good morning!' },
                { text: 'Today we learn about MY DAY!', zh: '指指窗外太阳再指指她：今天我们学"我的一天"！' },
              ],
            }),
            words(
              [w('wake-up'), w('eat'), w('drink'), w('play'), w('sleep')],
              [
                game('listen-pick', [w('wake-up'), w('eat'), w('drink'), w('play'), w('sleep')], 3),
                game('tpr-command', [w('wake-up'), w('eat'), w('sleep'), w('play')], 1, {
                  title: { en: 'Do It!', zh: '听到就做：Wake up! Eat! Sleep!' },
                }),
              ],
              [w('wake-up'), w('eat'), w('sleep')],
            ),
            song('l3-s-good-morning', '边唱边演一天：伸懒腰起床→吃饭→玩耍，全身动起来'),
            handsOn({
              kind: 'pretend-play',
              title: { en: "Teddy's Day", zh: '玩偶的一天' },
              steps: [
                { text: 'Teddy, wake up!', zh: '让玩偶"起床"：她说 Wake up! 你就把玩偶扶坐起来' },
                { text: 'Teddy, eat! Yummy!', zh: '喂玩偶吃饭，引导她说 Eat! 玩偶吃完说 Thank you!' },
                { text: 'Teddy, sleep. Shhh...', zh: '把玩偶放"床上"盖小被子，嘘——Sleep!' },
              ],
              parentGuideZh: '用她最爱的玩偶演"一天流程"：起床→吃饭→玩耍→睡觉。每做一步等她说出英文词（说不全你说前半句她接后半句），玩偶夸张地"回应"她，全程无挫败。',
            }),
            wrapup([w('wake-up'), w('eat'), w('sleep'), w('play')], st(1), {
              goodbyeLines: [
                { text: 'Good night, sleep tight!', zh: '抱抱说晚安。预告：明天我们给娃娃洗香香、刷牙牙！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u1-d2',
          unitId: 'l3-u1',
          day: 2,
          title: { en: 'Bath and Brush Teeth', zh: '洗澡和刷牙' },
          estimatedMinutes: 15,
          mustWinWords: [w('brush-teeth'), w('get-dressed'), w('bath')],
          newWordIds: [w('bath'), w('brush-teeth'), w('get-dressed'), w('mouth')],
          reviewWordIds: [w('wake-up'), w('eat'), w('sleep')],
          scriptId: sc(2),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('sleep')],
              greetingLines: [
                { text: 'Look! Teddy is sleeping. Wake him up!', zh: '衔接锚点：拿出昨天睡着的玩偶，让她喊 Wake up!' },
                { text: 'Good morning, Teddy!', zh: '玩偶"醒"来跟她打招呼，她也说 Good morning!' },
              ],
            }),
            words(
              [w('bath'), w('brush-teeth'), w('get-dressed'), w('mouth')],
              [
                game('tpr-command', [w('bath'), w('brush-teeth'), w('get-dressed'), w('mouth')], 1, {
                  title: { en: 'Morning Race', zh: '早晨比赛：听到就做对应动作' },
                }),
                game('listen-pick', [w('bath'), w('brush-teeth'), w('mouth'), w('eat')], 3),
              ],
              [w('brush-teeth'), w('get-dressed'), w('mouth')],
              { reviewWordIds: [w('wake-up'), w('eat')] },
            ),
            song('l3-s-this-is-the-way', '唱到哪步就做哪步：刷牙→穿衣→洗澡，可以越唱越快'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Doll Bath Time', zh: '给娃娃洗澡穿衣' },
              steps: [
                { text: 'Bath for Teddy! Scrub scrub!', zh: '假装给玩偶洗澡，搓搓搓说 Bath!' },
                { text: 'Brush teeth! Open your mouth!', zh: '用干净牙刷（或手指）给玩偶刷牙，指指 mouth' },
                { text: 'Get dressed! Nice clothes!', zh: '给玩偶穿小衣服（或手帕），穿好夸 Nice!' },
              ],
              parentGuideZh: '给玩偶演"洗澡→刷牙→穿衣"全流程，你说英文她做动作，或她指挥你故意做错（把牙刷放耳朵上）让她笑着纠正说 mouth!。今晚真洗澡时把这套英文再说一遍，生活即课堂。',
            }),
            wrapup([w('bath'), w('brush-teeth'), w('get-dressed'), w('mouth')], st(2), {
              goodbyeLines: [
                { text: 'You are clean and sweet! Bye!', zh: '闻一闻她说香喷喷！预告：明天学两句最有礼貌的魔法话！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u1-d3',
          unitId: 'l3-u1',
          day: 3,
          title: { en: 'Good Morning, Good Night', zh: '早安和晚安（句型日）' },
          estimatedMinutes: 15,
          mustWinWords: [w('good-morning'), w('good-night'), w('i-can')],
          newWordIds: [w('good-morning'), w('good-night'), w('i-can')],
          reviewWordIds: [w('wake-up'), w('eat'), w('brush-teeth'), w('get-dressed'), w('sleep')],
          scriptId: sc(3),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('bath')],
              greetingLines: [
                { text: 'Teddy is clean! Say Good morning, Teddy!', zh: '衔接锚点：拿出昨天洗香香的玩偶，示范说 Good morning!' },
                { text: 'Good morning! What a polite big kid!', zh: '她跟着说（哪怕只说 morning）就大大地夸：真有礼貌！' },
              ],
            }),
            words(
              [w('good-morning'), w('good-night'), w('i-can')],
              [
                game('tpr-command', [w('good-morning'), w('good-night'), w('i-can'), w('sleep')], 1, {
                  title: { en: 'Sun and Moon', zh: '太阳卡说 Good morning，月亮卡说 Good night' },
                }),
                game('listen-pick', [w('good-morning'), w('good-night'), w('i-can')], 3),
              ],
              [w('good-morning'), w('good-night'), w('i-can')],
              { reviewWordIds: [w('wake-up'), w('sleep')] },
            ),
            song('l3-s-good-night', '慢速轻轻唱：今天先在白天"假装睡前"，晚上真睡前再唱一遍'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'My Day in Order', zh: '一日流程排序卡' },
              steps: [
                { text: 'First: wake up! Then: eat!', zh: '把流程卡打乱，你说英文她按顺序摆：起床→吃饭→玩耍→洗澡→睡觉' },
                { text: 'I can do it!', zh: '摆完让她指着自己的排序卡说 I can ...（接一个词就算成功）' },
              ],
              parentGuideZh: '自制 5 张流程卡（画简笔画即可：起床/吃饭/玩/洗澡/睡觉）。打乱让她排序，你只说英文不翻译；排错了笑着问 Really? 让她自己发现。排完拍张照贴在墙上，这就是她的"My Day"海报。',
            }),
            wrapup([w('good-morning'), w('good-night'), w('i-can')], st(3), {
              goodbyeLines: [
                { text: 'Good night! Sweet dreams!', zh: '今晚睡前用英文道晚安，让 Good night 变成家里的固定仪式' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u1-d4',
          unitId: 'l3-u1',
          day: 4,
          title: { en: 'My Day Review', zh: '我的一天·复习日（不教新词）' },
          estimatedMinutes: 15,
          mustWinWords: [w('wake-up'), w('brush-teeth'), w('good-morning')],
          newWordIds: [],
          reviewWordIds: [
            w('wake-up'), w('eat'), w('drink'), w('play'), w('sleep'), w('bath'),
            w('brush-teeth'), w('get-dressed'), w('mouth'), w('good-morning'), w('good-night'), w('i-can'),
          ],
          scriptId: sc(4),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('i-can')],
              greetingLines: [
                { text: 'Look at your My Day poster!', zh: '衔接锚点：指她昨天排好的流程卡海报' },
                { text: 'You can say it all! I can, I can!', zh: '拍手念 I can! 今天不学新词，全是她会的——必胜日！' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('wake-up'), w('eat'), w('drink'), w('play'), w('sleep'),
                  w('bath'), w('brush-teeth'), w('get-dressed'),
                ], 8),
                game('match-pairs', [w('wake-up'), w('eat'), w('sleep'), w('bath'), w('brush-teeth'), w('play')], 1),
                game('read-aloud-gate', [w('good-morning'), w('good-night'), w('i-can')], 3),
              ],
              [w('good-morning'), w('good-night'), w('i-can')],
              { reviewWordIds: [w('wake-up'), w('eat'), w('drink'), w('play'), w('sleep'), w('bath')] },
            ),
            song('l3-s-good-morning', '本周歌串烧：Good Morning + This Is the Way 各唱一遍，越唱越快'),
            handsOn({
              kind: 'coloring',
              title: { en: 'Color My Day', zh: '涂出我的一天' },
              steps: [
                { text: 'Color the sun! Good morning!', zh: '打印小人图纸，让她在旁邊画太阳说 Good morning!' },
                { text: 'Color the moon! Good night!', zh: '再画月亮说 Good night! 白天黑夜都有了' },
              ],
              printableSvgKey: 'coloring-kid',
              parentGuideZh: '打印小人图纸，让她给"小人的一天"涂色：涂到哪步说哪步英文（wake up / eat / bath / sleep）。不纠正涂色出界，涂完贴到流程海报旁边。',
            }),
            wrapup([w('wake-up'), w('eat'), w('sleep'), w('good-morning')], st(4), {
              goodbyeLines: [
                { text: 'My Day champion! See you!', zh: '授予"一天小主人"称号！预告：明天认识 6 个表情朋友！' },
              ],
            }),
          ],
        },
      ],
    },

    /* ═══════ U2 Feelings 情绪小主人 ═══════ */
    {
      id: 'l3-u2',
      levelId: 'L3',
      order: 2,
      title: { en: 'Feelings', zh: '情绪小主人' },
      emoji: '😊',
      weekTheme: 'feelings',
      lessons: [
        {
          id: 'l3-u2-d5',
          unitId: 'l3-u2',
          day: 5,
          title: { en: 'Happy Sad Angry', zh: '开心 难过 生气' },
          estimatedMinutes: 15,
          mustWinWords: [w('happy'), w('sad'), w('angry')],
          newWordIds: [w('happy'), w('sad'), w('angry'), w('tired')],
          reviewWordIds: [w('good-morning')],
          scriptId: sc(5),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              greetingLines: [
                { text: 'Good morning! Look at my face!', zh: '新单元开场：夸张做笑脸说 Happy! 再做哭脸 Sad!' },
                { text: 'Today we play the feelings game!', zh: '告诉她：今天认识 4 个表情朋友，先做个鬼脸逗她笑' },
              ],
            }),
            words(
              [w('happy'), w('sad'), w('angry'), w('tired')],
              [
                game('listen-pick', [w('happy'), w('sad'), w('angry'), w('tired')], 3),
                game('tpr-command', [w('happy'), w('sad'), w('angry'), w('tired')], 1, {
                  title: { en: 'Face Maker', zh: '表情制造机：听到就做对应的脸' },
                }),
              ],
              [w('happy'), w('sad'), w('angry')],
            ),
            song('l3-s-feelings', '唱到哪句做哪个表情：笑→抱自己→跺脚→捂眼，表情越夸张越好笑'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'Paper Plate Faces', zh: '纸盘表情卡' },
              steps: [
                { text: 'Draw a happy face! 😄', zh: '纸盘（或圆纸片）上画笑脸，边画边说 Happy!' },
                { text: 'Draw a sad face. Draw an angry face!', zh: '再画哭脸和生气脸，画完举起来给她"变脸"看' },
              ],
              parentGuideZh: '用一次性纸盘画 4 张表情卡（happy/sad/angry/tired），她画你涂色分工合作。画完玩"转盘变脸"：转到哪张就做哪个表情说英文。卡片收好，明天做面具还要用。',
            }),
            wrapup([w('happy'), w('sad'), w('angry'), w('tired')], st(5), {
              goodbyeLines: [
                { text: 'You are happy today! Bye!', zh: '指她的笑脸说 You are happy! 预告：明天认识"害怕"和"惊讶"！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u2-d6',
          unitId: 'l3-u2',
          day: 6,
          title: { en: 'Scared and Surprised', zh: '害怕和惊讶' },
          estimatedMinutes: 15,
          mustWinWords: [w('scared'), w('surprised'), w('how-are-you')],
          newWordIds: [w('scared'), w('surprised'), w('how-are-you')],
          reviewWordIds: [w('happy'), w('sad'), w('angry'), w('tired')],
          scriptId: sc(6),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('happy')],
              greetingLines: [
                { text: 'Show me your happy face!', zh: '衔接锚点：拿出昨天的纸盘表情卡，先要一张 happy' },
                { text: 'How are you today?', zh: '教今天的魔法问句：How are you?（她可以用表情卡回答）' },
              ],
            }),
            words(
              [w('scared'), w('surprised'), w('how-are-you')],
              [
                game('tpr-command', [w('scared'), w('surprised'), w('happy'), w('sad')], 1, {
                  title: { en: 'Boo! Surprise!', zh: '你轻轻 Boo! 她做 scared；拍手她做 surprised' },
                }),
                game('listen-pick', [w('scared'), w('surprised'), w('how-are-you'), w('angry')], 3),
              ],
              [w('how-are-you'), w('scared'), w('surprised')],
              { reviewWordIds: [w('happy'), w('sad')] },
            ),
            song('l3-s-feelings', '这次重点唱 scared 一句：捂住眼睛偷偷看，她会咯咯笑'),
            handsOn({
              kind: 'craft',
              title: { en: 'Feelings Mask', zh: '表情面具手工' },
              steps: [
                { text: 'Make a happy mask!', zh: '纸盘挖两个眼洞，贴上表情，冰棒棍当手柄' },
                { text: 'Put on the mask: I am scared!', zh: '戴上面具就用面具的情绪说话，一人一个轮流演' },
              ],
              parentGuideZh: '纸盘+冰棒棍做 2 个表情面具（一面 happy 一面 scared 最好）。规则：戴上哪个面具就说哪句 "I am ..."（说不全就只说情绪词）。家长也要戴！你演得越夸张她越想说。',
            }),
            wrapup([w('scared'), w('surprised'), w('how-are-you')], st(6), {
              goodbyeLines: [
                { text: 'How are you? I am happy! Bye!', zh: '用今天的问句告别。预告：明天学一句超棒的话——I\'m happy!' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u2-d7',
          unitId: 'l3-u2',
          day: 7,
          title: { en: "I'm Happy", zh: '句型：我很开心' },
          estimatedMinutes: 15,
          mustWinWords: [w('im-happy'), w('how-are-you'), w('happy')],
          newWordIds: [w('im-happy')],
          reviewWordIds: [w('happy'), w('sad'), w('angry'), w('tired'), w('scared'), w('surprised'), w('how-are-you')],
          scriptId: sc(7),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('how-are-you')],
              greetingLines: [
                { text: 'How are you? How are you?', zh: '衔接锚点：拿面具问她（她举面具或说词都算回答）' },
                { text: "I'm happy! I'm happy!", zh: '你拍着胸口示范今天的目标句，让她摸摸自己的笑脸学' },
              ],
            }),
            words(
              [w('im-happy')],
              [
                game('tpr-command', [w('im-happy'), w('how-are-you'), w('sad'), w('scared')], 1, {
                  title: { en: 'Feelings Doctor', zh: '情绪小医生：玩偶 sad 就抱抱它并说 I\'m happy 传染开心' },
                }),
                game('listen-pick', [w('im-happy'), w('happy'), w('how-are-you'), w('tired')], 3),
              ],
              [w('im-happy'), w('how-are-you')],
              { reviewWordIds: [w('happy'), w('sad'), w('angry')] },
            ),
            song('l3-s-feelings', '全家合唱：最后 How are you? 一句轮流问答，每人答 I\'m happy!'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Feelings Charades', zh: '表情猜猜乐' },
              steps: [
                { text: 'Look at me! How are you?', zh: '你抽表情卡做默剧表情，她猜英文词' },
                { text: 'Your turn! Show me angry!', zh: '换她抽卡表演你来猜，猜完一起说 I\'m happy!' },
              ],
              parentGuideZh: '表情猜猜乐：一人抽卡做表情（不出声），另一人猜英文。她猜对就击掌；轮到她表演时全家认真猜，猜错也没关系——重点是她说出 "I\'m ..." 的机会。今天只加 1 个新词，轻松日。',
            }),
            wrapup([w('im-happy'), w('happy'), w('how-are-you')], st(7), {
              goodbyeLines: [
                { text: "I'm happy with you! Bye!", zh: '抱着她说：和你在一起我很开心！预告：明天是情绪派对复习日！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u2-d8',
          unitId: 'l3-u2',
          day: 8,
          title: { en: 'Feelings Review', zh: '情绪复习日（不教新词）' },
          estimatedMinutes: 15,
          mustWinWords: [w('im-happy'), w('how-are-you'), w('happy')],
          newWordIds: [],
          reviewWordIds: [
            w('happy'), w('sad'), w('angry'), w('tired'), w('scared'), w('surprised'),
            w('how-are-you'), w('im-happy'),
          ],
          scriptId: sc(8),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('im-happy')],
              greetingLines: [
                { text: 'Feelings party! Show me your mask!', zh: '衔接锚点：拿出她的表情面具和纸盘卡，派对开始！' },
                { text: 'How are you? — I\'m happy!', zh: '面具问答热身一轮，答不出用面具举给大家看' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('happy'), w('sad'), w('angry'), w('tired'),
                  w('scared'), w('surprised'), w('im-happy'), w('how-are-you'),
                ], 8),
                game('match-pairs', [w('happy'), w('sad'), w('angry'), w('scared'), w('tired'), w('surprised')], 1),
                game('read-aloud-gate', [w('im-happy'), w('how-are-you'), w('happy')], 3),
              ],
              [w('im-happy'), w('how-are-you'), w('happy')],
              { reviewWordIds: [w('happy'), w('sad'), w('angry'), w('tired'), w('scared'), w('surprised')] },
            ),
            song('l3-s-feelings', '本周歌大串烧：边唱边做全部 4 个表情，最后一句一起喊 I\'m happy!'),
            handsOn({
              kind: 'craft',
              title: { en: 'My Feelings Book', zh: '我的情绪小书' },
              steps: [
                { text: 'Page one: I\'m happy!', zh: '3 张纸订成小书，每页画一个表情配一句 I\'m ...' },
                { text: 'Read your book to Teddy!', zh: '做完让她"读"给玩偶听（读一页夸一页）' },
              ],
              parentGuideZh: '用 3 张 A5 纸订一本"情绪小书"：每页画一种表情，你在角上写 I\'m happy / I\'m sad / I\'m scared。让她当小老师读给玩偶或爸爸听，读不出整句就只读情绪词——这是她的"第一本英文书"。',
            }),
            wrapup([w('im-happy'), w('happy'), w('how-are-you'), w('surprised')], st(8), {
              goodbyeLines: [
                { text: 'You are a feelings master! Bye!', zh: '授予"情绪小主人"称号！预告：明天去农场、丛林和海洋看动物！' },
              ],
            }),
          ],
        },
      ],
    },

    /* ═══════ U3 Animal Homes 动物家园 ═══════ */
    {
      id: 'l3-u3',
      levelId: 'L3',
      order: 3,
      title: { en: 'Animal Homes', zh: '动物家园' },
      emoji: '🏡',
      weekTheme: 'animal-homes',
      lessons: [
        {
          id: 'l3-u3-d9',
          unitId: 'l3-u3',
          day: 9,
          title: { en: 'Farm Jungle Ocean', zh: '农场 丛林 海洋' },
          estimatedMinutes: 15,
          mustWinWords: [w('farm'), w('ocean'), w('cow')],
          newWordIds: [w('farm'), w('jungle'), w('ocean'), w('cow'), w('horse')],
          reviewWordIds: [w('happy')],
          scriptId: sc(9),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              greetingLines: [
                { text: 'Are you happy today? I\'m happy!', zh: '用 U2 的问句衔接：How are you? → I\'m happy!' },
                { text: 'Moo~ Who lives on the farm?', zh: '学牛叫开场：今天动物们要搬进自己的家！' },
              ],
            }),
            words(
              [w('farm'), w('jungle'), w('ocean'), w('cow'), w('horse')],
              [
                game('listen-pick', [w('farm'), w('jungle'), w('ocean'), w('cow'), w('horse')], 3),
                game('tpr-command', [w('cow'), w('horse'), w('farm'), w('ocean')], 1, {
                  title: { en: 'Animal Sounds', zh: '学叫声：Moo~ / 马儿颠颠 / 波浪手' },
                }),
              ],
              [w('farm'), w('ocean'), w('cow')],
            ),
            song('l1-s-old-macdonald', '农场经典歌：唱到 cow 就 Moo~，可以现场加 horse 一段'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'Animal Home Sort', zh: '动物家园分类游戏' },
              steps: [
                { text: 'Cow lives on the farm!', zh: '3 个盒子/纸圈贴上 farm🚜 jungle🌴 ocean🌊，把动物玩偶或卡片送回正确的家' },
                { text: 'Where does the horse live?', zh: '你问 Where does ... live? 她"送动物回家"，送到就欢呼' },
              ],
              parentGuideZh: '准备 3 个盒子（或地上 3 个纸圈）分别贴农场/丛林/海洋图，把家里的动物玩偶全倒出来"送回家"。送对夸张欢呼，送错就说 Hmm, really? 让她自己改——分类游戏玩 3 轮都不会腻，盒子留着后面几天继续用。',
            }),
            wrapup([w('farm'), w('jungle'), w('ocean'), w('cow')], st(9), {
              goodbyeLines: [
                { text: 'The cow says bye! Moo~', zh: '让奶牛玩偶跟她道别。预告：明天丛林里的狮子猴子要来！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u3-d10',
          unitId: 'l3-u3',
          day: 10,
          title: { en: 'Where Does the Lion Live?', zh: '狮子住哪里（句型日）' },
          estimatedMinutes: 15,
          mustWinWords: [w('lion'), w('monkey'), w('where-live')],
          newWordIds: [w('lion'), w('monkey'), w('bee'), w('where-live'), w('that')],
          reviewWordIds: [w('farm'), w('jungle'), w('ocean'), w('cow'), w('horse')],
          scriptId: sc(10),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('farm')],
              greetingLines: [
                { text: 'Look at the animal homes!', zh: '衔接锚点：指昨天分类好的 3 个盒子' },
                { text: 'That is the farm! Roar~ Who is this?', zh: '指远处盒子教 That!，再学狮子吼让她猜' },
              ],
            }),
            words(
              [w('lion'), w('monkey'), w('bee'), w('where-live'), w('that')],
              [
                game('tpr-command', [w('lion'), w('monkey'), w('bee'), w('that')], 1, {
                  title: { en: 'Jungle Walk', zh: '丛林漫步：学狮子踏步/猴子跳/蜜蜂飞' },
                }),
                game('listen-pick', [w('lion'), w('monkey'), w('bee'), w('where-live'), w('cow')], 3),
              ],
              [w('where-live'), w('lion'), w('monkey')],
              { reviewWordIds: [w('farm'), w('jungle')] },
            ),
            song('l3-s-animals-walk', '站起来大动作唱：狮子踏步→猴子跳→小马跑→蜜蜂飞'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Animal Home Delivery', zh: '动物回家快递站' },
              steps: [
                { text: 'Where does the lion live?', zh: '你当"快递站长"问，她抱着动物玩偶跑到对应盒子投递' },
                { text: 'Jungle! Yes! Ding dong!', zh: '投对就按"门铃"庆祝，投错盒子玩偶"哭"一下再来' },
              ],
              parentGuideZh: '把分类盒升级成"快递站"：她当快递员，每送一只动物你问一次 Where does the lion live?（她答 jungle 或只指盒子都算成功）。多跑几趟正好消耗体力，跑完让她当站长考你——你故意送错让她纠正。',
            }),
            wrapup([w('lion'), w('monkey'), w('where-live')], st(10), {
              goodbyeLines: [
                { text: 'The lion says good night! Roar~', zh: '狮子玩偶打哈欠道别。预告：明天潜入大海看鲸鱼和鲨鱼！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u3-d11',
          unitId: 'l3-u3',
          day: 11,
          title: { en: 'Whale Shark Fish', zh: '鲸鱼 鲨鱼 小鱼' },
          estimatedMinutes: 15,
          mustWinWords: [w('whale'), w('fish'), w('ocean')],
          newWordIds: [w('whale'), w('shark'), w('fish')],
          reviewWordIds: [w('ocean'), w('lion'), w('monkey'), w('where-live')],
          scriptId: sc(11),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('ocean')],
              greetingLines: [
                { text: 'Shhh... listen! The ocean!', zh: '衔接锚点：把耳朵贴到"海面"（蓝毛巾）上听——哗啦哗啦' },
                { text: 'Who lives in the ocean?', zh: '神秘地压低声音问，制造潜水期待感' },
              ],
            }),
            words(
              [w('whale'), w('shark'), w('fish')],
              [
                game('listen-pick', [w('whale'), w('shark'), w('fish'), w('ocean')], 3),
                game('tpr-command', [w('whale'), w('shark'), w('fish')], 1, {
                  title: { en: 'Ocean Swim', zh: '海洋游泳：大鲸慢游/鲨鱼鳍快游/小鱼双手游' },
                }),
              ],
              [w('whale'), w('fish'), w('ocean')],
              { reviewWordIds: [w('ocean'), w('where-live')] },
            ),
            song('l3-s-whale-song', '海洋韵律：swish~ chomp! blub blub~ 动作幅度越大越好玩'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Basin Ocean', zh: '脸盆小海洋' },
              steps: [
                { text: 'This is the ocean!', zh: '蓝脸盆装水放小鱼玩具（或纸片鱼），她说 ocean 就开玩' },
                { text: 'Where does the whale live? — Ocean!', zh: '捞起一条"鱼"问一句 Where does ... live?，捞对就放进海洋盒' },
              ],
              parentGuideZh: '脸盆装水当 ocean，放进鱼玩具/勺子当"捞鱼网"。每捞一条问 Where does the fish live? 她答 ocean（或拍水）都算赢。铺条毛巾防滑，玩水 10 分钟正好安静收尾，捞完的鱼排排站说 Good night。',
            }),
            wrapup([w('whale'), w('shark'), w('fish'), w('ocean')], st(11), {
              goodbyeLines: [
                { text: 'The whale waves bye-bye! Swish~', zh: '鲸鱼摆尾道别。预告：明天动物家园大复习+闯关！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u3-d12',
          unitId: 'l3-u3',
          day: 12,
          title: { en: 'Animal Homes Review', zh: '动物家园复习日（不教新词）' },
          estimatedMinutes: 15,
          mustWinWords: [w('where-live'), w('whale'), w('lion')],
          newWordIds: [],
          reviewWordIds: [
            w('farm'), w('jungle'), w('ocean'), w('cow'), w('horse'), w('lion'),
            w('monkey'), w('bee'), w('whale'), w('shark'), w('fish'), w('where-live'), w('that'),
          ],
          scriptId: sc(12),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('where-live')],
              greetingLines: [
                { text: 'All the animals are mixed up!', zh: '衔接锚点：故意把动物全放进错误的盒子，夸张地惊讶 Oh no!' },
                { text: 'Can you help them? Where does the cow live?', zh: '请她当"家园小卫士"把动物全部送回家' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('farm'), w('jungle'), w('ocean'), w('cow'), w('horse'),
                  w('lion'), w('monkey'), w('whale'),
                ], 8),
                game('match-pairs', [w('cow'), w('farm'), w('lion'), w('jungle'), w('fish'), w('ocean')], 1),
                game('read-aloud-gate', [w('where-live'), w('fish'), w('lion')], 3),
              ],
              [w('where-live'), w('fish'), w('lion')],
              { reviewWordIds: [w('farm'), w('jungle'), w('ocean'), w('whale'), w('shark'), w('bee')] },
            ),
            song('l3-s-animals-walk', '本周歌串烧：Animals Walk + Whale Song 连唱，全家一起动'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Home Guardian Game', zh: '家园小卫士闯关' },
              steps: [
                { text: 'Level one: send bee home!', zh: '闯关制：第一关送 bee，第二关送 shark，第三关送 monkey' },
                { text: 'You win! Animal Homes champion!', zh: '三关全过（送一关夸一关）授予"家园小卫士"称号' },
              ],
              parentGuideZh: '把分类盒摆成一排当"闯关赛道"，每关送一只动物并回答 Where does ... live?。答不出你先说前半句 Where does the...，她接动物名也算过关。通关后让她出题考你，你答错她纠正——教是最好的学。',
            }),
            wrapup([w('where-live'), w('lion'), w('whale'), w('farm')], st(12), {
              goodbyeLines: [
                { text: 'Animal Homes champion! Bye!', zh: '授予称号击掌！预告：明天坐上探险船，去看大大的地球！' },
              ],
            }),
          ],
        },
      ],
    },

    /* ═══════ U4 Little Explorer 小探险家 ═══════ */
    {
      id: 'l3-u4',
      levelId: 'L3',
      order: 4,
      title: { en: 'Little Explorer', zh: '小探险家' },
      emoji: '🌍',
      weekTheme: 'explorer',
      lessons: [
        {
          id: 'l3-u4-d13',
          unitId: 'l3-u4',
          day: 13,
          title: { en: 'The Big Blue Earth', zh: '大大的蓝色地球' },
          estimatedMinutes: 15,
          mustWinWords: [w('earth'), w('mountain'), w('big')],
          newWordIds: [w('earth'), w('mountain'), w('river'), w('big'), w('blue')],
          reviewWordIds: [w('ocean'), w('whale')],
          scriptId: sc(13),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('ocean')],
              greetingLines: [
                { text: 'The ocean is part of the EARTH!', zh: '衔接锚点：海洋原来住在一个大大的球上——地球！' },
                { text: 'Hello, Earth! I am a little explorer!', zh: '双手抱"大地球"转一圈，探险出发！' },
              ],
            }),
            words(
              [w('earth'), w('mountain'), w('river'), w('big'), w('blue')],
              [
                game('listen-pick', [w('earth'), w('mountain'), w('river'), w('big'), w('blue')], 3),
                game('tpr-command', [w('big'), w('mountain'), w('river'), w('earth')], 1, {
                  title: { en: 'Body Map', zh: '身体当地图：手臂比高山，手臂流动当小河' },
                }),
              ],
              [w('earth'), w('mountain'), w('big')],
            ),
            song('l3-s-explorer', '探险家之歌：抱地球转圈→波浪手→双手举高高比大山'),
            handsOn({
              kind: 'craft',
              title: { en: 'Balloon Earth & Clay Mountain', zh: '气球地球 + 黏土高山' },
              steps: [
                { text: 'This is the earth! Big and blue!', zh: '吹个气球当地球，用蓝色贴纸/画笔贴上"海洋"' },
                { text: 'Make a mountain! Make a river!', zh: '黏土捏一座 mountain，旁边压一条弯弯的 river' },
              ],
              parentGuideZh: '气球画（贴）成蓝绿相间的"地球"，黏土捏高山和弯弯的小河摆在旁边，指着说 This is the earth. Big mountain. 有地球仪更好——找到自己住的城市说 Here! 作品摆上"探险家展台"，后面三天继续用。',
            }),
            wrapup([w('earth'), w('mountain'), w('river'), w('big')], st(13), {
              goodbyeLines: [
                { text: 'Hello, little explorer! Bye!', zh: '授予"小探险家"敬礼！预告：明天去沙漠、森林和小岛探险！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u4-d14',
          unitId: 'l3-u4',
          day: 14,
          title: { en: 'Desert Forest Island', zh: '沙漠 森林 小岛' },
          estimatedMinutes: 15,
          mustWinWords: [w('desert'), w('forest'), w('hot')],
          newWordIds: [w('desert'), w('forest'), w('island'), w('hot'), w('this')],
          reviewWordIds: [w('earth'), w('mountain'), w('river'), w('big'), w('blue')],
          scriptId: sc(14),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('earth')],
              greetingLines: [
                { text: 'Look at our earth! What is this?', zh: '衔接锚点：指着昨天做的地球作品，教 This is ...' },
                { text: 'This is the ocean! That is the mountain!', zh: '近指 this 远指 that，在她自己的作品上指一圈' },
              ],
            }),
            words(
              [w('desert'), w('forest'), w('island'), w('hot'), w('this')],
              [
                game('listen-pick', [w('desert'), w('forest'), w('island'), w('hot'), w('mountain')], 3),
                game('tpr-command', [w('hot'), w('desert'), w('forest'), w('this')], 1, {
                  title: { en: 'Point and Say', zh: '指着作品说 This is ...（说一个词就算成功）' },
                }),
              ],
              [w('desert'), w('forest'), w('hot')],
              { reviewWordIds: [w('earth'), w('mountain'), w('big')] },
            ),
            song('l3-s-explorer', '这次唱到 desert/forest/island 时指她作品上对应的位置'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Living Room Safari', zh: '客厅大探险' },
              steps: [
                { text: 'The sofa is the mountain! Climb!', zh: '沙发=高山，蓝毛巾=海洋，坐垫=小岛，黄纸=沙漠' },
                { text: 'This is the island! Jump!', zh: '你喊地名她"探险"到对应地点，到了就说 This is ...!' },
              ],
              parentGuideZh: '把客厅布置成世界地图：沙发靠垫当 island、蓝毛巾当 ocean、一堆黄纸/沙画当 desert、绿植角当 forest。你喊 "Sail to the island!" 她跑去踩坐垫。每到一个地点停一秒说 This is the ...，全身运动+地理启蒙一举两得。',
            }),
            wrapup([w('desert'), w('forest'), w('island'), w('hot')], st(14), {
              goodbyeLines: [
                { text: 'Great exploring today! Bye!', zh: '探险家击掌！预告：明天学三个神奇的字母音 sh ch th！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u4-d15',
          unitId: 'l3-u4',
          day: 15,
          title: { en: 'Sh Ch Th Phonics', zh: '双字母音 sh-ch-th' },
          estimatedMinutes: 15,
          mustWinWords: [w('ship'), w('chair'), w('beach')],
          newWordIds: [w('ship'), w('shop'), w('chair'), w('lunch'), w('beach')],
          reviewWordIds: [w('fish'), w('mouth'), w('this'), w('that'), w('ocean')],
          scriptId: sc(15),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('fish')],
              greetingLines: [
                { text: 'Shhh... the fish says sh-sh-sh!', zh: '衔接锚点：小鱼玩偶游过来，嘘——fish 里藏着 sh 的声音！' },
                { text: 'Sh! Ch! Th! Magic sounds today!', zh: '今天抓三个"魔法字母音"，先神秘地做个嘘的手势' },
              ],
            }),
            words(
              [w('ship'), w('shop'), w('chair'), w('lunch'), w('beach')],
              [
                game('listen-pick', [w('ship'), w('shop'), w('chair'), w('lunch'), w('beach')], 3),
                game('tpr-command', [w('ship'), w('chair'), w('lunch'), w('beach')], 1, {
                  title: { en: 'Sound Actions', zh: 'sh 做开船手/ch 学小火车/th 指嘴巴' },
                }),
              ],
              [w('ship'), w('chair'), w('beach')],
              { reviewWordIds: [w('fish'), w('mouth'), w('this')] },
            ),
            song('l3-s-phonics-chant', '韵律操大声念：sh-sh-ship! ch-ch-chair! th-th-this! 配上动作'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'Sound Hunt Sort', zh: 'sh/ch/th 声音寻宝分类' },
              steps: [
                { text: 'Find sh! Ship, shop, fish!', zh: '三张纸写 sh/ch/th，把画片（或家里实物）放到对应的声音下面' },
                { text: 'Chair! Ch-ch-chair!', zh: '找到椅子实物拍拍它，说 ch-ch-chair 最算数' },
              ],
              parentGuideZh: '三张纸分别写大大的 sh / ch / th，从旧杂志剪图（船/商店/椅子/午餐/海滩/鱼/嘴巴）或画简笔画让她分类；也可以满屋子找实物——chair 和 lunch 家里就有！分错不纠正，一起慢慢念出声音让她自己发现。',
            }),
            wrapup([w('ship'), w('chair'), w('beach'), w('fish')], st(15), {
              goodbyeLines: [
                { text: 'Sh-ch-th master! Bye!', zh: '授予"拼读小达人"称号！预告：明天是太阳班毕业大派对！' },
              ],
            }),
          ],
        },
        {
          id: 'l3-u4-d16',
          unitId: 'l3-u4',
          day: 16,
          title: { en: 'Sun Class Graduate!', zh: '太阳班毕业日 🎉' },
          estimatedMinutes: 20,
          mustWinWords: [w('im-happy'), w('good-morning'), w('earth')],
          newWordIds: [],
          reviewWordIds: [
            w('good-morning'), w('good-night'), w('i-can'), w('im-happy'), w('how-are-you'),
            w('where-live'), w('earth'), w('ocean'), w('mountain'), w('desert'), w('forest'), w('island'),
            w('ship'), w('chair'), w('beach'), w('whale'), w('lion'), w('happy'),
          ],
          scriptId: sc(16),
          segments: [
            warmup({
              helloSongId: 'l1-s-hello',
              anchorWordIds: [w('earth')],
              greetingLines: [
                { text: 'Today is GRADUATION DAY!', zh: '郑重宣布：今天是太阳班毕业日！把玩偶和家人请来参加典礼' },
                { text: 'Hello, Earth! Hello, everyone!', zh: '抱着她的地球作品向大家问好，仪式感拉满' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('earth'), w('ocean'), w('mountain'), w('desert'),
                  w('ship'), w('whale'), w('lion'), w('happy'),
                ], 8),
                game('match-pairs', [w('ship'), w('ocean'), w('chair'), w('this'), w('beach'), w('hot')], 1),
                game('read-aloud-gate', [w('im-happy'), w('good-morning'), w('where-live')], 3),
              ],
              [w('good-morning'), w('im-happy'), w('where-live')],
              { reviewWordIds: [w('good-night'), w('i-can'), w('how-are-you'), w('earth'), w('forest'), w('island')] },
            ),
            song('l3-s-explorer', '毕业典礼主题曲：全家站成圆圈唱 Big Blue Earth，最后一起喊 Yay!'),
            handsOn({
              kind: 'craft',
              title: { en: 'Sun Class Graduate Card', zh: '太阳班毕业纪念卡' },
              steps: [
                { text: 'Stars on my card! I did it!', zh: '打印好日期的毕业卡，让她贴满星星贴纸' },
                { text: 'I am a SUN graduate!', zh: '举着卡片和地球作品合影，大声宣布毕业！' },
              ],
              printableSvgKey: 'coloring-star',
              parentGuideZh: '做一张 "Sun Class Graduate ☀️" 纪念卡（写上日期），让她贴满这一级攒下的星星贴纸，再涂一颗大星星。合影后把卡片和她的探险家展台作品一起摆出来——这是她第二张英语毕业证书！',
            }),
            wrapup([w('im-happy'), w('good-morning'), w('earth'), w('i-can')], st(16), {
              goodbyeLines: [
                {
                  text: 'You are a SUPER SUN graduate! I love you!',
                  zh: '最长的一次 Wrap-up：用中文+英文认真总结"你学会了 Good morning、I\'m happy、Where does the fish live、earth、mountain…"（数给她听）。颁发毕业贴纸，大大的拥抱、击掌、亲额头。恭喜太阳班毕业！',
                },
              ],
            }),
          ],
        },
      ],
    },
  ],
}
