import type { Level } from '../schema'
import { l1Wordbank } from '../wordbank/l1'
import { l1Songs } from '../songs/l1'
import { game, handsOn, song, warmup, words, wrapup } from './factories'

/* ═══════════════════════════════════════════════════════════
   L1 ⭐ Star 启蒙级 — 20 课严格对齐《庭雨20天教案》
   Day1-5 My Magic Body / Day6-10 Colorful Zoo
   Day11-15 Yummy Food / Day16-20 Clothes & Weather（Day20=Showcase）
   ═══════════════════════════════════════════════════════════ */

const w = (name: string) => `l1-w-${name}`
const s = (name: string) => `l1-s-${name}`
const st = (n: number) => `l1-st-${String(n).padStart(2, '0')}`
const sc = (n: number) => `l1-sc-d${n}`

export const levelL1: Level = {
  id: 'L1',
  name: { en: 'Magic Start', zh: '启蒙级' },
  subtitle: { en: 'Star Class · Age 3-5', zh: '星星班 · 3-5岁零基础' },
  emoji: '⭐',
  themeColor: 'L1',
  wordbank: l1Wordbank,
  songs: l1Songs,
  units: [
    /* ═══════ U1 My Magic Body（教案第1周）═══════ */
    {
      id: 'l1-u1',
      levelId: 'L1',
      order: 1,
      title: { en: 'My Magic Body', zh: '我的神奇身体' },
      emoji: '🧒',
      weekTheme: 'body',
      lessons: [
        {
          id: 'l1-u1-d1',
          unitId: 'l1-u1',
          day: 1,
          title: { en: 'Head and Toes', zh: '头和脚趾' },
          estimatedMinutes: 15,
          mustWinWords: [w('head'), w('shoulders'), w('toes')],
          newWordIds: [w('head'), w('shoulders'), w('knees'), w('toes')],
          reviewWordIds: [w('hello')],
          scriptId: sc(1),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Hello, my little star!', zh: '抱娃娃坐垫上，摸她头说（中文辅助一次：老师好开心）' },
                { text: "I'm so happy to see you!", zh: '不强迫开口，你说给她听就好' },
              ],
            }),
            words(
              [w('head'), w('shoulders'), w('knees'), w('toes')],
              [game('listen-pick', [w('head'), w('shoulders'), w('knees'), w('toes')], 3)],
              [w('head'), w('shoulders'), w('toes')],
              { presentMode: 'card+tpr' },
            ),
            song(s('head-shoulders'), '慢速版：只做动作不唱词，摸摸头→肩→膝→脚趾'),
            handsOn({
              kind: 'coloring',
              title: { en: 'Color the Head Red', zh: '给小人涂色' },
              steps: [
                { text: 'Color the head red.', zh: '你说 Color the head red，手把手帮她涂第一个' },
                { text: 'Color the toes blue.', zh: '后面随她自由涂，涂到哪夸到哪' },
              ],
              printableSvgKey: 'coloring-kid',
              parentGuideZh: '打印空白小人图纸（点下方打印按钮）。你手把手帮她涂第一个部位，边涂边说英文，后面随她发挥，不纠正涂色出界。',
            }),
            wrapup([w('head'), w('shoulders'), w('knees'), w('toes')], st(1), {
              goodbyeLines: [
                { text: 'Good job! See you tomorrow!', zh: '摸她的小手说。预告：明天我们玩跳跳游戏！' },
              ],
            }),
          ],
        },
        {
          id: 'l1-u1-d2',
          unitId: 'l1-u1',
          day: 2,
          title: { en: 'Eyes and Ears', zh: '眼睛和耳朵' },
          estimatedMinutes: 15,
          mustWinWords: [w('eyes'), w('ears'), w('head')],
          newWordIds: [w('eyes'), w('ears')],
          reviewWordIds: [w('head'), w('shoulders'), w('knees'), w('toes')],
          scriptId: sc(2),
          segments: [
            warmup({
              anchorWordIds: [w('head')],
              greetingLines: [
                { text: 'Good morning! Can you say hi to bunny?', zh: '拿手偶打招呼（不强迫，你替她说）' },
                { text: 'Look! Our little friend from yesterday!', zh: '衔接锚点：拿出昨天涂色的小人图纸' },
              ],
            }),
            words(
              [w('eyes'), w('ears')],
              [
                game('tpr-command', [w('head'), w('eyes'), w('ears'), w('shoulders')], 1, {
                  title: { en: 'Simon Says', zh: '西蒙说：touch/point 指令' },
                }),
              ],
              [w('eyes'), w('ears')],
              { reviewWordIds: [w('head'), w('shoulders')] },
            ),
            song(s('head-shoulders'), '快版：加速做动作，她会笑出声'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Mirror Game', zh: '镜子游戏' },
              steps: [
                { text: 'Touch your ears!', zh: '你们对坐，你摸 ear 她摸 ear，你喊 Ears!' },
                { text: 'Touch your eyes!', zh: '轮流当镜子，做对就夸张鼓掌' },
              ],
              parentGuideZh: '对坐当彼此的镜子：你摸 ear 她摸 ear。做对了夸张鼓掌，做错了笑着再来一次，不纠正。',
            }),
            wrapup([w('eyes'), w('ears'), w('head')], st(2), {
              goodbyeLines: [{ text: 'One sticker for you! Bye!', zh: '在她手背贴一个贴纸，说 One sticker for you!' }],
            }),
          ],
        },
        {
          id: 'l1-u1-d3',
          unitId: 'l1-u1',
          day: 3,
          title: { en: 'Jump and Stop', zh: '跳跳和停' },
          estimatedMinutes: 15,
          mustWinWords: [w('jump'), w('stop'), w('run')],
          newWordIds: [w('jump'), w('run'), w('stop'), w('sit-down')],
          reviewWordIds: [w('head'), w('eyes')],
          scriptId: sc(3),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Where is the bunny? Can you find it?', zh: '衔接锚点：玩 Hide and seek 藏玩偶让她找' },
                { text: 'You found it!', zh: '找到后大喊 You found it! 鼓掌' },
              ],
            }),
            words(
              [w('jump'), w('run'), w('stop'), w('sit-down')],
              [
                game('tpr-command', [w('jump'), w('run'), w('stop'), w('sit-down')], 1, {
                  title: { en: 'Freeze Dance', zh: '定格舞：音乐停就 Stop!' },
                }),
              ],
              [w('jump'), w('stop')],
            ),
            song(s('walking-walking'), '站起来！走一走→跳→跑→停，全身动起来'),
            handsOn({
              kind: 'craft',
              title: { en: 'Clay Little Person', zh: '黏土搓小人' },
              steps: [
                { text: 'Roll the head!', zh: '用黏土搓小人，每搓一个部位你念一次（只念不考）' },
                { text: 'Roll the arms and legs!', zh: 'head… arms… legs… 边搓边说' },
              ],
              parentGuideZh: '用黏土搓一个小人。每搓一个部位念一次英文（只念，不考）。搓完摆在小人图纸旁边当"衔接锚点"道具。',
            }),
            wrapup([w('jump'), w('run'), w('stop')], st(3), {
              goodbyeLines: [{ text: 'You can jump! Amazing!', zh: '抱着她转一圈说 You can jump! Amazing!' }],
            }),
          ],
        },
        {
          id: 'l1-u1-d4',
          unitId: 'l1-u1',
          day: 4,
          title: { en: 'Clap and Stomp', zh: '拍手和跺脚' },
          estimatedMinutes: 15,
          mustWinWords: [w('clap-hands'), w('stomp-feet'), w('jump')],
          newWordIds: [w('clap-hands'), w('stomp-feet')],
          reviewWordIds: [w('jump'), w('run'), w('stop'), w('sit-down')],
          scriptId: sc(4),
          segments: [
            warmup({
              anchorWordIds: [w('head')],
              greetingLines: [
                { text: 'Where is head?', zh: '衔接锚点：拿出昨天的黏土小人，问 Where is head? 让她指' },
                { text: 'Yes! This is the head!', zh: '指对就夸张鼓掌' },
              ],
            }),
            words(
              [w('clap-hands'), w('stomp-feet')],
              [
                game('tpr-command', [w('clap-hands'), w('stomp-feet'), w('jump')], 1, {
                  title: { en: 'Action Combo', zh: '连续三动作：Clap! Stomp! Jump!' },
                }),
                game('listen-pick', [w('clap-hands'), w('stomp-feet'), w('jump'), w('run')], 3),
              ],
              [w('clap-hands'), w('stomp-feet')],
              { reviewWordIds: [w('jump'), w('stop')] },
            ),
            song(s('if-youre-happy'), '只做 clap 和 stomp 两个动作就够'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Bubble Pop!', zh: '泡泡游戏' },
              steps: [
                { text: 'Bubbles! Pop! Pop!', zh: '你吹泡泡，喊 Pop! 她去拍破' },
                { text: 'Jump and pop!', zh: '加入指令：Jump! 跳起来拍泡泡' },
              ],
              parentGuideZh: '吹泡泡，喊 Pop! 让她拍破。加入本周动作词：Jump and pop! / Run and pop! 玩到开心为止。',
            }),
            wrapup([w('clap-hands'), w('stomp-feet'), w('jump')], st(4), {
              goodbyeLines: [{ text: 'Bye-bye, see you!', zh: '边挥手边说，明天是复习日+绘本日！' }],
            }),
          ],
        },
        {
          id: 'l1-u1-d5',
          unitId: 'l1-u1',
          day: 5,
          title: { en: 'Body Review Day', zh: '身体复习日（不教新词）' },
          estimatedMinutes: 15,
          mustWinWords: [w('head'), w('eyes'), w('jump')],
          newWordIds: [],
          reviewWordIds: [
            w('head'), w('shoulders'), w('knees'), w('toes'), w('eyes'), w('ears'),
            w('jump'), w('run'), w('stop'), w('sit-down'), w('clap-hands'), w('stomp-feet'),
          ],
          scriptId: sc(5),
          segments: [
            warmup({
              greetingLines: [
                { text: "Let's play Simon Says!", zh: '热身：老师说大合集 head/eyes/ears/jump/run/stop/sit' },
                { text: 'Touch your head! Jump! Stop!', zh: '连续发指令，做对就欢呼' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('head'), w('eyes'), w('ears'), w('jump'), w('run'), w('stop'),
                  w('clap-hands'), w('knees'),
                ], 8),
                game('listen-pick', [w('shoulders'), w('toes'), w('sit-down'), w('stomp-feet')], 4),
              ],
              [w('head'), w('eyes'), w('jump')],
              { reviewWordIds: [w('head'), w('shoulders'), w('knees'), w('toes'), w('eyes'), w('ears')] },
            ),
            song(s('head-shoulders'), '本周歌串烧第一首：越唱越快！'),
            handsOn({
              kind: 'book',
              title: { en: 'From Head to Toe', zh: '绘本：From Head to Toe (Eric Carle)' },
              steps: [
                { text: 'I am a penguin and I can turn my head!', zh: '你学动物做动作，她学你' },
                { text: 'Can you do it? I can do it!', zh: '每页问 Can you do it? 带她说 I can do it!' },
              ],
              parentGuideZh: '亲子共读 Eric Carle《From Head to Toe》：你学书里动物做动作，她学你。线下另可搭障碍赛道：Jump over the pillow. Stop at the chair. Sit down.',
            }),
            wrapup([w('head'), w('eyes'), w('jump'), w('clap-hands')], st(5), {
              goodbyeLines: [
                { text: 'You are our week one champion!', zh: '给她戴"本周小冠军"手环（彩纸做），用英文夸3句' },
              ],
            }),
          ],
        },
      ],
    },

    /* ═══════ U2 Colorful Zoo（教案第2周）═══════ */
    {
      id: 'l1-u2',
      levelId: 'L1',
      order: 2,
      title: { en: 'Colorful Zoo', zh: '彩色动物园' },
      emoji: '🎨',
      weekTheme: 'colors',
      lessons: [
        {
          id: 'l1-u2-d6',
          unitId: 'l1-u2',
          day: 6,
          title: { en: 'Red Yellow Blue', zh: '红黄蓝' },
          estimatedMinutes: 15,
          mustWinWords: [w('red'), w('yellow'), w('blue')],
          newWordIds: [w('red'), w('yellow'), w('blue')],
          reviewWordIds: [w('hello')],
          scriptId: sc(6),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Red ball for you!', zh: '拿出红/黄/蓝三个彩球，滚一个给她说 Red ball for you!' },
                { text: 'Can you roll it back?', zh: '她滚回来就欢呼击掌' },
              ],
            }),
            words(
              [w('red'), w('yellow'), w('blue')],
              [
                game('listen-pick', [w('red'), w('yellow'), w('blue')], 3),
                game('tpr-command', [w('red'), w('yellow'), w('blue')], 1, {
                  title: { en: 'I Spy Colors', zh: 'I spy something red! 找身边的颜色' },
                }),
              ],
              [w('red'), w('blue')],
            ),
            song(s('i-see-blue'), '唱到哪色就指家里哪色的东西'),
            handsOn({
              kind: 'coloring',
              title: { en: 'Draw a Red Circle', zh: '画一个红圆圈' },
              steps: [
                { text: 'Draw a red circle!', zh: '给一张白纸，你说她画（你手把手起笔）' },
                { text: 'Now a blue circle!', zh: '再画蓝色圆圈，随她发挥' },
              ],
              parentGuideZh: '白纸上画圆圈：Draw a red circle（手把手第一次），再让她自由画。收球时说 Give me red 复习颜色。',
            }),
            wrapup([w('red'), w('yellow'), w('blue')], st(6), {
              goodbyeLines: [{ text: 'Give me red! Bye-bye!', zh: '把三个球收回来，说 Give me red.' }],
            }),
          ],
        },
        {
          id: 'l1-u2-d7',
          unitId: 'l1-u2',
          day: 7,
          title: { en: 'Cat Dog Duck', zh: '猫狗鸭' },
          estimatedMinutes: 15,
          mustWinWords: [w('cat'), w('dog'), w('duck')],
          newWordIds: [w('cat'), w('dog'), w('duck')],
          reviewWordIds: [w('red'), w('yellow'), w('blue')],
          scriptId: sc(7),
          segments: [
            warmup({
              greetingLines: [
                { text: 'What color are my socks?', zh: '穿彩色袜子露出脚趾自问自答 What color?' },
                { text: 'Meow~ Who is it?', zh: '衔接：你学猫叫让她猜 Cat!' },
              ],
            }),
            words(
              [w('cat'), w('dog'), w('duck')],
              [
                game('listen-pick', [w('cat'), w('dog'), w('duck'), w('red')], 3),
                game('tpr-command', [w('cat'), w('dog'), w('duck')], 1, {
                  title: { en: 'Animal Sounds', zh: '学动物叫：Meow / Woof / Quack' },
                }),
              ],
              [w('cat'), w('dog')],
            ),
            song(s('bingo'), '拍手打字母节奏：B-I-N-G-O'),
            handsOn({
              kind: 'craft',
              title: { en: 'Animal Footprints', zh: '动物脚印画' },
              steps: [
                { text: "This is a dog's foot!", zh: '海绵蘸颜料印脚印，你念 Dog’s foot' },
                { text: "Now the duck's foot!", zh: '再印鸭脚印，对比大小' },
              ],
              parentGuideZh: '海绵蘸颜料在纸上印"脚印"，每印一个念一次：Dog’s foot / Duck’s foot / Cat’s foot。',
            }),
            wrapup([w('cat'), w('dog'), w('duck')], st(7), {
              goodbyeLines: [{ text: "I'm a dog. Woof! Bye!", zh: '学狗喘气说 I’m a dog. Bye!' }],
            }),
          ],
        },
        {
          id: 'l1-u2-d8',
          unitId: 'l1-u2',
          day: 8,
          title: { en: 'A Red Dog', zh: '颜色+动物组合' },
          estimatedMinutes: 15,
          mustWinWords: [w('red'), w('dog'), w('cat')],
          newWordIds: [w('cow'), w('bear')],
          reviewWordIds: [w('red'), w('yellow'), w('blue'), w('cat'), w('dog'), w('duck')],
          scriptId: sc(8),
          segments: [
            warmup({
              anchorWordIds: [w('duck')],
              greetingLines: [
                { text: 'Hello, yellow duck!', zh: '衔接锚点：动物玩偶排排坐，一个个打招呼' },
                { text: 'Hello, red cat! Hello, blue dog!', zh: '颜色+动物组合打招呼' },
              ],
            }),
            words(
              [w('cow'), w('bear')],
              [
                game('match-pairs', [w('cat'), w('dog'), w('duck'), w('cow'), w('bear'), w('red')], 1),
                game('listen-pick', [w('cow'), w('bear'), w('cat'), w('dog')], 3),
              ],
              [w('cow'), w('bear')],
              { reviewWordIds: [w('cat'), w('dog'), w('duck')] },
            ),
            song(s('old-macdonald'), '只唱 cow / duck / dog 三种动物+叫声'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'Color and Animal Match', zh: '配对卡：颜色卡配动物卡' },
              steps: [
                { text: 'Find a yellow duck!', zh: '你说 Find a yellow duck，她从一堆卡片里挑' },
                { text: 'A red dog! A blue cat!', zh: '只说两个组合，她摆对就欢呼' },
              ],
              parentGuideZh: '自制卡片：颜色卡3张+动物卡3张。你说组合（a red dog）让她把两张卡摆一起。摆对夸张鼓掌。',
            }),
            wrapup([w('cow'), w('bear'), w('duck')], st(8), {
              goodbyeLines: [{ text: 'Hug your favorite animal! See you!', zh: '选她最喜欢的小动物抱着说 See you!' }],
            }),
          ],
        },
        {
          id: 'l1-u2-d9',
          unitId: 'l1-u2',
          day: 9,
          title: { en: 'Green and Orange', zh: '绿色和橙色' },
          estimatedMinutes: 15,
          mustWinWords: [w('green'), w('orange'), w('elephant')],
          newWordIds: [w('green'), w('orange'), w('elephant')],
          reviewWordIds: [w('red'), w('blue'), w('yellow'), w('cat'), w('dog')],
          scriptId: sc(9),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Is this a cat? No!', zh: '拿水果（苹果/香蕉）混入动物玩偶中，摇头配合问' },
                { text: 'Is this an apple? Yes!', zh: '答对就欢呼，混着问几轮' },
              ],
            }),
            words(
              [w('green'), w('orange'), w('elephant')],
              [
                game('listen-pick', [w('green'), w('orange'), w('red'), w('blue')], 3),
                game('tpr-command', [w('green'), w('orange'), w('red')], 1, {
                  title: { en: 'Color Run', zh: '颜色跑步：Run to green! 跑到绿色垫子' },
                }),
              ],
              [w('green'), w('elephant')],
            ),
            song(s('color-song'), '五色全唱一遍，指身边对应颜色的东西'),
            handsOn({
              kind: 'coloring',
              title: { en: 'Color the Elephant Gray', zh: '涂一只灰大象' },
              steps: [
                { text: 'Color it gray!', zh: '印一只大象，你说 Color it gray（她随便涂）' },
                { text: 'What a big elephant!', zh: '涂完夸：好大的大象！' },
              ],
              printableSvgKey: 'coloring-elephant',
              parentGuideZh: '打印大象线稿让她涂色。她涂什么颜色都夸（gray 只是引导语）。收绿色摇铃摇一摇说 Green, bye!',
            }),
            wrapup([w('green'), w('orange'), w('elephant')], st(9), {
              goodbyeLines: [{ text: 'Green, bye-bye!', zh: '拿出绿色摇铃摇一摇说 Green, bye!' }],
            }),
          ],
        },
        {
          id: 'l1-u2-d10',
          unitId: 'l1-u2',
          day: 10,
          title: { en: 'Brown Bear Review', zh: '棕熊复习日' },
          estimatedMinutes: 15,
          mustWinWords: [w('brown'), w('bear'), w('duck')],
          newWordIds: [w('brown')],
          reviewWordIds: [w('red'), w('blue'), w('yellow'), w('green'), w('cat'), w('dog'), w('duck')],
          scriptId: sc(10),
          segments: [
            warmup({
              anchorWordIds: [w('bear')],
              greetingLines: [
                { text: 'Look! Brown bear!', zh: '衔接锚点：Brown Bear 绘本只翻第一页，指熊说' },
                { text: 'Brown bear, brown bear!', zh: '拍手念两遍，制造期待（书先收起来）' },
              ],
            }),
            words(
              [w('brown')],
              [
                game('mole', [
                  w('red'), w('yellow'), w('blue'), w('green'), w('cat'), w('dog'), w('duck'), w('brown'),
                ], 8),
                game('listen-pick', [w('bear'), w('cat'), w('dog'), w('duck')], 4),
              ],
              [w('brown'), w('bear')],
              { reviewWordIds: [w('red'), w('blue'), w('yellow'), w('green')] },
            ),
            song(s('brown-bear'), '节奏念谣：你念她拍手，颜色/动物处停顿让她接'),
            handsOn({
              kind: 'book',
              title: { en: 'Brown Bear, What Do You See?', zh: '绘本精读：Brown Bear' },
              steps: [
                { text: 'Brown bear, brown bear, what do you see?', zh: '你读每一页，停顿在颜色/动物处让她接' },
                { text: 'I see a red bird looking at me!', zh: '哪怕只接一个音节都大声夸' },
              ],
              parentGuideZh: '精读《Brown Bear, Brown Bear, What Do You See?》：每页停在颜色/动物词等她接（哪怕只接一个音节）。另可玩"你喊 Red dog! 她拿红笔涂狗卡片"。',
            }),
            wrapup([w('brown'), w('bear'), w('duck')], st(10), {
              goodbyeLines: [{ text: 'You saw brown bear today! High five!', zh: '击掌！High five!' }],
            }),
          ],
        },
      ],
    },

    /* ═══════ U3 Yummy Food（教案第3周）═══════ */
    {
      id: 'l1-u3',
      levelId: 'L1',
      order: 3,
      title: { en: 'Yummy Food', zh: '美味小餐桌' },
      emoji: '🍎',
      weekTheme: 'food',
      lessons: [
        {
          id: 'l1-u3-d11',
          unitId: 'l1-u3',
          day: 11,
          title: { en: 'Apple Banana Water', zh: '苹果香蕉水' },
          estimatedMinutes: 15,
          mustWinWords: [w('apple'), w('banana'), w('water')],
          newWordIds: [w('apple'), w('banana'), w('water')],
          reviewWordIds: [w('red'), w('yellow')],
          scriptId: sc(11),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Time to eat!', zh: '围兜戴上，拿空碗和勺子敲一敲说 Time to eat!' },
                { text: 'Yummy apple!', zh: '你假装吃一口苹果，说 Yummy apple! 她学' },
              ],
            }),
            words(
              [w('apple'), w('banana'), w('water')],
              [game('listen-pick', [w('apple'), w('banana'), w('water')], 3)],
              [w('apple'), w('banana')],
            ),
            song(s('are-you-hungry'), '摸肚子+举手做动作，最后 Yummy yummy yum!'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Cut the Fruit', zh: '切水果玩具' },
              steps: [
                { text: 'Cut the apple!', zh: '切水果玩具，你切时说 Cut the apple' },
                { text: 'Cut the banana!', zh: '轮到她切，切什么都夸' },
              ],
              parentGuideZh: '用水果切切乐玩具：你切时说 Cut the apple，然后换她切。结束时把苹果玩具放她手心说 Apple for you.',
            }),
            wrapup([w('apple'), w('banana'), w('water')], st(11), {
              goodbyeLines: [{ text: 'Apple for you. Bye!', zh: '把苹果玩具放她手心说 Apple for you.' }],
            }),
          ],
        },
        {
          id: 'l1-u3-d12',
          unitId: 'l1-u3',
          day: 12,
          title: { en: 'I Want Apple', zh: '句型：我想要' },
          estimatedMinutes: 15,
          mustWinWords: [w('i-want'), w('apple'), w('water')],
          newWordIds: [w('i-want'), w('im-hungry'), w('yummy')],
          reviewWordIds: [w('apple'), w('banana'), w('water')],
          scriptId: sc(12),
          segments: [
            warmup({
              anchorWordIds: [w('water')],
              greetingLines: [
                { text: 'Water, please!', zh: '衔接锚点：拿出杯子做喝水动作说 Water, please.' },
                { text: 'Thank you!', zh: '她递给你（或你递给她）都说 Thank you!' },
              ],
            }),
            words(
              [w('i-want'), w('im-hungry'), w('yummy')],
              [
                game('tpr-command', [w('im-hungry'), w('yummy'), w('i-want')], 1, {
                  title: { en: 'Hungry Show', zh: '饿了表演：捂肚子 I’m hungry!' },
                }),
                game('listen-pick', [w('apple'), w('banana'), w('water'), w('yummy')], 3),
              ],
              [w('i-want'), w('yummy')],
              { reviewWordIds: [w('apple'), w('banana')] },
            ),
            song(s('are-you-hungry'), '这次跟着唱 Yes, I am! 部分'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'I Want Apple Game', zh: '"我要苹果"登高游戏 + 过家家' },
              steps: [
                { text: 'I want ... apple!', zh: '食物放高处：她说出 apple 才拿到（你先说前半句）' },
                { text: 'Apple? OK!', zh: '过家家：你当妈妈她当宝宝，你问 Apple? 她点头你说 OK!' },
              ],
              parentGuideZh: '把食物玩具放高处，她想拿必须说 I want apple（一开始你说 I want… 她只接 apple）。然后过家家喂娃娃。把香蕉放她头顶笑称 Banana hat!',
            }),
            wrapup([w('i-want'), w('apple'), w('yummy')], st(12), {
              goodbyeLines: [{ text: 'Banana hat! Bye-bye!', zh: '把香蕉玩具放她头顶说 Banana hat!' }],
            }),
          ],
        },
        {
          id: 'l1-u3-d13',
          unitId: 'l1-u3',
          day: 13,
          title: { en: 'Plate Cup Spoon', zh: '盘子杯子勺子' },
          estimatedMinutes: 15,
          mustWinWords: [w('cup'), w('spoon'), w('plate')],
          newWordIds: [w('plate'), w('cup'), w('spoon')],
          reviewWordIds: [w('apple'), w('banana'), w('water')],
          scriptId: sc(13),
          segments: [
            warmup({
              greetingLines: [
                { text: "Let's set the table!", zh: '拿餐巾纸铺桌上说 Let’s set the table.' },
                { text: 'Plate, cup, spoon!', zh: '一样样拿出来报名字' },
              ],
            }),
            words(
              [w('plate'), w('cup'), w('spoon')],
              [
                game('listen-pick', [w('plate'), w('cup'), w('spoon'), w('apple')], 3),
                game('tpr-command', [w('cup'), w('spoon'), w('plate')], 1, {
                  title: { en: 'Put the Cup on the Plate', zh: '听指令摆餐具' },
                }),
              ],
              [w('cup'), w('spoon')],
            ),
            song(s('clean-up'), '边唱边把玩具餐具收进小篮子'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'Set the Real Table', zh: '摆真餐具' },
              steps: [
                { text: 'Spoon on the plate!', zh: '真实餐具摆放：你发指令她执行' },
                { text: 'Cup next to the plate!', zh: '摆对了全家吃饭时用她的摆位' },
              ],
              parentGuideZh: '晚饭前让她摆真实（不易碎）餐具：Spoon on the plate. Cup next to the plate. 吃饭时宣布"这是宝宝摆的桌子"。',
            }),
            wrapup([w('plate'), w('cup'), w('spoon')], st(13), {
              goodbyeLines: [{ text: 'Bye-bye, plate!', zh: '把餐具收进抽屉说 Bye-bye, plate.' }],
            }),
          ],
        },
        {
          id: 'l1-u3-d14',
          unitId: 'l1-u3',
          day: 14,
          title: { en: 'Cookie and Noodles', zh: '饼干和面条' },
          estimatedMinutes: 15,
          mustWinWords: [w('cookie'), w('i-want'), w('yummy')],
          newWordIds: [w('cookie'), w('noodles')],
          reviewWordIds: [w('apple'), w('banana'), w('water'), w('plate'), w('cup'), w('spoon')],
          scriptId: sc(14),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Mmm, cookie!', zh: '拿出真饼干咬一口说 Mmm, cookie!（表情夸张）' },
                { text: 'Do you want a cookie?', zh: '问她想要吗，引导说 I want…' },
              ],
            }),
            words(
              [w('cookie'), w('noodles')],
              [
                game('listen-pick', [w('cookie'), w('noodles'), w('apple'), w('banana')], 3),
                game('read-aloud-gate', [w('i-want'), w('yummy'), w('cookie')], 3),
              ],
              [w('cookie'), w('noodles')],
              { reviewWordIds: [w('i-want'), w('im-hungry')] },
            ),
            song(s('apples-bananas'), '元音歌图个乐：越唱越变调越好笑'),
            handsOn({
              kind: 'craft',
              title: { en: 'Clay Noodles', zh: '橡皮泥做面条' },
              steps: [
                { text: 'Noodles!', zh: '你搓长条说 Noodles! 她也搓' },
                { text: "I'm hungry! Let's eat!", zh: '做完假装吃：I’m hungry! Yummy!' },
              ],
              parentGuideZh: '橡皮泥搓长条当面条，边搓边说 Noodles! 做好假装一起吃：I’m hungry! → Yummy! 渴了表演：你捂肚子说 I’m hungry! 让她递食物。',
            }),
            wrapup([w('cookie'), w('noodles'), w('yummy')], st(14), {
              goodbyeLines: [{ text: 'You are a good helper! Bye!', zh: '抱抱说 You are a good helper!' }],
            }),
          ],
        },
        {
          id: 'l1-u3-d15',
          unitId: 'l1-u3',
          day: 15,
          title: { en: 'Restaurant Review', zh: '点餐复习日' },
          estimatedMinutes: 15,
          mustWinWords: [w('apple'), w('cup'), w('i-want')],
          newWordIds: [],
          reviewWordIds: [
            w('apple'), w('banana'), w('water'), w('plate'), w('cup'), w('spoon'),
            w('cookie'), w('noodles'), w('i-want'), w('yummy'),
          ],
          scriptId: sc(15),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Welcome to our restaurant!', zh: '摆"小餐桌"场景：所有食物餐具放桌上' },
                { text: 'Are you hungry?', zh: '问她饿不饿，开场点餐游戏' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('apple'), w('banana'), w('water'), w('plate'), w('cup'), w('spoon'), w('cookie'), w('yummy'),
                ], 8),
                game('match-pairs', [w('apple'), w('banana'), w('water'), w('cup'), w('spoon'), w('cookie')], 1),
              ],
              [w('apple'), w('cup'), w('i-want')],
              { reviewWordIds: [w('apple'), w('banana'), w('water'), w('plate'), w('cup'), w('spoon')] },
            ),
            song(s('are-you-hungry'), '本周歌串烧：全家一起唱'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Order Game', zh: '点餐游戏 + 喂玩偶' },
              steps: [
                { text: 'I want banana.', zh: '你点单她拿给你，然后互换角色她点单' },
                { text: 'Feed the bear. Give bear apple.', zh: '喂玩偶：你说她执行' },
              ],
              parentGuideZh: '点餐游戏：你点 I want banana 她拿给你，然后互换（她说 I want… 你拿）。最后喂玩偶：Feed the bear. Give bear apple.',
            }),
            wrapup([w('apple'), w('cup'), w('i-want')], st(15), {
              goodbyeLines: [{ text: 'A treat for you!', zh: '给她一颗真的葡萄干说 A treat for you!' }],
            }),
          ],
        },
      ],
    },

    /* ═══════ U4 Clothes & Weather（教案第4周，Day20=Showcase）═══════ */
    {
      id: 'l1-u4',
      levelId: 'L1',
      order: 4,
      title: { en: 'Clothes & Weather', zh: '穿衣与天气' },
      emoji: '🧥',
      weekTheme: 'clothes',
      lessons: [
        {
          id: 'l1-u4-d16',
          unitId: 'l1-u4',
          day: 16,
          title: { en: 'Hat Shoes Coat', zh: '帽子鞋子外套' },
          estimatedMinutes: 15,
          mustWinWords: [w('hat'), w('shoes'), w('coat')],
          newWordIds: [w('hat'), w('shoes'), w('coat')],
          reviewWordIds: [w('head')],
          scriptId: sc(16),
          segments: [
            warmup({
              anchorWordIds: [w('head')],
              greetingLines: [
                { text: 'Hat!', zh: '衔接锚点：拿一顶帽子戴她头上说 Hat! 一起照镜子' },
                { text: 'Nice hat!', zh: '夸张地夸 Nice hat!' },
              ],
            }),
            words(
              [w('hat'), w('shoes'), w('coat')],
              [
                game('tpr-command', [w('hat'), w('shoes'), w('coat')], 1, {
                  title: { en: 'Put On, Take Off', zh: '穿脱比赛：Put on your hat / Take off' },
                }),
                game('listen-pick', [w('hat'), w('shoes'), w('coat')], 3),
              ],
              [w('hat'), w('shoes')],
            ),
            song(s('put-on-shoes'), '唱到哪件就穿哪件（用真衣物或娃娃的）'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Dress the Doll', zh: '给娃娃穿衣服' },
              steps: [
                { text: 'Shoes for doll!', zh: '给娃娃穿衣服：你说 Shoes for doll 她执行' },
                { text: 'Hat for doll!', zh: '穿对了娃娃"说"谢谢' },
              ],
              parentGuideZh: '给娃娃/玩偶穿衣服，你发指令：Shoes for doll. Coat for doll. 最后指她自己的鞋说 Nice shoes!',
            }),
            wrapup([w('hat'), w('shoes'), w('coat')], st(16), {
              goodbyeLines: [{ text: 'Nice shoes! Bye!', zh: '指她的鞋说 Nice shoes!' }],
            }),
          ],
        },
        {
          id: 'l1-u4-d17',
          unitId: 'l1-u4',
          day: 17,
          title: { en: 'Sunny Rainy', zh: '晴天和雨天' },
          estimatedMinutes: 15,
          mustWinWords: [w('sunny'), w('rainy')],
          newWordIds: [w('sunny'), w('rainy')],
          reviewWordIds: [w('hat'), w('shoes')],
          scriptId: sc(17),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Is it sunny?', zh: '走到窗边手遮眼睛看外面问 Is it sunny?' },
                { text: "Look outside! It's sunny!", zh: '根据真实天气说（雨天就说 rainy）' },
              ],
            }),
            words(
              [w('sunny'), w('rainy')],
              [
                game('listen-pick', [w('sunny'), w('rainy'), w('hat'), w('shoes')], 3),
                game('tpr-command', [w('sunny'), w('rainy')], 1, {
                  title: { en: 'Weather Show', zh: '喷壶喷水=Rainy! 手电筒=Sunny!' },
                }),
              ],
              [w('sunny'), w('rainy')],
            ),
            song(s('hows-weather'), '唱到 sunny 比太阳，唱到 rainy 手指落雨点'),
            handsOn({
              kind: 'coloring',
              title: { en: 'Draw the Sun', zh: '画太阳涂黄色' },
              steps: [
                { text: 'Draw a sun!', zh: '画一个太阳，涂黄色' },
                { text: 'Sunny is yellow!', zh: '边涂边说 Sunny is yellow.' },
              ],
              printableSvgKey: 'coloring-sun',
              parentGuideZh: '打印太阳线稿涂黄色，说 Sunny is yellow. 喷壶喷一点水体验 Rainy!（浴室/阳台玩）。',
            }),
            wrapup([w('sunny'), w('rainy')], st(17), {
              goodbyeLines: [{ text: 'Tomorrow we play rainy! Bye!', zh: '预告：明天我们玩下雨游戏！' }],
            }),
          ],
        },
        {
          id: 'l1-u4-d18',
          unitId: 'l1-u4',
          day: 18,
          title: { en: 'Weather and Clothes', zh: '天气配衣物' },
          estimatedMinutes: 15,
          mustWinWords: [w('its-sunny'), w('put-on-hat'), w('sunny')],
          newWordIds: [w('its-sunny'), w('put-on-hat')],
          reviewWordIds: [w('hat'), w('shoes'), w('coat'), w('sunny'), w('rainy')],
          scriptId: sc(18),
          segments: [
            warmup({
              anchorWordIds: [w('sunny')],
              greetingLines: [
                { text: 'Hat for sunny! Boots for rainy!', zh: '衔接锚点：衣物天气配对——帽子配 sunny，雨鞋配 rainy' },
                { text: 'Can you match them?', zh: '让她把衣物卡放到对应天气卡旁' },
              ],
            }),
            words(
              [w('its-sunny'), w('put-on-hat')],
              [
                game('match-pairs', [w('hat'), w('coat'), w('shoes'), w('sunny'), w('rainy'), w('cold')], 1),
                game('tpr-command', [w('put-on-hat'), w('sunny'), w('rainy')], 1, {
                  title: { en: 'Dress for Weather', zh: '你喊天气，她选对应衣物穿上' },
                }),
              ],
              [w('its-sunny'), w('put-on-hat')],
              { reviewWordIds: [w('hat'), w('coat')] },
            ),
            song(s('rain-rain'), '双手向外推：Rain rain go away!'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'Raindrop Stickers', zh: '贴纸书：雨滴贴窗户' },
              steps: [
                { text: 'Sticky raindrops on the window!', zh: '把雨滴贴纸贴在窗玻璃/画好的窗户上' },
                { text: 'One, two, three raindrops!', zh: '边贴边数（不要求说数字）' },
              ],
              parentGuideZh: '用蓝色贴纸当雨滴贴在窗户（或纸上画的窗户）上，边贴边说 rainy / raindrops。摇手说 Rainy, bye!',
            }),
            wrapup([w('its-sunny'), w('put-on-hat'), w('rainy')], st(18), {
              goodbyeLines: [{ text: 'Rainy, bye-bye!', zh: '摇手说 Rainy, bye!' }],
            }),
          ],
        },
        {
          id: 'l1-u4-d19',
          unitId: 'l1-u4',
          day: 19,
          title: { en: 'Hot and Cold', zh: '热和冷' },
          estimatedMinutes: 15,
          mustWinWords: [w('hot'), w('cold'), w('sunny')],
          newWordIds: [w('hot'), w('cold')],
          reviewWordIds: [w('hat'), w('shoes'), w('coat'), w('sunny'), w('rainy')],
          scriptId: sc(19),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Pick your clothes today!', zh: '把本周所有衣物摊在床上，让她挑一件穿' },
                { text: 'Nice choice!', zh: '无论挑哪件都夸 Nice choice!' },
              ],
            }),
            words(
              [w('hot'), w('cold')],
              [
                game('tpr-command', [w('hot'), w('cold'), w('sunny'), w('rainy')], 1, {
                  title: { en: 'Hot or Cold Touch', zh: '摸热水袋喊 Hot! 摸冰块喊 Cold!' },
                }),
                game('listen-pick', [w('hot'), w('cold'), w('sunny'), w('rainy')], 3),
              ],
              [w('hot'), w('cold')],
            ),
            song(s('hot-cold'), '自编调子反复唱 hot/cold，配扇风和发抖动作'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'Sort Hot and Cold', zh: '分类游戏：热的冷的分两堆' },
              steps: [
                { text: 'Red clothes here — hot!', zh: '红色衣物放一堆（hot）' },
                { text: 'Blue clothes there — cold!', zh: '蓝色衣物放另一堆（cold）' },
              ],
              parentGuideZh: '衣物按颜色分两堆：红=hot，蓝=cold（概念游戏不必较真）。体验：摸温热水袋喊 Hot!，摸冰凉的杯子喊 Cold! 最后裹毯子里说 So warm! Good night!',
            }),
            wrapup([w('hot'), w('cold'), w('coat')], st(19), {
              goodbyeLines: [{ text: 'So warm! Good night!', zh: '裹她在毯子里说 So warm! Good night!' }],
            }),
          ],
        },
        {
          id: 'l1-u4-d20',
          unitId: 'l1-u4',
          day: 20,
          title: { en: 'Show Time!', zh: '月度展示日 🎉' },
          estimatedMinutes: 20,
          mustWinWords: [w('head'), w('red'), w('apple')],
          newWordIds: [],
          reviewWordIds: [
            w('head'), w('eyes'), w('jump'), w('red'), w('blue'), w('cat'), w('dog'), w('duck'),
            w('apple'), w('banana'), w('water'), w('cup'), w('hat'), w('shoes'), w('sunny'), w('rainy'),
          ],
          scriptId: sc(20),
          showcase: {
            certificateTitle: { en: 'My First English Month', zh: '我的第一个英语月' },
            cards: [
              { prompt: 'What is this?', promptZh: '指着自己的头问：这是什么？（期望：head）', hintWordId: w('head'), hintEmoji: '🗣️' },
              { prompt: 'What color is this?', promptZh: '指红色球/卡问：什么颜色？（期望：red）', hintWordId: w('red'), hintEmoji: '🔴' },
              { prompt: 'What do you want?', promptZh: '展示苹果问：你想要什么？（哪怕只说 ap 都算成功）', hintWordId: w('apple'), hintEmoji: '🍎' },
              { prompt: 'Is it sunny?', promptZh: '问天气：今天晴天吗？（点头或摇头都算成功）', hintWordId: w('sunny'), hintEmoji: '☀️' },
              { prompt: 'Can you jump?', promptZh: '发出指令：能跳一跳吗？（做动作即成功）', hintWordId: w('jump'), hintEmoji: '🦘' },
            ],
          },
          segments: [
            warmup({
              greetingLines: [
                { text: 'Today is Show Time!', zh: '郑重宣布！把玩偶/爸妈（或手机录影）叫来当观众' },
                { text: 'Are you ready?', zh: '击掌预热：准备好了吗！' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('head'), w('red'), w('apple'), w('hat'), w('sunny'), w('cat'), w('jump'), w('cup'),
                ], 8),
              ],
              [],
              { reviewWordIds: [w('head'), w('red'), w('apple'), w('hat'), w('sunny')] },
            ),
            song(s('head-shoulders'), '选她这月最爱的一首唱跳（大概率是 Head Shoulders）'),
            handsOn({
              kind: 'craft',
              title: { en: 'My First English Month Card', zh: '纪念贴纸卡' },
              steps: [
                { text: 'Stars for my card!', zh: '提前打印好日期的纪念卡，让她贴满星星贴纸' },
                { text: 'I did it!', zh: '贴完举起来合影！' },
              ],
              printableSvgKey: 'coloring-star',
              parentGuideZh: '做一张"My First English Month"贴纸纪念卡（提前打印日期），让她贴满星星。然后进入展示环节（点下方"开始展示"按钮）。',
            }),
            wrapup([w('head'), w('red'), w('apple'), w('sunny')], st(20), {
              goodbyeLines: [
                {
                  text: 'You are a super star! I love you!',
                  zh: '最长的一次 Wrap-up：中文+英文认真总结"你这一个月学会了 head, eyes, red, apple, hat…"（数给她听）。大大的拥抱、击掌、亲额头，说 I love you, see you tomorrow!',
                },
              ],
            }),
          ],
        },
      ],
    },
  ],
}
