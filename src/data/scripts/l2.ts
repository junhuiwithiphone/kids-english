import type { LessonScript } from '../schema'

/* ═══════════════════════════════════════════════════════════
   L2 家长教案脚本 — 月亮班 16 天
   U1 My Family / U2 My Toys / U3 In the Park / U4 Let's Move
   用途：家长中心「今日任务 / 教案脚本」页签展示，
   指导线下 60 分钟完整课（网站课=其中 15 分钟屏幕部分）
   教具全部用家里常见物替代，零购买门槛
   ═══════════════════════════════════════════════════════════ */

const SEC = {
  warm: { name: 'Warm-up 问候', minutes: '0–5分钟' },
  input: { name: '新词输入 + TPR游戏', minutes: '5–20分钟' },
  song: { name: '儿歌唱跳', minutes: '20–35分钟' },
  hands: { name: '动手活动', minutes: '35–50分钟' },
  wrap: { name: '总结奖励', minutes: '50–60分钟' },
}

export const l2Scripts: LessonScript[] = [
  /* ── U1 My Family ── */
  {
    id: 'l2-sc-d1', lessonId: 'l2-u1-d1', day: 1, titleZh: '妈妈爸爸和我（This is my...）',
    materialsZh: ['全家福照片（手机相册也行）', '她的玩偶', '贴纸奖励'],
    sections: [
      { ...SEC.warm, content: '抱抱宝宝说 "Hello, my little star! You are big now!"（欢迎升级月亮班）。拿出全家福照片神秘地说 "Look! A family photo!" 让她自己凑过来看。' },
      { ...SEC.input, content: '只教4个：mom, dad, baby + This is my…。你指着照片里的妈妈说 "Mom! This is my mom." 再指真人妈妈。玩"抱抱指令"：你喊 mom 她去抱妈妈，喊 dad 她去抱爸爸（家里谁在场就抱谁）。不做跟读要求，她说中文你英文复述即可。' },
      { ...SEC.song, content: 'My Family Song（自编 chant）：拿着照片唱，唱到谁指谁。唱到 I love you 一起比心送飞吻。' },
      { ...SEC.hands, content: '全家福小讲解：你说 This is my… 停下来，让她指照片里对应的人。她指对就夸张鼓掌；指错你就说 "Oh! This is dad!" 笑着再看一遍，不纠错。' },
      { ...SEC.wrap, content: '抱抱她说 "I love you! See you tomorrow!" 预告：明天我们认识奶奶爷爷（外婆外公）！贴纸 l2-st-01 贴在她手背。' },
    ],
  },
  {
    id: 'l2-sc-d2', lessonId: 'l2-u1-d2', day: 2, titleZh: '奶奶爷爷 + Finger Family',
    materialsZh: ['昨天的全家福（衔接锚点）', '白纸和蜡笔', '打印的小人涂色页'],
    sections: [
      { ...SEC.warm, content: '拿出昨天的全家福问 "Where is mom?" 让她指（衔接锚点）。指对就一起说 "Yes! This is my mom!"' },
      { ...SEC.input, content: '新词只加2个：grandma, grandpa。学动作记忆：弯腰拄拐当 grandma，摸长胡子当 grandpa。玩"全家造型秀"：你喊谁她摆谁的姿势（mom 飞吻 / dad 秀肌肉 / baby 装哭），摆错也一起笑。有老人照片就指照片，没有就用玩偶代替。' },
      { ...SEC.song, content: 'Finger Family：一根手指一个家人。大拇指 daddy、食指 mommy、小指 baby，边唱边摇手指，她会盯着你的手看。' },
      { ...SEC.hands, content: '画全家福：给她白纸蜡笔，你说 "Draw mom! Draw dad!" 画成什么样都像。指着她的画问 "Is this grandma?" 说是就欢呼。也可打印小人涂色页涂色，涂完说 "This is me!"' },
      { ...SEC.wrap, content: '把她的画贴在墙上，郑重宣布：这是我们家的画！说 "You drew your family! Amazing!" 贴纸 l2-st-02。' },
    ],
  },
  {
    id: 'l2-sc-d3', lessonId: 'l2-u1-d3', day: 3, titleZh: '姐妹兄弟 + I love you',
    materialsZh: ['昨天画的全家福（衔接锚点）', '玩偶若干（过家家用）', '贴纸奖励'],
    sections: [
      { ...SEC.warm, content: '拿出昨天她画的全家福，指着问 "Who is this?" 她答（或你替她答）都鼓掌："Yes, grandma! You remember!"（衔接锚点：她的画就是最好的复习卡）' },
      { ...SEC.input, content: '新词3个：sister, brother, I love you。I love you 配动作：双手胸前比心+送飞吻，全家轮流对她说，让她也送出去。玩"爱心传递"：你抱她说 I love you，她再抱下一个家人说（说中文"我爱你"也算成功）。独生子女家庭：sister/brother 用玩偶或表亲照片认识即可，不必较真。' },
      { ...SEC.song, content: 'Finger Family 完整版：五根手指全唱。唱到 baby finger 用最小声，她会学着屏住呼吸小声唱——超可爱。' },
      { ...SEC.hands, content: '过家家：玩偶排排坐当一家人。你拿一个说 "I am dad! Hello!" 让她也拿一个。玩偶之间抱抱说 "I love you"，她用玩偶回应就大声夸。' },
      { ...SEC.wrap, content: '张开手臂要一个大大的拥抱："Give me a big hug! I love you!" 预告：明天是复习日，一起做相框！贴纸 l2-st-03。' },
    ],
  },
  {
    id: 'l2-sc-d4', lessonId: 'l2-u1-d4', day: 4, titleZh: '复习日：全家福相框',
    materialsZh: ['全家福照片', '硬纸板（快递盒拆开）', '她的全家福画', '星星贴纸', '胶棒'],
    sections: [
      { ...SEC.warm, content: '指全家福快速说 "This is my mom, this is my dad!" 让她跟着指。宣布："Today we play family games!"（今天全是游戏，没有新任务，零压力）' },
      { ...SEC.input, content: '不教新词。网站课玩打地鼠+配对+跟读闯关；线下玩"家人点名"：全家（含玩偶）坐一圈，你喊 grandma 她跑去抱住当奶奶的人/玩偶。喊错你被"罚"挠痒痒，她会玩疯。' },
      { ...SEC.song, content: '本周歌串烧：My Family Song + Finger Family 各唱一遍，全家一起摇手指。' },
      { ...SEC.hands, content: '手工相框：硬纸板剪方框，她把 Day2 画的全家福（或打印照片）贴进去，边框贴满星星贴纸。贴一颗你说一次家人名。做好摆客厅，指着说 "This is my family!"' },
      { ...SEC.wrap, content: '击掌："Family week champion! High five!" 用中文+英文数给她听：这周你学会了 mom, dad, grandma, grandpa, sister, brother, baby, I love you！贴纸 l2-st-04。预告：明天有神秘玩具箱！' },
    ],
  },
  /* ── U2 My Toys ── */
  {
    id: 'l2-sc-d5', lessonId: 'l2-u2-d1', day: 5, titleZh: '球 小车 娃娃 泰迪熊',
    materialsZh: ['纸箱（神秘玩具箱）', '球/玩具车/娃娃/泰迪熊（家里现有的）', '小毯子'],
    sections: [
      { ...SEC.warm, content: '拿纸箱摇一摇制造神秘感："Look! A mystery box!" 一个个掏出来，用上周句型衔接："This is my… teddy bear!"（衔接锚点：This is my 句型无缝进入玩具主题）' },
      { ...SEC.input, content: '4个玩具词：ball, car（玩具车）, doll, bear（泰迪熊）。每个配动作：拍球/开车/抱娃娃/抱大熊。玩"玩具变变变"：你喊 ball 她做拍球动作，喊 car 她握方向盘。再把真玩具排一排，你发指令她拿对应的那个。' },
      { ...SEC.song, content: 'Teddy Bear, Teddy Bear：抱着泰迪站起来跟着做——转圈、摸地、跳高、摸鼻子。第二遍加速她会笑出声。' },
      { ...SEC.hands, content: '玩具排排睡：把玩具一个个放上小床/沙发盖好被子，每放一个说 "Goodnight, ball!" 轮到她放，她放一个你配音一个。最后你学泰迪打呼噜，她一定咯咯笑。' },
      { ...SEC.wrap, content: '"Toys are sleeping. Shhh! Bye!" 轻声说再见（仪式感）。预告：明天搭积木放风筝！贴纸 l2-st-05。' },
    ],
  },
  {
    id: 'l2-sc-d6', lessonId: 'l2-u2-d2', day: 6, titleZh: '积木 风筝 机器人 + Where is...?',
    materialsZh: ['昨天的泰迪熊（衔接锚点）', '积木或纸巾盒/纸杯', '毯子或抱枕', '风筝（图片或实物）'],
    sections: [
      { ...SEC.warm, content: '把泰迪藏在毯子下，摊手问 "Where is teddy? Where is teddy?" 让她找（衔接锚点：昨天的玩具今天玩失踪）。找到欢呼："You found it! Hooray!"' },
      { ...SEC.input, content: '新词4个：blocks, kite, robot + Where is…? 句型。Where is 就用手上的玩具反复玩：你藏她找，找到一起喊。robot 配动作：全身僵僵地走机器人步，她会学得惟妙惟肖。' },
      { ...SEC.song, content: 'Teddy Bear 快版：转圈摸地越做越快，最后扑通坐下喘气，笑成一团。' },
      { ...SEC.hands, content: '积木高高塔：一起搭积木（没有积木用纸巾盒/纸杯叠高），每放一块说 "Blocks! One, two, three!" 搭好喊 "Boom! Falling down!" 一起推倒——推倒才是精髓，重复几轮她都不腻。' },
      { ...SEC.wrap, content: '跟积木塔残骸挥手 "Bye-bye, blocks!" 预告：明天玩藏猫猫学 in on under！贴纸 l2-st-06。' },
    ],
  },
  {
    id: 'l2-sc-d7', lessonId: 'l2-u2-d3', day: 7, titleZh: '方位词 in on under + 拼读 -at',
    materialsZh: ['纸箱或收纳篮', '小球/泰迪等玩具', '抱枕', '一顶帽子'],
    sections: [
      { ...SEC.warm, content: '把球藏进纸箱，问 "Where is the ball? Hmm..." 她翻到时你指着说 "In the box! Yes!"（衔接锚点：昨天的 Where is 今天升级成方位词）' },
      { ...SEC.input, content: '方位词3个：in, on, under——全部用手势记：拳头放进另一只手"in"、盖在上面"on"、藏在下面"under"。玩"听指令放玩具"：你说 Put the ball IN the box / ON the chair / UNDER the pillow，她执行，做对夸张鼓掌。拼读预热：拿帽子做戴帽动作说 "h-a-t, hat!" 再指玩具猫说 "c-a-t, cat!"（拍着节拍拼，不要求她拼，听个耳熟）' },
      { ...SEC.song, content: 'Phonics Chant 只念 -at 两句："C-a-t, cat! H-a-t, hat! S-a-t, sat! M-a-t, mat!" 每个字母拍一下手，念到 sat 你们一起扑通坐下。' },
      { ...SEC.hands, content: '玩具藏猫猫：你藏玩具给提示 "Under the pillow!" 她去找；然后换她藏你找——你故意找错地方（翻枕头下找车），她笑着纠正时输出最自然。每找到一次大声说 in / on / under。' },
      { ...SEC.wrap, content: '"You found everything! Super!" 摸摸头夸她。预告：明天玩具复习日，全是游戏！贴纸 l2-st-07。' },
    ],
  },
  {
    id: 'l2-sc-d8', lessonId: 'l2-u2-d4', day: 8, titleZh: '复习日：玩具回家',
    materialsZh: ['纸箱（衔接锚点）', '本周所有玩具', '两三个收纳篮', '玩具照片或手绘标记'],
    sections: [
      { ...SEC.warm, content: '拿昨天的箱子，泰迪藏里面问 "Where is teddy? Is teddy in the box?" 让她猜猜找找，找到一起喊 "In!"（衔接锚点）' },
      { ...SEC.input, content: '不教新词。网站课：打地鼠+图词配对+跟读闯关（-at 词族 cat/hat/sat/mat 拼读关）。线下玩"玩具点名"：玩具排一排，你喊 robot 她拍一下 robot；再升级喊 Where is the kite? 她举起风筝。拼读复习：拍着手拼 c-a-t cat，她能接出 cat 就是大惊喜，接不出你笑着说给她听。' },
      { ...SEC.song, content: 'Teddy Bear 全家一起唱跳一遍，当作玩具周的庆典。' },
      { ...SEC.hands, content: '玩具回家分类：篮子上贴玩具照片当标记，你喊 "Where is the doll? Doll goes home!" 她把娃娃放进对应篮子。每收对一个欢呼一次，顺便把收玩具变成了复习课。' },
      { ...SEC.wrap, content: '"All toys are home! Bye-bye!" 跟玩具篮挥手。预告：明天我们去公园玩！贴纸 l2-st-08。' },
    ],
  },
  /* ── U3 In the Park ── */
  {
    id: 'l2-sc-d9', lessonId: 'l2-u3-d1', day: 9, titleZh: '大树 小花 小鸟（公园初探）',
    materialsZh: ['风筝（衔接锚点，上周的）', '太阳涂色页', '黄蜡笔', '楼下公园或小区绿地'],
    sections: [
      { ...SEC.warm, content: '拿出上周的风筝做放风筝动作："Let\'s fly a kite! Where do we go?" 自答："To the park!" 手搭凉棚往远处看（衔接锚点：风筝自然引入公园场景）' },
      { ...SEC.input, content: '5个自然词：tree, flower, grass, sun, bird。全部配动作：手臂伸直当大树、双手托腮开花、蹲下摸草、头顶比大圆、挥臂学鸟飞。玩"种子长大了"：蹲下当种子→慢慢站起→手臂开花变成大树，你喊 tree! 她做动作。' },
      { ...SEC.song, content: 'Twinkle Twinkle Little Star：慢速摇摆唱，手指一闪一闪。睡前也可以再唱一遍当摇篮曲。' },
      { ...SEC.hands, content: '涂大太阳：打印太阳涂色页涂黄色，涂完贴窗边说 "The sun is big and yellow!" 天气好务必真去公园走一圈：指真树说 tree、指真花说 flower、看到鸟喊 bird——网站课是开胃菜，户外才是正餐。' },
      { ...SEC.wrap, content: '跟窗外（或画上的）小鸟挥手 "Bye-bye, little bird!" 预告：明天公园里找大鱼和小蝴蝶！贴纸 l2-st-09。' },
    ],
  },
  {
    id: 'l2-sc-d10', lessonId: 'l2-u3-d2', day: 10, titleZh: 'I can see... + 大和小',
    materialsZh: ['望远镜道具（纸筒/卷纸芯）', '公园或窗边场景', '大小对比物（大熊小熊/大杯小杯）'],
    sections: [
      { ...SEC.warm, content: '手搭凉棚四处看："Look! A bird! Can you see it?" 看到（或假装看到）就说 "I can see a bird!" 带她说一遍（衔接锚点：昨天的小鸟今天还在）' },
      { ...SEC.input, content: '新词：fish, butterfly + I can see… + big, small。大小用手势记：双臂大大张开 big、拇指食指捏近 small。玩"大小变身"：你喊 big 她张开全身变大巨人，喊 small 缩成一小团；再拿实物对比——大杯子 big cup、小杯子 small cup。I can see 用望远镜道具（卷纸芯）四处看，看到啥说 "I can see a …"（她说中文你英文复述）。' },
      { ...SEC.song, content: 'Twinkle 再唱：唱到 like a diamond 双手比大大的钻石，再来个小小的钻石——顺便复习 big/small。' },
      { ...SEC.hands, content: '公园散步 I spy：去户外（或阳台），轮流说 "I spy something big/small/green"，对方找。她指对了就一起说 "I can see a big tree!" 找不到你指给她看，保持零挫败。' },
      { ...SEC.wrap, content: '指指她的眼睛再指指她："I can see a super kid! Bye!" 预告：明天认识小狗和青蛙！贴纸 l2-st-10。' },
    ],
  },
  {
    id: 'l2-sc-d11', lessonId: 'l2-u3-d3', day: 11, titleZh: '拼读 -og：dog log frog jog',
    materialsZh: ['靠垫或A4纸若干（当荷叶）', '小狗/青蛙玩偶或图片', '防滑袜'],
    sections: [
      { ...SEC.warm, content: '手搭凉棚说 "I can see... something in the park!" 然后学一声狗叫 Woof! 让她猜，揭晓 "A dog! I can see a dog!"（衔接锚点：I can see 句型继续用）' },
      { ...SEC.input, content: '拼读词族 -og：dog, log, frog, jog。拍着节拍拼 "d-o-g, dog!" 每个配动作：汪汪叫/躺平像木头/青蛙跳/原地慢跑。玩"动物动作指令"：你喊 dog 她汪汪、喊 frog 她跳、喊 jog 她慢跑、喊 log 她躺平装木头——log 躺平那下她一定笑翻。拼读目标：她能听你拼出整词即可，不要求她拼。' },
      { ...SEC.song, content: 'Phonics Chant 念 -og 两句："D-o-g, dog! L-o-g, log! F-r-o-g, frog! J-o-g, jog!" 拍手打节奏，越念越快。' },
      { ...SEC.hands, content: '青蛙跳荷叶：靠垫/纸片摆地上当荷叶，你们蹲着学青蛙从一片跳到一片，边跳边喊 "Frog! Jump! Jump!" 跳累了改成 jog 慢跑到"大树"（沙发）旁，喊 Stop 定住。穿防滑袜，注意安全。' },
      { ...SEC.wrap, content: '学青蛙叫两声 "Ribbit ribbit! Bye-bye!" 预告：明天公园复习日，一起"造"一个小公园！贴纸 l2-st-11。' },
    ],
  },
  {
    id: 'l2-sc-d12', lessonId: 'l2-u3-d4', day: 12, titleZh: '复习日：造一个小公园',
    materialsZh: ['大白纸（造公园底图）', '彩纸/旧杂志', '胶棒', '捡来的树叶花瓣（可选）', '贴纸'],
    sections: [
      { ...SEC.warm, content: '你先学青蛙跳一下问 "Who is jumping? A frog!" 让她猜（衔接锚点：昨天的青蛙）。宣布 "Today let\'s build a park!" 今天全是游戏和手工。' },
      { ...SEC.input, content: '不教新词。网站课：打地鼠+配对+跟读闯关（tree/flower/bird）。线下玩"公园寻宝"：把画着 tree/bird/fish/butterfly 的小卡片藏房间各处，你喊 I can see a bird! 她去找 bird 卡片。拼读复习：拍手拼 -og 词族，她能接出整词就欢呼。' },
      { ...SEC.song, content: '本周歌串烧：Twinkle + Phonics Chant 的 -og 两句，唱跳一遍。' },
      { ...SEC.hands, content: '造公园：大白纸当草地，撕绿纸贴小草、画大树、捡真树叶花瓣贴上去，再贴上她画的或贴纸的小鸟小鱼蝴蝶。每贴一样一起说 "I can see a …" 做完贴墙上——这就是她的公园地图，以后每天路过都指一指复习。' },
      { ...SEC.wrap, content: '欣赏她的公园作品："What a beautiful park!" 预告：明天坐上公交车出发！Beep beep! 贴纸 l2-st-12。' },
    ],
  },
  /* ── U4 Let's Move ── */
  {
    id: 'l2-sc-d13', lessonId: 'l2-u4-d1', day: 13, titleZh: '公交车 自行车 火车',
    materialsZh: ['纸巾盒或快递盒（做巴士）', '瓶盖4个（当轮子）', '彩纸和胶棒', '蜡笔'],
    sections: [
      { ...SEC.warm, content: '双手转大方向盘："I can see a big bus!" 按喇叭 Beep beep! 宣布今天一起"坐"大公交车（衔接锚点：上周的 big + I can see 句型自然进入交通工具主题）' },
      { ...SEC.input, content: '3个交通工具：bus, bike, train。全部全身动作记：转大方向盘开 bus、握小车把蹬腿骑 bike、手臂在身侧转圈呜呜开 train。玩"听声音猜车"：你发出 beep beep / ring ring / choo choo，她做对应动作或说车名（说中文也算）。' },
      { ...SEC.song, content: 'The Wheels on the Bus：站起来全身动——手臂绕圈当轮子、按喇叭、刷雨刷、开合车门。她最爱的会是 beep beep beep。' },
      { ...SEC.hands, content: '纸箱小巴士：纸巾盒当车身，贴瓶盖做轮子，画窗户，随她装饰。做好后她"开"着满屋跑，你当乘客喊 "Get on the bus!" 假装上车坐好，一路 Beep beep 复习。' },
      { ...SEC.wrap, content: '把纸巴士"开"回盒子车库："The bus goes home. Bye-bye!" 预告：明天学飞机和小船！贴纸 l2-st-13。' },
    ],
  },
  {
    id: 'l2-sc-d14', lessonId: 'l2-u4-d2', day: 14, titleZh: '飞机 小船 + Let\'s go!',
    materialsZh: ['昨天的纸巴士（衔接锚点）', 'A4纸两张（折纸飞机）', '蜡笔（装饰机翼）'],
    sections: [
      { ...SEC.warm, content: '手臂转圈开火车进场："Choo choo! The train is here!" 宣布今天火车变飞机变小船，一起喊 "Let\'s go!"（衔接锚点：昨天的 train 无缝衔接）' },
      { ...SEC.input, content: '新词：plane, boat + Let\'s go! 动作：双臂平举当机翼飞、坐着双手划船、握拳向前一挥喊 Let\'s go! 玩"海陆空切换"：你喊 plane 她飞、boat 她划、Let\'s go! 她握拳大喊并跑起来。Let\'s go 从今天起变成全家的"出发暗号"——出门、吃饭、玩游戏前都喊一声。' },
      { ...SEC.song, content: 'Row Row Row Your Boat：面对面坐手拉手前后摇摆当划船，唱到 life is but a dream 一起装睡——她会被你夸张的呼噜声逗笑。' },
      { ...SEC.hands, content: '折纸飞机：你折，她在机翼上画画装饰。然后比赛谁飞得远——但每次掷出去前必须一起喊暗号 "Let\'s go!"（喊完才准扔，这就是最好的句型练习）。捡回来再飞，反复玩到她尽兴。' },
      { ...SEC.wrap, content: '纸飞机慢慢"降落"到桌上："The plane is landing. Bye!" 预告：明天学快快和慢慢，还有小猪！贴纸 l2-st-14。' },
    ],
  },
  {
    id: 'l2-sc-d15', lessonId: 'l2-u4-d3', day: 15, titleZh: '快快慢慢 + 拼读 -ig',
    materialsZh: ['纸飞机/纸巴士（衔接锚点）', '手工交通工具全集合', '客厅空地'],
    sections: [
      { ...SEC.warm, content: '双臂张开飞快地"飞"过客厅："The plane goes fast! Whoosh!" 再慢动作划船："The boat goes slow... slow..." 快慢对比她一定会笑（衔接锚点：昨天的 plane 和 boat）' },
      { ...SEC.input, content: '新词：fast, slow + 拼读词族 -ig（pig, big, dig, wig）。fast/slow 用身体记：喊 fast 原地飞快跑、喊 slow 像乌龟慢动作。big 上周学过，正好和 pig 押韵拼在一起 "b-i-g, big! p-i-g, pig!" 玩"快慢定格"：fast→快跑，slow→慢动作，pig→学猪叫按猪鼻子，Stop→定住。拼读目标：听你拼能接出整词就是惊喜。' },
      { ...SEC.song, content: 'Phonics Chant 念 -ig 两句："P-i-g, pig! B-i-g, big! D-i-g, dig! W-i-g, wig!" 拍手打节奏，念到 dig 做挖土动作。' },
      { ...SEC.hands, content: '交通工具快慢游行：拿着这几天做的手工车绕行客厅，你当指挥喊 "Fast train!" / "Slow bike!" / "Stop!" 她照做。加入 -ig 剧情：The pig digs!（小猪挖土）演出来，笑成一团就赢了。' },
      { ...SEC.wrap, content: '先来一个飞快的抱抱 "Fast hug!" 再来一个超慢的抱抱 "Slow hug!" 说再见。预告：明天月亮班大复习+毕业纪念卡！贴纸 l2-st-15。' },
    ],
  },
  {
    id: 'l2-sc-d16', lessonId: 'l2-u4-d4', day: 16, titleZh: '复习日：月亮班毕业 🌙',
    materialsZh: ['全部手工玩具（纸巴士/纸飞机）', '硬纸+星星贴纸（毕业卡）', '蜡笔', '观众（家人/玩偶）', '手机录影'],
    sections: [
      { ...SEC.warm, content: '握拳喊 "Let\'s go! Where do we go?" 让她选今天坐什么出发（说中文也行），选了就一起演：By bus? Beep beep! By plane? Whoosh!（衔接锚点：Let\'s go 暗号最后一次大用场）' },
      { ...SEC.input, content: '不教新词。网站课：打地鼠+配对+跟读闯关（-ig 词族毕业关）。线下玩"交通指挥家"：你举"快"牌她 fast 跑、举"慢"牌她 slow 走，再随机喊交通工具她做动作——全家轮流当指挥，笑到最后。' },
      { ...SEC.song, content: '毕业歌串烧：The Wheels on the Bus + Row Row Row Your Boat 各唱一遍，再挑她这期最爱的一首返场。' },
      { ...SEC.hands, content: '月亮班毕业纪念卡：硬纸做卡片，她贴满星星、画上最爱的交通工具，你帮她写上日期。晚上全家面前小展示：她举卡片，你问 "Where is the plane?" 她指给你看，观众鼓掌——这就是她的小小毕业礼，记得录影。' },
      { ...SEC.wrap, content: '最长的一次总结：中文+英文认真数给她听"你这个月亮班学会了 mom, dad, I love you, teddy bear, in, on, under, tree, bird, bus, plane…"（数手指头数不过来那种）。"You are a Moon Class superstar! I love you!" 大大的拥抱、击掌、亲额头。贴纸 l2-st-16 郑重贴好，预告太阳班更好玩！' },
    ],
  },
]
