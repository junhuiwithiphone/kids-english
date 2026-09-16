import type { LessonScript } from '../schema'

/* ═══════════════════════════════════════════════════════════
   L3 ☀️ Sun 进阶级家长教案脚本 — 16 课
   U1 My Day / U2 Feelings / U3 Animal Homes / U4 Little Explorer
   用途：家长中心「今日任务 / 教案脚本」页签展示，
   指导线下 60 分钟完整课（网站课=其中 15 分钟屏幕部分的增强版）
   L3 进阶级：鼓励完整短句输出（Good morning / I'm happy / Where does...live?）
   ═══════════════════════════════════════════════════════════ */

const SEC = {
  warm: { name: 'Warm-up 问候', minutes: '0–5分钟' },
  input: { name: '新词输入 + TPR游戏', minutes: '5–20分钟' },
  song: { name: '儿歌唱跳', minutes: '20–35分钟' },
  hands: { name: '动手活动', minutes: '35–50分钟' },
  wrap: { name: '总结奖励', minutes: '50–60分钟' },
}

export const l3Scripts: LessonScript[] = [
  /* ── U1 My Day 我的一天 ── */
  {
    id: 'l3-sc-d1', lessonId: 'l3-u1-d1', day: 1, titleZh: '起床 吃饭 睡觉（一日流程动词）',
    materialsZh: ['她最爱的玩偶', '小毯子（给玩偶当被子）', '玩具碗勺', '太阳班贴纸'],
    sections: [
      { ...SEC.warm, content: '太阳班第一课，郑重一点：摸摸她的头说 "Good morning, my big kid!" 告诉她"你已经是大孩子了，我们学你自己的一天"。唱 Hello Song 开场。' },
      { ...SEC.input, content: '5个动词：wake up, eat, drink, play, sleep。全部用"演"的：你伸懒腰打哈欠说 "Wake up!"，大口假装吃饭说 "Eat!"，让她跟着演（不要求跟读，演对就算懂）。玩"听到就做"：你喊 Sleep! 她立刻躺下装睡，喊 Wake up! 弹起来——这个年龄最爱这种反差指令。' },
      { ...SEC.song, content: 'Good Morning Song（自编）：边唱边演一天流程，伸懒腰→吃饭→玩耍。唱两遍，第二遍加速。' },
      { ...SEC.hands, content: '玩偶的一天：让玩偶起床（她说 Wake up! 你才扶它坐起来）→喂饭（Eat!）→玩→盖被子睡觉（Sleep! 嘘——）。玩偶每步都夸张"回应"她。' },
      { ...SEC.wrap, content: '抱抱说 "Good night, sleep tight!" 预告：明天给娃娃洗香香、刷牙牙！今晚真实睡前流程用英文说一遍 sleep / good night。' },
    ],
  },
  {
    id: 'l3-sc-d2', lessonId: 'l3-u1-d2', day: 2, titleZh: '洗澡 刷牙 穿衣服',
    materialsZh: ['昨天的玩偶（衔接锚点）', '小毯子', '真牙刷（干净的）', '娃娃的小衣服或手帕'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：玩偶还"睡着"（盖着昨天的小毯子），让她喊 "Wake up!" 叫醒它，然后互相说 "Good morning!"。' },
      { ...SEC.input, content: '4个新词：bath, brush teeth, get dressed, mouth。你搓手臂说 "Bath!"，手指当牙刷说 "Brush teeth!"，指嘴巴说 "Mouth!"。玩"早晨比赛"：你喊词她做动作，越来越快；再故意做错（牙刷放耳朵上）让她笑着纠正你——纠错时她最愿意开口。' },
      { ...SEC.song, content: 'This Is the Way We Get Dressed（传统改编）：唱到哪步做哪步，刷牙→穿衣→洗澡。' },
      { ...SEC.hands, content: '给玩偶演"洗澡→刷牙→穿衣"全流程：假装搓泡泡说 Bath!，用干净牙刷给玩偶刷牙说 "Open your mouth!"，最后穿小衣服说 Get dressed!。今晚她真洗澡真刷牙时，把这套英文原样再说一遍——生活即课堂。' },
      { ...SEC.wrap, content: '闻一闻她说 "You are clean and sweet!" 预告：明天学两句最有礼貌的魔法话（Good morning / Good night）。' },
    ],
  },
  {
    id: 'l3-sc-d3', lessonId: 'l3-u1-d3', day: 3, titleZh: '句型日：Good morning / Good night / I can...',
    materialsZh: ['玩偶', '白纸+蜡笔（自制流程卡）', '太阳和月亮简笔画卡各1张'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：拿出洗香香的玩偶，你先示范 "Good morning, Teddy!" 再等她说（只说 morning 也大声夸）。L3 是进阶级，今天开始主打完整短句。' },
      { ...SEC.input, content: '3个句型词：Good morning / Good night / I can...。玩"太阳月亮"游戏：举太阳卡全家说 "Good morning!"，举月亮卡压低声音说 "Good night!"。I can 玩法：她每做成一件小事（跳一下、把杯子递给你）就一起说 "I can!"——让这句话和"我能行"的感觉绑定。跟读目标就是这3句完整短句。' },
      { ...SEC.song, content: 'Good Night Song（慢速自编）：白天先"假装睡前"轻轻唱一遍，晚上真睡前再唱一遍（同一首歌两个场景，记忆翻倍）。' },
      { ...SEC.hands, content: '一日流程排序卡：和她一起画5张简笔画卡（起床/吃饭/玩/洗澡/睡觉），打乱后你说英文她排序："First wake up! Then eat!" 排完指着卡说一句 "I can ..."（接一个词就算成功）。拍照贴墙上当她的 My Day 海报。' },
      { ...SEC.wrap, content: '今晚睡前用英文道 "Good night! Sweet dreams!" 让这个仪式从今天起固定下来。预告：明天复习日，全是她会的内容——必胜日！' },
    ],
  },
  {
    id: 'l3-sc-d4', lessonId: 'l3-u1-d4', day: 4, titleZh: '复习日：我的一天（不教新词）',
    materialsZh: ['流程卡海报（衔接锚点）', '小人涂色图纸', '蜡笔', '本周贴纸'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：指她排好的 My Day 海报拍手念 "I can! I can!" 告诉她今天不学新词，全是她会的——先给她吃"必胜"定心丸。' },
      { ...SEC.input, content: '不教新词，全部复习：打地鼠（12个词轮流打）→ 图词配对 → 跟读闯关（Good morning / Good night / I can... 三个完整句，读出任意一个就过关）。线下加玩"一天快进"：你喊流程她加速演一遍，30秒演完一天，笑到不行。' },
      { ...SEC.song, content: '本周歌串烧：Good Morning Song + This Is the Way 各唱一遍，越唱越快。' },
      { ...SEC.hands, content: '涂色 "Color My Day"：打印小人图纸，让她在旁边画太阳说 Good morning!，画月亮说 Good night!。涂到哪步说哪步英文，不纠正出界。涂完贴到海报旁边。' },
      { ...SEC.wrap, content: '授予"一天小主人"称号（可以做个纸皇冠）！预告：明天认识 6 个表情朋友，先做个鬼脸逗她。' },
    ],
  },
  /* ── U2 Feelings 情绪小主人 ── */
  {
    id: 'l3-sc-d5', lessonId: 'l3-u2-d5', day: 5, titleZh: '开心 难过 生气 累了',
    materialsZh: ['一次性纸盘4个（或圆纸片）', '蜡笔', '镜子'],
    sections: [
      { ...SEC.warm, content: '新单元开场要夸张：先做笑脸说 "Happy!"，秒切哭脸 "Sad!"，再叉腰跺脚 "Angry!"——你的"变脸"表演就是最好的教具，她会笑得停不下来。' },
      { ...SEC.input, content: '4个情绪词：happy, sad, angry, tired。对镜子玩"表情制造机"：你喊词，两人一起对镜子做表情；再反过来她喊你做。重点：tired 要配一个大哈欠（打哈欠会传染，正好让她体验）。情绪词不跟读也没关系，做对表情就是懂了。' },
      { ...SEC.song, content: "If You're Happy 情绪版（传统改编）：笑→抱自己→跺脚→捂眼睛，动作越夸张越好。" },
      { ...SEC.hands, content: '纸盘表情卡：4个纸盘分别画 happy/sad/angry/tired（她画线你涂色）。画完玩"转盘变脸"：转纸盘，转到哪张就做哪个表情说英文。卡片收好，明天做面具还要用。' },
      { ...SEC.wrap, content: '指她的笑脸说 "You are happy today!" 预告：明天认识"害怕"和"惊讶"，还要做面具！' },
    ],
  },
  {
    id: 'l3-sc-d6', lessonId: 'l3-u2-d6', day: 6, titleZh: '害怕 惊讶 + 问句 How are you?',
    materialsZh: ['昨天的纸盘表情卡（衔接锚点）', '纸盘2个', '冰棒棍', '双面胶/胶带'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：拿出表情卡先要一张 happy，再神秘地问 "How are you?"——今天教这个魔法问句，她可以用举卡回答（举卡也算沟通成功）。' },
      { ...SEC.input, content: '3个新内容：scared, surprised, How are you?。玩 "Boo! Surprise!"：你轻轻 "Boo!" 她做 scared（捂脸发抖）；你突然拍手她做 surprised（张嘴捂脸颊）。注意 Boo 要轻，她真害怕了立刻抱住说 "It\'s OK, just a game!"。问句练习：吃饭前、出门前随时问 How are you?，她答情绪词就够。' },
      { ...SEC.song, content: "If You're Happy 情绪版：今天重点唱 scared 一句，捂眼睛偷偷看，她会咯咯笑。" },
      { ...SEC.hands, content: '表情面具手工：纸盘挖两个眼洞，一面贴 happy 一面贴 scared，冰棒棍当手柄。规则：戴上哪个面具就用那个情绪说话（"I am ..." 说不全就说情绪词）。家长也要戴！你演得越夸张她越想说。' },
      { ...SEC.wrap, content: '用今天的问句告别："How are you? I am happy! Bye!" 预告：明天学一句超棒的话——I\'m happy!' },
    ],
  },
  {
    id: 'l3-sc-d7', lessonId: 'l3-u2-d7', day: 7, titleZh: '句型日：I\'m happy（轻松日，只加1个新词）',
    materialsZh: ['表情面具', '全部表情卡', '玩偶'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：拿面具问她 "How are you?"（举面具或说词都算回答）。然后你拍着胸口示范今天的目标句 "I\'m happy!"，让她摸摸自己的笑脸跟着说。' },
      { ...SEC.input, content: '只加1个新词：I\'m happy（轻松日）。玩"情绪小医生"：玩偶 sad 了，抱抱它说 "I\'m happy!" 把开心"传染"给它；玩偶 scared 了，也抱抱说 I\'m happy!。句型输出机会全天散点：她做成任何事都引导说一次 I\'m happy!。跟读目标：I\'m happy / How are you? 两个完整句。' },
      { ...SEC.song, content: "If You're Happy 情绪版全家合唱：最后 How are you? 一句轮流问答，每人答 I'm happy!" },
      { ...SEC.hands, content: '表情猜猜乐：一人抽卡做默剧表情（不出声），另一人猜英文。她猜对击掌；轮到她表演时全家认真猜，猜错也没关系——重点是给她创造说 "I\'m ..." 的机会。' },
      { ...SEC.wrap, content: '抱着她说 "I\'m happy with you!"（和你在一起我很开心）。预告：明天情绪派对复习日，做一本属于她的小书！' },
    ],
  },
  {
    id: 'l3-sc-d8', lessonId: 'l3-u2-d8', day: 8, titleZh: '复习日：情绪派对（不教新词）',
    materialsZh: ['表情面具+表情卡（衔接锚点）', '3张A5白纸', '订书机', '蜡笔'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：举起面具和卡片宣布 "Feelings party!" 面具问答热身一轮：How are you? → I\'m happy!（答不出举面具给大家看也算）。' },
      { ...SEC.input, content: '不教新词，全部复习：打地鼠（8个情绪词）→ 图词配对（6个表情）→ 跟读闯关（I\'m happy / How are you? / happy，完整句读出一个就过关）。线下加玩"表情保龄球"：纸盘卡立起来当瓶，球滚倒哪张就做哪张的表情。' },
      { ...SEC.song, content: '本周歌大串烧：If You\'re Happy 情绪版边唱边做全部表情，最后一句全家一起喊 I\'m happy!' },
      { ...SEC.hands, content: '我的情绪小书：3张A5纸订成小书，每页画一种表情，你在角上写 I\'m happy / I\'m sad / I\'m scared。让她当"小老师"读给玩偶或爸爸听——读不出整句只读情绪词也隆重鼓掌，这是她人生第一本"自己读的英文书"。' },
      { ...SEC.wrap, content: '授予"情绪小主人"称号！预告：明天去农场、丛林和海洋，动物们等着搬新家呢！' },
    ],
  },
  /* ── U3 Animal Homes 动物家园 ── */
  {
    id: 'l3-sc-d9', lessonId: 'l3-u3-d9', day: 9, titleZh: '农场 丛林 海洋 + 奶牛 马',
    materialsZh: ['3个纸盒或呼啦圈', 'farm/jungle/ocean 图片各1张', '家里的动物玩偶若干'],
    sections: [
      { ...SEC.warm, content: '用 U2 的问句衔接："How are you? — I\'m happy!" 然后学牛叫 "Moo~ Who lives on the farm?" 宣布：今天动物们要搬进自己的家！' },
      { ...SEC.input, content: '5个新词：farm, jungle, ocean, cow, horse。三个家园词配三个大动作：farm 双手比屋顶、jungle 手臂当树枝摇、ocean 双手做波浪。学叫声：Moo~ / 马儿颠颠（拍腿哒哒哒）。玩"听到就演"：喊 ocean 做波浪，喊 cow 学牛叫。' },
      { ...SEC.song, content: 'Old MacDonald Had a Farm（L1 学过的老朋友）：唱到 cow 就 Moo~，今天现场加一段 horse 也不错。' },
      { ...SEC.hands, content: '动物家园分类游戏：3个盒子贴上 farm🚜 jungle🌴 ocean🌊 图，把动物玩偶全倒出来"送回家"。你问 "Where does the cow live?" 她送到 farm 就夸张欢呼。盒子别收，后面三天都要用！' },
      { ...SEC.wrap, content: '让奶牛玩偶跟她道别 "The cow says bye! Moo~" 预告：明天丛林里的狮子和猴子要来！' },
    ],
  },
  {
    id: 'l3-sc-d10', lessonId: 'l3-u3-d10', day: 10, titleZh: '句型日：Where does ... live?',
    materialsZh: ['3个家园盒（衔接锚点）', '狮子/猴子/蜜蜂玩偶或图片', '远处的家具（教 that 用）'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：指昨天分类好的盒子，再学狮子吼 "Roar~ Who is this?" 让她猜。指远处的盒子教 "That is the farm!"（that=指远处）。' },
      { ...SEC.input, content: '5个新词：lion, monkey, bee, Where does...live?, that。动物配动作：狮子张爪大吼、猴子挠头跳、蜜蜂嗡嗡飞——先玩"丛林漫步"把这些动作演熟。句型练习：你拿着动物问 "Where does the lion live?"，她指盒子或说 jungle 都算成功；你先说 "Where does the..." 让她接动物名也行。跟读目标：完整问句 + lion + monkey。' },
      { ...SEC.song, content: 'The Animals Walk（自编）：站起来大动作唱，狮子踏步→猴子跳→小马跑→蜜蜂飞，最后一句 Where do they live? 手搭凉棚找一找。' },
      { ...SEC.hands, content: '动物回家快递站：她当快递员，每送一只动物你问一次 Where does the ... live? 投对按"门铃"叮咚庆祝，投错玩偶"哭"一下重来（笑着重来，无挫败）。最后让她当站长考你——你故意送错让她纠正。' },
      { ...SEC.wrap, content: '狮子玩偶打哈欠道别 "The lion says good night! Roar~" 预告：明天屏住呼吸，潜入大海看鲸鱼和鲨鱼！' },
    ],
  },
  {
    id: 'l3-sc-d11', lessonId: 'l3-u3-d11', day: 11, titleZh: '鲸鱼 鲨鱼 小鱼（海洋日）',
    materialsZh: ['蓝毛巾或蓝纸', '脸盆+水', '鱼玩具（或纸片鱼）+漏勺', 'ocean 家园盒'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：把耳朵贴到蓝毛巾（"海面"）上听——哗啦哗啦。神秘地压低声音问 "Who lives in the ocean?" 制造潜水期待感。' },
      { ...SEC.input, content: '3个新词：whale, shark, fish。三种游法：whale 双臂慢慢摆（大）、shark 手掌当鳍快快游（配 chomp!）、fish 双手合掌灵巧游（小）。玩"海洋游泳"指令游戏：喊哪个游哪个，大中小对比她会玩疯。复习问句：Where does the whale live? → Ocean!' },
      { ...SEC.song, content: 'Whale Song 海洋韵律（自编）：swish~ chomp! blub blub~ 最后一句 The ocean is big! The ocean is blue! 双手画大圆。' },
      { ...SEC.hands, content: '脸盆小海洋：装水放鱼玩具，用漏勺捞。每捞一条问 "Where does the fish live?" 她答 ocean（或拍水）都算赢。铺毛巾防滑，捞完的鱼排排站说 Good night。' },
      { ...SEC.wrap, content: '鲸鱼摆尾道别 "The whale waves bye-bye! Swish~" 预告：明天动物家园大复习+闯关，家园小卫士等你上任！' },
    ],
  },
  {
    id: 'l3-sc-d12', lessonId: 'l3-u3-d12', day: 12, titleZh: '复习日：动物家园闯关（不教新词）',
    materialsZh: ['3个家园盒+全部动物玩偶（衔接锚点）', '小毯子当披风（家园小卫士）'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：提前把动物全放进错误的盒子，她一来就夸张惊讶 "Oh no! All the animals are mixed up!" 请她当"家园小卫士"救场。' },
      { ...SEC.input, content: '不教新词，全部复习：打地鼠（家园+动物8词）→ 图词配对（cow-farm / lion-jungle / fish-ocean 六对）→ 跟读闯关（Where does...live? / fish / lion）。线下主活动"闯关赛道"：三关各送一只动物并回答 Where does ... live?，答不出你说前半句她接动物名也算过关。通关披上小毯子披风授衔！' },
      { ...SEC.song, content: '本周歌串烧：The Animals Walk + Whale Song 连唱，全家一起动。' },
      { ...SEC.hands, content: '家园小卫士出题环节：让她当站长考你，你故意送错（把 shark 送进 farm），她纠正时把 "No! Ocean!" 说完整——教是最好的学。玩完把动物们整齐送回盒子里说 Good night, animals!' },
      { ...SEC.wrap, content: '授予"家园小卫士"称号，击掌！预告：明天坐上探险船，去看大大的地球——Little Explorer 出发！' },
    ],
  },
  /* ── U4 Little Explorer 小探险家 ── */
  {
    id: 'l3-sc-d13', lessonId: 'l3-u4-d13', day: 13, titleZh: '大大的蓝色地球',
    materialsZh: ['气球（或地球仪）', '蓝色贴纸/画笔', '黏土', 'ocean 家园盒（衔接锚点）'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：指着 ocean 盒子宣布大发现——"The ocean is part of the EARTH!" 海洋原来住在一个大大的球上！双手抱"大地球"转一圈：Hello, Earth! I am a little explorer!' },
      { ...SEC.input, content: '5个新词：earth, mountain, river, big, blue。身体当地图：手臂从低举到高=mountain，手臂蜿蜒=river，双手抱大球转=earth，双臂张开=big。形容词造短句（L3 进阶）："The earth is big." "The ocean is blue." 你说她接最后一个词也算输出。' },
      { ...SEC.song, content: 'The Big Blue Earth（自编）：抱地球转圈→波浪手→双手举高高比大山，最后 I am a little explorer! Yay!' },
      { ...SEC.hands, content: '气球地球+黏土高山：吹气球画（贴）成蓝绿相间的地球；黏土捏一座 mountain，旁边压一条弯弯的 river。有地球仪更好——找到自己住的城市说 "Here!" 作品摆上"探险家展台"，后面三天继续用。' },
      { ...SEC.wrap, content: '授予"小探险家"敬礼！预告：明天去沙漠、森林和小岛探险，把客厅变成世界地图！' },
    ],
  },
  {
    id: 'l3-sc-d14', lessonId: 'l3-u4-d14', day: 14, titleZh: '沙漠 森林 小岛 + This is ...',
    materialsZh: ['昨天的地球作品（衔接锚点）', '沙发靠垫', '蓝毛巾', '黄色纸/沙画', '绿植角'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：指着她的地球作品教 "This is the ocean!"（近指 this），再指远处 "That is the mountain!"（复习 that）。this/that 对比指一圈她的作品。' },
      { ...SEC.input, content: '5个新词：desert, forest, island, hot, this。desert 配扇风动作（好热 hot!），forest 手指当小树向上长，island 双手圈个小岛。句型输出："This is the desert." 你指她说 This is ...（接一个词就算成功）。跟读目标：desert / forest / hot。' },
      { ...SEC.song, content: 'The Big Blue Earth：这次唱到 desert/forest/island 时，指她作品（或客厅布景）上对应的位置。' },
      { ...SEC.hands, content: '客厅大探险：沙发=mountain（可以爬）、蓝毛巾=ocean、坐垫=island、黄纸=desert、绿植角=forest。你喊 "Sail to the island!" 她跑去踩坐垫，到了停一秒说 "This is the island!" 全身运动+地理启蒙一举两得，布景留着明天玩。' },
      { ...SEC.wrap, content: '探险家击掌 "Great exploring today!" 预告：明天抓三个魔法字母音——sh! ch! th!' },
    ],
  },
  {
    id: 'l3-sc-d15', lessonId: 'l3-u4-d15', day: 15, titleZh: '双字母音 sh-ch-th（自然拼读启蒙）',
    materialsZh: ['小鱼玩偶（衔接锚点）', '3张大纸（写 sh/ch/th）', '旧杂志+安全剪刀（或蜡笔自画）', '家里的椅子和午餐盒'],
    sections: [
      { ...SEC.warm, content: '衔接锚点：小鱼玩偶游过来——"Shhh... the fish says sh-sh-sh!" fish 里藏着 sh 的声音！今天抓三个"魔法字母音"，先神秘地做嘘的手势。' },
      { ...SEC.input, content: '5个新词：ship, shop, chair, lunch, beach（复习 fish, mouth, this, that）。三个音配三个动作：sh 手指放嘴边"嘘"+开船摇、ch 学小火车"恰恰恰"、th 舌尖轻咬指嘴巴。韵律大声念："sh-sh-ship! ch-ch-chair! th-th-this!" 只玩声音不教字母规则——她的任务是"听出这三个音很好玩"。' },
      { ...SEC.song, content: 'Phonics Chant sh-ch-th（自编）：拍手打节奏大声念，配上三个动作，念到最后一句举"话筒"喊 Say it with me!' },
      { ...SEC.hands, content: '声音寻宝分类：三张纸写大大的 sh/ch/th，从旧杂志剪图（船/商店/椅子/午餐/海滩/鱼/嘴巴）或自画简笔画，让她按声音分类。更棒的玩法：满屋子找实物——chair 和 lunch 家里就有！找到椅子拍拍它说 "ch-ch-chair!" 分错不纠正，一起慢慢念出声音让她自己发现。' },
      { ...SEC.wrap, content: '授予"拼读小达人"称号！预告：明天是太阳班毕业大派对，请玩偶和全家出席典礼！' },
    ],
  },
  {
    id: 'l3-sc-d16', lessonId: 'l3-u4-d16', day: 16, titleZh: '太阳班毕业日 🎉',
    materialsZh: ['地球作品+客厅布景（衔接锚点）', '提前写好的毕业纪念卡', '星星贴纸', '观众（玩偶+家人）', '手机录影'],
    sections: [
      { ...SEC.warm, content: '郑重宣布 "Today is GRADUATION DAY!" 把玩偶和家人请到"典礼现场"（沙发排排坐），她抱着地球作品向大家问好 "Hello, Earth! Hello, everyone!" 手机录影架好，仪式感拉满。' },
      { ...SEC.input, content: '不教新词，毕业大复习：打地鼠（U4 八词）→ 图词配对（ship-ocean / chair-this / beach-hot）→ 跟读闯关压轴三句完整句：I\'m happy / Good morning / Where does the fish live?（读出一句就是毕业生水平！）。网站版在复习闯关页面进行。' },
      { ...SEC.song, content: '毕业典礼主题曲：全家站成圆圈唱 The Big Blue Earth，最后一起举手喊 Yay! 有精力再加唱 Good Morning Song。' },
      { ...SEC.hands, content: '毕业纪念卡：打印好 "Sun Class Graduate ☀️" +日期，让她贴满这一级攒下的星星贴纸，再涂一颗大星星。举着卡片和地球作品合影，大声宣布 "I am a SUN graduate!"' },
      { ...SEC.wrap, content: '最长的一次 Wrap-up（10分钟）：用中文+英文认真总结"你学会了 Good morning、I\'m happy、Where does the fish live、earth、mountain、ship…"（数给她听，观众鼓掌）。颁发毕业贴纸，大大的拥抱、击掌、亲额头，说 "You are a SUPER SUN graduate! I love you!" 📚 远期衔接提示：等她满6岁+，可以开始读 Core Knowledge History & Geography 教材（家长书架已备 G1-G4）——这16课学的 earth/ocean/mountain/desert/forest/island 正是那套教材的第一批地理大词，她到时候会惊喜地认出老朋友。' },
    ],
  },
]
