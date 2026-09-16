import type { Level } from '../schema'
import { l2Wordbank } from '../wordbank/l2'
import { l2Songs } from '../songs/l2'
import { game, handsOn, song, warmup, words, wrapup } from './factories'

/* ═══════════════════════════════════════════════════════════
   L2 🌙 Moon 基础级 — 4 单元 × 4 课 = 16 课（day 1~16）
   U1 My Family / U2 My Toys / U3 In the Park / U4 Let's Move
   每单元第 4 课为复习课（不教新词，游戏为主）
   拼读词族跟读：U2 -at（D7）/ U3 -og（D11）/ U4 -ig（D15）
   开场歌全局复用 l1-s-hello（factories 默认）
   ═══════════════════════════════════════════════════════════ */

const w = (name: string) => `l2-w-${name}`
const s = (name: string) => `l2-s-${name}`
const st = (n: number) => `l2-st-${String(n).padStart(2, '0')}`
const sc = (n: number) => `l2-sc-d${n}`

export const levelL2: Level = {
  id: 'L2',
  name: { en: 'Moon Rise', zh: '基础级' },
  subtitle: { en: 'Moon Class · Age 4-6', zh: '月亮班 · 4-6岁有初步听力词汇' },
  emoji: '🌙',
  themeColor: 'L2',
  wordbank: l2Wordbank,
  songs: l2Songs,
  units: [
    /* ═══════ U1 My Family ═══════ */
    {
      id: 'l2-u1',
      levelId: 'L2',
      order: 1,
      title: { en: 'My Family', zh: '我的一家人' },
      emoji: '👨‍👩‍👧',
      weekTheme: 'family',
      lessons: [
        {
          id: 'l2-u1-d1',
          unitId: 'l2-u1',
          day: 1,
          title: { en: 'Mom and Dad', zh: '妈妈爸爸和我' },
          estimatedMinutes: 15,
          mustWinWords: [w('mom'), w('dad'), w('baby')],
          newWordIds: [w('mom'), w('dad'), w('baby'), w('this-is-my')],
          reviewWordIds: [],
          scriptId: sc(1),
          segments: [
            warmup({
              greetingLines: [
                { text: 'Hello, my little star!', zh: '抱抱宝宝，摸她的头说 Hello! 欢迎升级月亮班，先大大地夸一句：You are big now!' },
                { text: 'Look! A family photo!', zh: '拿出全家福照片（手机相册也行），指着照片神秘地说 Look!' },
              ],
            }),
            words(
              [w('mom'), w('dad'), w('baby'), w('this-is-my')],
              [
                game('listen-pick', [w('mom'), w('dad'), w('baby')], 3),
                game('tpr-command', [w('mom'), w('dad'), w('this-is-my')], 1, {
                  title: { en: 'Family Hugs', zh: '听到 mom 抱妈妈，听到 dad 抱爸爸' },
                }),
              ],
              [w('mom'), w('dad')],
            ),
            song(s('family-song'), '拿着全家福指照片里的人唱，唱到谁指谁'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Family Photo Show', zh: '全家福小讲解' },
              steps: [
                { text: 'This is my mom!', zh: '你指着照片先说一遍，再让她指（她只说出 mom 就算大成功）' },
                { text: 'This is my dad!', zh: '你说前半句 This is my… 停下来，让她接 dad' },
              ],
              parentGuideZh: '拿出真实全家福，你指谁就说 This is my…。然后换她指，她说中文也没关系，你用英文笑着重复一遍即可，不纠错、不逼问。',
            }),
            wrapup([w('mom'), w('dad'), w('baby')], st(1), {
              goodbyeLines: [
                { text: 'I love you! See you tomorrow!', zh: '抱抱她说 I love you! 预告：明天我们认识奶奶爷爷（外婆外公）！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u1-d2',
          unitId: 'l2-u1',
          day: 2,
          title: { en: 'Grandma and Grandpa', zh: '奶奶和爷爷' },
          estimatedMinutes: 15,
          mustWinWords: [w('grandma'), w('grandpa'), w('mom')],
          newWordIds: [w('grandma'), w('grandpa')],
          reviewWordIds: [w('mom'), w('dad'), w('baby'), w('this-is-my')],
          scriptId: sc(2),
          segments: [
            warmup({
              anchorWordIds: [w('this-is-my')],
              greetingLines: [
                { text: 'This is my photo! Where is mom?', zh: '衔接锚点：拿出昨天的全家福，问 Where is mom? 让她指' },
                { text: 'Yes! This is my mom!', zh: '指对就夸张鼓掌，一起说 This is my mom!' },
              ],
            }),
            words(
              [w('grandma'), w('grandpa')],
              [
                game('listen-pick', [w('grandma'), w('grandpa'), w('mom'), w('dad')], 3),
                game('tpr-command', [w('grandma'), w('grandpa'), w('baby')], 1, {
                  title: { en: 'Family Pose', zh: '全家造型秀：喊谁就摆谁的姿势' },
                }),
              ],
              [w('grandma'), w('grandpa')],
              { reviewWordIds: [w('mom'), w('dad')] },
            ),
            song(s('finger-family'), '五根手指就是一家人：大拇指是爸爸，食指是妈妈'),
            handsOn({
              kind: 'coloring',
              title: { en: 'My Family Picture', zh: '画一张全家福' },
              steps: [
                { text: 'Draw mom! Draw dad!', zh: '让她画全家福（画成什么样都像），你边看边报名字' },
                { text: 'This is my family!', zh: '画完举起来，一起说 This is my family!' },
              ],
              printableSvgKey: 'coloring-kid',
              parentGuideZh: '打印小人图纸或直接白纸，让她画全家福。她画的人再抽象都指着问 Is this mom? 说是就欢呼。也可以打印涂色版小人，涂完说 This is me!',
            }),
            wrapup([w('grandma'), w('grandpa'), w('mom')], st(2), {
              goodbyeLines: [
                { text: 'You drew your family! Amazing!', zh: '把她的画贴在墙上说：这是我们家的画！明天认识兄弟姐妹！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u1-d3',
          unitId: 'l2-u1',
          day: 3,
          title: { en: 'Sister, Brother, I Love You', zh: '姐妹兄弟和我爱你' },
          estimatedMinutes: 15,
          mustWinWords: [w('sister'), w('brother'), w('i-love-you')],
          newWordIds: [w('sister'), w('brother'), w('i-love-you')],
          reviewWordIds: [w('mom'), w('dad'), w('grandma'), w('grandpa')],
          scriptId: sc(3),
          segments: [
            warmup({
              anchorWordIds: [w('grandma')],
              greetingLines: [
                { text: 'Look at your picture! Who is this?', zh: '衔接锚点：拿出昨天她画的全家福，指着问' },
                { text: 'Yes, grandma! You remember!', zh: '她答对（或你替她说）都鼓掌：你记得真清楚！' },
              ],
            }),
            words(
              [w('sister'), w('brother'), w('i-love-you')],
              [
                game('listen-pick', [w('sister'), w('brother'), w('baby'), w('mom')], 3),
                game('tpr-command', [w('i-love-you'), w('sister'), w('brother')], 1, {
                  title: { en: 'Love Show', zh: '听到 I love you 就比心送飞吻' },
                }),
              ],
              [w('sister'), w('brother'), w('i-love-you')],
            ),
            song(s('finger-family'), '这次五根手指全唱：唱到 baby finger 用最小声'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Family Role Play', zh: '过家家：我当一家人' },
              steps: [
                { text: 'I am dad! Hello!', zh: '玩偶排排坐当家人，你拿起一个说 I am dad，也让她拿一个' },
                { text: 'I love you, dad!', zh: '玩偶之间抱抱说 I love you，她学就大声夸' },
              ],
              parentGuideZh: '玩偶排排坐当"一家人"，轮流扮演：她拿哪个就当哪个，你说 Hello, sister! 她用玩偶回应。最后全家玩偶抱在一起喊 I love you! 独生子女家庭可让她扮演哥哥姐姐，图个乐。',
            }),
            wrapup([w('sister'), w('brother'), w('i-love-you')], st(3), {
              goodbyeLines: [
                { text: 'Give me a big hug! I love you!', zh: '张开手臂要一个大大的拥抱，说 I love you! 明天是复习日+做相框！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u1-d4',
          unitId: 'l2-u1',
          day: 4,
          title: { en: 'My Family Review Day', zh: '我的家复习日（不教新词）' },
          estimatedMinutes: 15,
          mustWinWords: [w('mom'), w('dad'), w('i-love-you')],
          newWordIds: [],
          reviewWordIds: [
            w('mom'), w('dad'), w('baby'), w('grandma'), w('grandpa'),
            w('sister'), w('brother'), w('this-is-my'), w('i-love-you'),
          ],
          scriptId: sc(4),
          segments: [
            warmup({
              anchorWordIds: [w('i-love-you')],
              greetingLines: [
                { text: 'This is my mom, this is my dad!', zh: '衔接锚点：指着全家福快速说，让她跟着指' },
                { text: 'Today we play family games!', zh: '宣布：今天全是游戏，没有新任务！' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('mom'), w('dad'), w('baby'), w('grandma'),
                  w('grandpa'), w('sister'), w('brother'), w('this-is-my'),
                ], 8),
                game('match-pairs', [w('mom'), w('dad'), w('baby'), w('grandma'), w('grandpa'), w('sister')], 1),
                game('read-aloud-gate', [w('mom'), w('dad'), w('i-love-you')], 3),
              ],
              [w('mom'), w('dad'), w('i-love-you')],
              { reviewWordIds: [w('mom'), w('dad'), w('grandma'), w('grandpa'), w('sister'), w('brother')] },
            ),
            song(s('family-song'), '本单元歌串烧：family-song + finger-family 各唱一遍'),
            handsOn({
              kind: 'craft',
              title: { en: 'Family Photo Frame', zh: '手工：全家福小相框' },
              steps: [
                { text: 'This is my family!', zh: '用硬纸板做相框，贴上她的全家福画（或打印的照片）' },
                { text: 'I love you, family!', zh: '相框边贴星星贴纸，贴一颗说一次 I love you' },
              ],
              parentGuideZh: '硬纸板剪个方框，让她把 Day2 画的全家福贴进去，边框随她贴贴纸装饰。做好摆在客厅，指着说 This is my family! 成就感拉满。',
            }),
            wrapup([w('mom'), w('dad'), w('i-love-you'), w('this-is-my')], st(4), {
              goodbyeLines: [
                { text: 'Family week champion! High five!', zh: '击掌！夸她：这个星期认识了全家人！明天有神秘玩具箱！' },
              ],
            }),
          ],
        },
      ],
    },

    /* ═══════ U2 My Toys ═══════ */
    {
      id: 'l2-u2',
      levelId: 'L2',
      order: 2,
      title: { en: 'My Toys', zh: '我的玩具' },
      emoji: '🧸',
      weekTheme: 'toys',
      lessons: [
        {
          id: 'l2-u2-d1',
          unitId: 'l2-u2',
          day: 5,
          title: { en: 'Ball, Car and Teddy', zh: '球 小车和泰迪熊' },
          estimatedMinutes: 15,
          mustWinWords: [w('ball'), w('toy-car'), w('teddy-bear')],
          newWordIds: [w('ball'), w('toy-car'), w('doll'), w('teddy-bear')],
          reviewWordIds: [w('this-is-my'), w('i-love-you')],
          scriptId: sc(5),
          segments: [
            warmup({
              anchorWordIds: [w('this-is-my')],
              greetingLines: [
                { text: 'Look! A mystery box!', zh: '衔接锚点：拿一个纸箱神秘地摇一摇，里面装着今天的玩具' },
                { text: 'This is my... teddy bear!', zh: '掏出一个说一个，用上周句型 This is my… 自然衔接' },
              ],
            }),
            words(
              [w('ball'), w('toy-car'), w('doll'), w('teddy-bear')],
              [
                game('listen-pick', [w('ball'), w('toy-car'), w('doll'), w('teddy-bear')], 3),
                game('tpr-command', [w('ball'), w('toy-car'), w('teddy-bear')], 1, {
                  title: { en: 'Toys Come Alive', zh: '玩具变变变：拍球/开车/抱熊动作' },
                }),
              ],
              [w('ball'), w('teddy-bear')],
            ),
            song(s('teddy-bear'), '抱着泰迪熊站起来，跟着做转圈摸地动作'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Goodnight, Toys!', zh: '玩具排排睡' },
              steps: [
                { text: 'Goodnight, ball!', zh: '把玩具一个个放上小床/沙发，你说 Goodnight, ball' },
                { text: 'Goodnight, teddy bear!', zh: '轮到她放，她放一个你说一个的名字' },
              ],
              parentGuideZh: '睡前玩法：玩具排排"睡觉"，每放一个说 Goodnight, + 玩具名。她盖被子时你配音 I love you, teddy! 自然复用 U1 句型。',
            }),
            wrapup([w('ball'), w('toy-car'), w('teddy-bear')], st(5), {
              goodbyeLines: [
                { text: 'Toys are sleeping. Shhh! Bye!', zh: '嘘——玩具睡着了，轻声说再见。明天搭积木放风筝！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u2-d2',
          unitId: 'l2-u2',
          day: 6,
          title: { en: 'Blocks and Kite', zh: '积木和风筝' },
          estimatedMinutes: 15,
          mustWinWords: [w('blocks'), w('kite'), w('where-is')],
          newWordIds: [w('blocks'), w('kite'), w('robot'), w('where-is')],
          reviewWordIds: [w('ball'), w('toy-car'), w('doll'), w('teddy-bear')],
          scriptId: sc(6),
          segments: [
            warmup({
              anchorWordIds: [w('teddy-bear')],
              greetingLines: [
                { text: 'Where is teddy? Where is teddy?', zh: '衔接锚点：把昨天的泰迪藏起来，摊手问 Where is teddy?' },
                { text: 'You found it! Hooray!', zh: '她找到就欢呼击掌：You found it!' },
              ],
            }),
            words(
              [w('blocks'), w('kite'), w('robot'), w('where-is')],
              [
                game('listen-pick', [w('blocks'), w('kite'), w('robot'), w('ball')], 3),
                game('tpr-command', [w('blocks'), w('kite'), w('robot')], 1, {
                  title: { en: 'Build and Fly', zh: '搭积木动作→放风筝动作→机器人走路' },
                }),
              ],
              [w('blocks'), w('kite')],
            ),
            song(s('teddy-bear'), '快版！转圈摸地越做越快，她会笑出声'),
            handsOn({
              kind: 'craft',
              title: { en: 'Block Tower', zh: '积木高高塔' },
              steps: [
                { text: 'Blocks! One, two, three!', zh: '一起搭积木塔，每放一块数一个数（不要求她说）' },
                { text: 'Boom! Falling down!', zh: '搭好喊 Boom! 一起推倒——这是最好玩的部分' },
              ],
              parentGuideZh: '搭积木塔再推倒，重复几轮她都不腻。每放一块说 blocks / one two three。没有积木就用纸巾盒、小纸杯叠高。推倒时夸张大叫 Falling down!',
            }),
            wrapup([w('blocks'), w('kite'), w('where-is')], st(6), {
              goodbyeLines: [
                { text: 'Bye-bye, blocks! Tomorrow: hide and seek!', zh: '跟积木塔挥挥手说再见。预告：明天玩藏猫猫学 in on under！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u2-d3',
          unitId: 'l2-u2',
          day: 7,
          title: { en: 'In, On, Under + -at Family', zh: '方位词 + 拼读 -at' },
          estimatedMinutes: 15,
          mustWinWords: [w('in'), w('on'), w('under')],
          newWordIds: [w('in'), w('on'), w('under'), w('cat'), w('hat')],
          reviewWordIds: [w('where-is'), w('ball'), w('toy-car'), w('teddy-bear')],
          scriptId: sc(7),
          segments: [
            warmup({
              anchorWordIds: [w('where-is')],
              greetingLines: [
                { text: 'Where is the ball? Hmm...', zh: '衔接锚点：把球藏在盒子"里面"，问 Where is the ball?' },
                { text: 'In the box! Yes!', zh: '她找到就指着说 In the box! 夸张地惊喜' },
              ],
            }),
            words(
              [w('in'), w('on'), w('under'), w('cat'), w('hat')],
              [
                game('tpr-command', [w('in'), w('on'), w('under')], 1, {
                  title: { en: 'Put It Here!', zh: '听指令把玩具放盒子里/上面/下面' },
                }),
                game('listen-pick', [w('in'), w('on'), w('under'), w('cat')], 3),
              ],
              [w('cat'), w('hat'), w('sat'), w('mat')],
            ),
            song(s('phonics-chant'), '拼读谣只念 -at 两句：c-a-t cat! h-a-t hat! 每个字母拍一下手'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Toy Hide and Seek', zh: '玩具藏猫猫（方位词版）' },
              steps: [
                { text: 'Where is teddy? Under the pillow!', zh: '你藏玩具，给出提示 Under the pillow! 她去找' },
                { text: 'Your turn! Hide the ball!', zh: '换她藏，你找的时候一直问 Where is the ball? 找到喊 In! On! Under!' },
              ],
              parentGuideZh: '藏猫猫升级：把玩具藏在盒子里(in)、椅子上(on)、垫子下(under)，每找到一次就大声说方位词。然后换她藏你找——你故意找错地方（找枕头下），她笑着纠正时输出最自然。',
            }),
            wrapup([w('in'), w('on'), w('under'), w('cat')], st(7), {
              goodbyeLines: [
                { text: 'You found everything! Super!', zh: '摸摸头夸她。明天玩具复习日，全是游戏！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u2-d4',
          unitId: 'l2-u2',
          day: 8,
          title: { en: 'Toys Review Day', zh: '玩具复习日（不教新词）' },
          estimatedMinutes: 15,
          mustWinWords: [w('teddy-bear'), w('where-is'), w('in')],
          newWordIds: [],
          reviewWordIds: [
            w('ball'), w('toy-car'), w('doll'), w('teddy-bear'), w('blocks'),
            w('kite'), w('robot'), w('where-is'), w('in'), w('on'), w('under'),
            w('cat'), w('hat'),
          ],
          scriptId: sc(8),
          segments: [
            warmup({
              anchorWordIds: [w('in')],
              greetingLines: [
                { text: 'Where is teddy? Is teddy in the box?', zh: '衔接锚点：拿昨天的盒子，泰迪藏里面，让她猜猜找找' },
                { text: 'In! Yes, teddy is in the box!', zh: '找到就一起喊 In! 复习昨天的方位词' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('ball'), w('toy-car'), w('doll'), w('teddy-bear'),
                  w('blocks'), w('kite'), w('robot'), w('where-is'),
                ], 8),
                game('match-pairs', [w('ball'), w('toy-car'), w('doll'), w('teddy-bear'), w('blocks'), w('kite')], 1),
                game('read-aloud-gate', [w('cat'), w('hat'), w('sat'), w('mat')], 4),
              ],
              [w('teddy-bear'), w('where-is'), w('in')],
              { reviewWordIds: [w('ball'), w('toy-car'), w('doll'), w('teddy-bear'), w('in'), w('on')] },
            ),
            song(s('teddy-bear'), '本周歌串烧：Teddy Bear 全家一起唱跳'),
            handsOn({
              kind: 'worksheet',
              title: { en: 'Toys Go Home', zh: '玩具回家分类游戏' },
              steps: [
                { text: 'Where is the ball? Ball goes here!', zh: '准备两三个篮子，你发指令 Ball goes here，她把玩具送回"家"' },
                { text: 'Robot, go home! Good job!', zh: '每收对一个就欢呼，最后一起数收了几个（只数不要求）' },
              ],
              parentGuideZh: '收拾玩具变成游戏：篮子上可以贴张玩具照片当标记，你喊 Where is the doll? → Doll goes home! 她送回一个夸一个。顺便复习全部玩具词+in/on/under。',
            }),
            wrapup([w('teddy-bear'), w('where-is'), w('in')], st(8), {
              goodbyeLines: [
                { text: 'All toys are home! Bye-bye!', zh: '跟玩具篮挥手说再见。预告：明天我们去公园玩！' },
              ],
            }),
          ],
        },
      ],
    },

    /* ═══════ U3 In the Park ═══════ */
    {
      id: 'l2-u3',
      levelId: 'L2',
      order: 3,
      title: { en: 'In the Park', zh: '在公园里' },
      emoji: '🌳',
      weekTheme: 'park',
      lessons: [
        {
          id: 'l2-u3-d1',
          unitId: 'l2-u3',
          day: 9,
          title: { en: 'Tree, Flower, Bird', zh: '大树小花和小鸟' },
          estimatedMinutes: 15,
          mustWinWords: [w('tree'), w('flower'), w('bird')],
          newWordIds: [w('tree'), w('flower'), w('grass'), w('sun'), w('bird')],
          reviewWordIds: [w('kite'), w('ball')],
          scriptId: sc(9),
          segments: [
            warmup({
              anchorWordIds: [w('kite')],
              greetingLines: [
                { text: "Let's fly a kite! Where do we go?", zh: '衔接锚点：拿出上周的风筝（或图片），做放风筝动作' },
                { text: 'To the park! I can see a tree!', zh: '宣布：今天去公园！手搭凉棚往远处看' },
              ],
            }),
            words(
              [w('tree'), w('flower'), w('grass'), w('sun'), w('bird')],
              [
                game('listen-pick', [w('tree'), w('flower'), w('bird'), w('sun')], 3),
                game('tpr-command', [w('tree'), w('flower'), w('bird')], 1, {
                  title: { en: 'Grow Grow Grow', zh: '种子发芽→长成大树的全身动作' },
                }),
              ],
              [w('tree'), w('bird')],
            ),
            song(s('twinkle'), '慢速摇摆唱，手指做星星一闪一闪'),
            handsOn({
              kind: 'coloring',
              title: { en: 'Hello, Sun!', zh: '涂一个大太阳' },
              steps: [
                { text: 'Color the sun yellow!', zh: '打印太阳线稿，你说颜色她涂（涂出界也夸）' },
                { text: 'The sun is big and yellow!', zh: '涂完举起来贴在窗边，一起说 The sun!' },
              ],
              printableSvgKey: 'coloring-sun',
              parentGuideZh: '打印太阳涂色页涂黄色。天气好就真去楼下公园走一圈：指真树说 tree，指真花说 flower——网站课只是开胃菜，户外才是正餐。',
            }),
            wrapup([w('tree'), w('flower'), w('bird')], st(9), {
              goodbyeLines: [
                { text: 'Bye-bye, little bird!', zh: '跟窗外（或画上的）小鸟挥手。明天公园里找大鱼和小蝴蝶！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u3-d2',
          unitId: 'l2-u3',
          day: 10,
          title: { en: 'I Can See! Big and Small', zh: '我能看见！大和小' },
          estimatedMinutes: 15,
          mustWinWords: [w('i-can-see'), w('big'), w('small')],
          newWordIds: [w('fish'), w('butterfly'), w('i-can-see'), w('big'), w('small')],
          reviewWordIds: [w('tree'), w('flower'), w('bird'), w('sun')],
          scriptId: sc(10),
          segments: [
            warmup({
              anchorWordIds: [w('bird')],
              greetingLines: [
                { text: 'Look! A bird! Can you see it?', zh: '衔接锚点：手搭凉棚四处看，昨天的小鸟今天还在吗？' },
                { text: 'I can see a bird!', zh: '看到（或假装看到）就说 I can see a bird! 带她说一遍' },
              ],
            }),
            words(
              [w('fish'), w('butterfly'), w('i-can-see'), w('big'), w('small')],
              [
                game('listen-pick', [w('fish'), w('butterfly'), w('bird'), w('big')], 3),
                game('tpr-command', [w('big'), w('small'), w('butterfly')], 1, {
                  title: { en: 'Big and Small Show', zh: '喊 big 张开全身，喊 small 缩成一小团' },
                }),
              ],
              [w('big'), w('small')],
            ),
            song(s('twinkle'), '唱到 like a diamond 双手比大大的钻石，再比小小的'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Park Walk: I Spy!', zh: '公园散步 I spy 游戏' },
              steps: [
                { text: 'I spy something big!', zh: '户外或窗边：你说 I spy something big（大树/汽车），让她找' },
                { text: 'I can see a small flower!', zh: '她找到就带她说 I can see…，说中文也行，你英文复述' },
              ],
              parentGuideZh: '去公园（或小区/阳台）玩 I spy：轮流说 I spy something big/small/green，对方找。她指对了就一起说 I can see a big tree! 找不到时你指给她看，保持零挫败。',
            }),
            wrapup([w('i-can-see'), w('big'), w('small')], st(10), {
              goodbyeLines: [
                { text: 'I can see a super kid! Bye!', zh: '指指她的眼睛再指指她：我看见一个超级棒的宝宝！明天认识小狗和青蛙！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u3-d3',
          unitId: 'l2-u3',
          day: 11,
          title: { en: 'Dog and Frog: -og Family', zh: '小狗青蛙：拼读 -og' },
          estimatedMinutes: 15,
          mustWinWords: [w('dog'), w('frog'), w('jog')],
          newWordIds: [w('dog'), w('log'), w('frog'), w('jog')],
          reviewWordIds: [w('tree'), w('flower'), w('bird'), w('fish'), w('big'), w('small')],
          scriptId: sc(11),
          segments: [
            warmup({
              anchorWordIds: [w('i-can-see')],
              greetingLines: [
                { text: 'I can see... something in the park!', zh: '衔接锚点：手搭凉棚看，学一声狗叫 Woof! 让她猜' },
                { text: 'A dog! I can see a dog!', zh: '揭晓答案：是小狗！一起说 I can see a dog!' },
              ],
            }),
            words(
              [w('dog'), w('log'), w('frog'), w('jog')],
              [
                game('listen-pick', [w('dog'), w('frog'), w('log'), w('jog')], 3),
                game('tpr-command', [w('dog'), w('frog'), w('jog')], 1, {
                  title: { en: 'Animal Actions', zh: '汪汪叫→青蛙跳→原地慢跑' },
                }),
              ],
              [w('dog'), w('log'), w('frog'), w('jog')],
            ),
            song(s('phonics-chant'), '拼读谣念 -og 两句：d-o-g dog! f-r-o-g frog! 拍手打节奏'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Frog Jump Race', zh: '青蛙跳荷叶比赛' },
              steps: [
                { text: 'Frog! Jump! Jump!', zh: '靠垫/纸片当荷叶摆地上，你们学青蛙从一片跳到一片' },
                { text: 'Jog to the tree! Stop!', zh: '加入指令：jog 慢跑过去，喊 Stop 立刻定住' },
              ],
              parentGuideZh: '客厅摆几个靠垫当"荷叶"，一起蹲着学青蛙跳，边跳边喊 frog! jump! 跳累了改成 jog 慢跑到"大树"（沙发）旁。安全第一，防滑袜或光脚在垫子上玩。',
            }),
            wrapup([w('dog'), w('frog'), w('jog')], st(11), {
              goodbyeLines: [
                { text: 'Ribbit ribbit! Bye-bye!', zh: '学青蛙叫两声说再见。明天公园复习日，去"造"一个小公园！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u3-d4',
          unitId: 'l2-u3',
          day: 12,
          title: { en: 'Park Review Day', zh: '公园复习日（不教新词）' },
          estimatedMinutes: 15,
          mustWinWords: [w('tree'), w('bird'), w('i-can-see')],
          newWordIds: [],
          reviewWordIds: [
            w('tree'), w('flower'), w('grass'), w('sun'), w('bird'), w('fish'),
            w('butterfly'), w('i-can-see'), w('big'), w('small'),
            w('dog'), w('log'), w('frog'), w('jog'),
          ],
          scriptId: sc(12),
          segments: [
            warmup({
              anchorWordIds: [w('frog')],
              greetingLines: [
                { text: 'Who is jumping? A frog!', zh: '衔接锚点：你先学青蛙跳一下，让她猜是谁' },
                { text: "Today let's build a park!", zh: '宣布：今天我们一起"造"一个公园！全是游戏！' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('tree'), w('flower'), w('bird'), w('fish'),
                  w('sun'), w('butterfly'), w('dog'), w('frog'),
                ], 8),
                game('match-pairs', [w('tree'), w('flower'), w('bird'), w('fish'), w('sun'), w('butterfly')], 1),
                game('read-aloud-gate', [w('tree'), w('flower'), w('bird')], 3),
              ],
              [w('tree'), w('bird'), w('i-can-see')],
              { reviewWordIds: [w('tree'), w('flower'), w('bird'), w('fish'), w('big'), w('small')] },
            ),
            song(s('twinkle'), '本周歌串烧：Twinkle + 拼读谣 -og 两句，唱跳一遍'),
            handsOn({
              kind: 'craft',
              title: { en: 'Build Our Park', zh: '手工：造一个小公园' },
              steps: [
                { text: 'A big tree! A small flower!', zh: '白纸当草地：撕绿纸贴小草，画大树，捡真树叶花瓣贴上去' },
                { text: 'I can see a bird!', zh: '公园里贴上小鸟小鱼蝴蝶（画的或贴纸），贴一个说一个' },
              ],
              parentGuideZh: '一起用大白纸"造公园"：撕彩纸、捡落叶、用贴纸，把她认识的 tree/flower/bird/fish/butterfly 都放进去。边贴边说 I can see a…。做完贴墙上，这就是她的公园地图。',
            }),
            wrapup([w('tree'), w('bird'), w('i-can-see')], st(12), {
              goodbyeLines: [
                { text: 'What a beautiful park! Bye!', zh: '欣赏她的公园作品。预告：明天坐上公交车出发！Beep beep!' },
              ],
            }),
          ],
        },
      ],
    },

    /* ═══════ U4 Let's Move ═══════ */
    {
      id: 'l2-u4',
      levelId: 'L2',
      order: 4,
      title: { en: "Let's Move!", zh: '出发吧！交通工具' },
      emoji: '🚌',
      weekTheme: 'vehicles',
      lessons: [
        {
          id: 'l2-u4-d1',
          unitId: 'l2-u4',
          day: 13,
          title: { en: 'Bus, Bike and Train', zh: '公交车 自行车 火车' },
          estimatedMinutes: 15,
          mustWinWords: [w('bus'), w('bike'), w('train')],
          newWordIds: [w('bus'), w('bike'), w('train')],
          reviewWordIds: [w('big'), w('small'), w('i-can-see')],
          scriptId: sc(13),
          segments: [
            warmup({
              anchorWordIds: [w('big')],
              greetingLines: [
                { text: 'I can see a big bus!', zh: '衔接锚点：双手转大方向盘，用上周句型 I can see… 开场' },
                { text: 'Beep beep! Let us ride!', zh: '按喇叭！今天我们一起"坐"大公交车！' },
              ],
            }),
            words(
              [w('bus'), w('bike'), w('train')],
              [
                game('listen-pick', [w('bus'), w('bike'), w('train')], 3),
                game('tpr-command', [w('bus'), w('bike'), w('train')], 1, {
                  title: { en: 'Drive Your Vehicle', zh: '转方向盘/蹬腿骑车/手臂转圈开火车' },
                }),
              ],
              [w('bus'), w('train')],
            ),
            song(s('wheels-on-bus'), '站起来全身动：手臂绕圈当轮子，按喇叭，刷雨刷'),
            handsOn({
              kind: 'craft',
              title: { en: 'Box Bus', zh: '手工：纸箱小巴士' },
              steps: [
                { text: 'This is my bus!', zh: '纸巾盒/快递盒当车身，贴上瓶盖做轮子，画出窗户' },
                { text: 'Beep beep! Get on the bus!', zh: '做好让她"开"着满屋跑，你喊 Get on! 假装上车' },
              ],
              parentGuideZh: '用家里的小纸盒做一辆巴士：瓶盖当轮子、彩纸当窗户，随她装饰。做好后她开车你当乘客，喊 bus! beep beep! 一路复习。',
            }),
            wrapup([w('bus'), w('bike'), w('train')], st(13), {
              goodbyeLines: [
                { text: 'The bus goes home. Bye-bye!', zh: '把纸巴士"开"回盒子车库。明天学飞机和小船！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u4-d2',
          unitId: 'l2-u4',
          day: 14,
          title: { en: 'Plane and Boat', zh: '飞机和小船' },
          estimatedMinutes: 15,
          mustWinWords: [w('plane'), w('boat'), w('lets-go')],
          newWordIds: [w('plane'), w('boat'), w('lets-go')],
          reviewWordIds: [w('bus'), w('bike'), w('train')],
          scriptId: sc(14),
          segments: [
            warmup({
              anchorWordIds: [w('train')],
              greetingLines: [
                { text: 'Choo choo! The train is here!', zh: '衔接锚点：手臂转圈开火车进场，接上昨天的火车' },
                { text: "Let's go! To the sky! To the sea!", zh: '宣布：今天火车变飞机、变小船，一起喊 Let’s go!' },
              ],
            }),
            words(
              [w('plane'), w('boat'), w('lets-go')],
              [
                game('listen-pick', [w('plane'), w('boat'), w('bus'), w('train')], 3),
                game('tpr-command', [w('plane'), w('boat'), w('lets-go')], 1, {
                  title: { en: 'Fly and Row', zh: '张开双臂飞→坐着划船→握拳喊出发' },
                }),
              ],
              [w('plane'), w('boat')],
            ),
            song(s('row-row'), '面对面坐着手拉手，前后摇摆当划船'),
            handsOn({
              kind: 'craft',
              title: { en: 'Paper Plane', zh: '手工：折纸飞机' },
              steps: [
                { text: 'This is a plane!', zh: '你折纸飞机，折的时候说 plane，让她在机翼上画画装饰' },
                { text: "Let's go! Fly, plane, fly!", zh: '一起喊 Let’s go! 用力掷出去，捡回来再飞' },
              ],
              parentGuideZh: '折一架纸飞机让她装饰机翼，然后比赛谁飞得远。每次掷出去前必须一起喊暗号 Let’s go!（喊完才准扔——这就是最好的句型练习）。',
            }),
            wrapup([w('plane'), w('boat'), w('lets-go')], st(14), {
              goodbyeLines: [
                { text: 'The plane is landing. Bye!', zh: '纸飞机慢慢"降落"到桌上。明天学快快和慢慢，还有小猪！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u4-d3',
          unitId: 'l2-u4',
          day: 15,
          title: { en: 'Fast and Slow + -ig Family', zh: '快快慢慢 + 拼读 -ig' },
          estimatedMinutes: 15,
          mustWinWords: [w('fast'), w('slow'), w('pig')],
          newWordIds: [w('fast'), w('slow'), w('pig'), w('dig'), w('wig')],
          reviewWordIds: [w('bus'), w('bike'), w('train'), w('plane'), w('boat'), w('big')],
          scriptId: sc(15),
          segments: [
            warmup({
              anchorWordIds: [w('plane')],
              greetingLines: [
                { text: 'The plane goes fast! Whoosh!', zh: '衔接锚点：双臂张开飞快地"飞"过客厅' },
                { text: 'The boat goes slow... slow...', zh: '再慢动作划船，快慢对比她一定会笑' },
              ],
            }),
            words(
              [w('fast'), w('slow'), w('pig'), w('dig'), w('wig')],
              [
                game('tpr-command', [w('fast'), w('slow'), w('pig')], 1, {
                  title: { en: 'Fast Slow Freeze', zh: '喊 fast 快跑，喊 slow 慢动作，喊 pig 学猪叫' },
                }),
                game('listen-pick', [w('fast'), w('slow'), w('pig'), w('dig')], 3),
              ],
              [w('pig'), w('big'), w('dig'), w('wig')],
            ),
            song(s('phonics-chant'), '拼读谣念 -ig 两句：p-i-g pig! b-i-g big! 拍手打节奏'),
            handsOn({
              kind: 'pretend-play',
              title: { en: 'Vehicle Parade', zh: '交通工具快慢游行' },
              steps: [
                { text: 'Fast bus! Beep beep!', zh: '拿着纸巴士/纸飞机游行：你喊 Fast plane! 她飞快跑' },
                { text: 'Slow boat... row... row...', zh: '喊 Slow boat! 她慢动作划，快慢随意切换越乱越好笑' },
              ],
              parentGuideZh: '开着这几天做的手工车绕行客厅"游行"：你当指挥喊 Fast train! / Slow bike! / Stop! 她照做。加入 -ig 词：The pig digs!（小猪挖土）演出来，笑成一团就赢了。',
            }),
            wrapup([w('fast'), w('slow'), w('pig')], st(15), {
              goodbyeLines: [
                { text: 'Fast hug! Slow hug! Bye!', zh: '先来一个飞快抱抱，再来一个超慢抱抱，说再见。明天月亮班大复习！' },
              ],
            }),
          ],
        },
        {
          id: 'l2-u4-d4',
          unitId: 'l2-u4',
          day: 16,
          title: { en: 'Moon Class Review Day', zh: '出发复习日（不教新词）' },
          estimatedMinutes: 15,
          mustWinWords: [w('bus'), w('plane'), w('lets-go')],
          newWordIds: [],
          reviewWordIds: [
            w('bus'), w('bike'), w('train'), w('plane'), w('boat'),
            w('lets-go'), w('fast'), w('slow'), w('pig'), w('dig'), w('wig'),
          ],
          scriptId: sc(16),
          segments: [
            warmup({
              anchorWordIds: [w('lets-go')],
              greetingLines: [
                { text: "Let's go! Where do we go?", zh: '衔接锚点：握拳喊 Let’s go! 问她今天坐什么出发' },
                { text: 'By bus? By plane? You choose!', zh: '让她选交通工具（说中文也行），选了就一起演' },
              ],
            }),
            words(
              [],
              [
                game('mole', [
                  w('bus'), w('bike'), w('train'), w('plane'),
                  w('boat'), w('lets-go'), w('fast'), w('slow'),
                ], 8),
                game('match-pairs', [w('bus'), w('bike'), w('train'), w('plane'), w('boat'), w('pig')], 1),
                game('read-aloud-gate', [w('pig'), w('big'), w('dig'), w('wig')], 4),
              ],
              [w('bus'), w('plane'), w('lets-go')],
              { reviewWordIds: [w('bus'), w('bike'), w('train'), w('plane'), w('boat'), w('fast')] },
            ),
            song(s('wheels-on-bus'), '毕业歌串烧：Wheels on the Bus + Row Row 各唱一遍'),
            handsOn({
              kind: 'craft',
              title: { en: 'Moon Class Star Card', zh: '手工：月亮班毕业纪念卡' },
              steps: [
                { text: 'Stars for my card!', zh: '硬纸做纪念卡，让她贴满星星贴纸，画上最爱的交通工具' },
                { text: 'I did it!', zh: '举起来合影！说 I did it!' },
              ],
              printableSvgKey: 'coloring-star',
              parentGuideZh: '做一张"月亮班毕业卡"：她贴星星、画 bus/plane，你帮她写上日期。晚上全家面前展示：她举卡片，你问 Where is the plane? 她指给你看——这就是她的小小毕业礼。',
            }),
            wrapup([w('bus'), w('plane'), w('lets-go'), w('fast')], st(16), {
              goodbyeLines: [
                {
                  text: 'You are a Moon Class superstar! I love you!',
                  zh: '最长的一次总结：中文+英文数给她听"你学会了 mom, dad, teddy, bus, plane…"。大大的拥抱、击掌、亲额头，说 I love you! 月亮班毕业啦！',
                },
              ],
            }),
          ],
        },
      ],
    },
  ],
}
