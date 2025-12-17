// 马王堆秘影 - 游戏核心逻辑
// 修复了交互问题，优化了游戏流程

// 游戏数据
const gameData = {

    // 章节数据
    chapters: [
        { id: 0, name: '序幕', title: '课堂入睡', progress: 5, bgColor: '#4a6572' },
        { id: 1, name: '第一章', title: '神秘气体', progress: 15, bgColor: '#5d4037' },
        { id: 2, name: '第二章', title: '九层之台', progress: 25, bgColor: '#795548' },
        { id: 3, name: '第三章', title: '帛画之谜', progress: 35, bgColor: '#6a1b9a' },
        { id: 4, name: '第四章', title: '无字天书', progress: 45, bgColor: '#1976d2' },
        { id: 5, name: '第五章', title: '弦外之音', progress: 55, bgColor: '#e53935' },
        { id: 6, name: '终章', title: '千年回响', progress: 65, bgColor: '#00897b' },
        { id: 7, name: '终幕', title: '课堂惊醒', progress: 100, bgColor: '#4a6572' }
    ],
    
    // 转场文字
    transitions: [
        // 序幕 → 第一章
        [
            "眼皮沉入黑暗的刹那",
            "1972年的地底传来闷响",
            "一簇幽蓝鬼火",
            "在潮湿的裂缝中",
            "悄然苏醒..."
        ],
        // 第一章 → 第二章
        [
            "当沼气蓝焰渐渐熄灭",
            "脚下泥土渗出千年寒凉",
            "白膏泥的封印之下",
            "九重棺椁如沉睡的巨兽",
            "静待揭晓..."
        ],
        // 第二章 → 第三章
        [
            "穿过木炭与泥层的屏障",
            "帛画突然漫起星芒",
            "辛追夫人的叹息",
            "在彩绘帛丝间",
            "幽幽回荡..."
        ],
        // 第三章 → 第四章
        [
            "升天之路隐入微光",
            "漆盘铭文浮出黑暗",
            '"君幸食"三字如咒语',
            "封印千年的玉匣",
            "咔哒轻响..."
        ],
        // 第四章 → 第五章
        [
            "当轪侯印泥干涸刹那",
            "二十五弦瑟自鸣而歌",
            "素纱禅衣飘然悬空",
            "49克的轻羽",
            "载起山河舆图..."
        ],
        // 第五章 → 终章
        [
            "蚕弦震落最后尘埃",
            "驻军图光影流转",
            "少年利豨的虚影中",
            "AI辛追拈花微笑：",
            '"该解开最终谜题了..."'
        ],
        // 终章 → 终幕
        [
            "所有光芒收束为一点",
            "汉文帝诏书化作飞灰",
            '"历史托付于你——"',
            "余音未落",
            "粉笔敲击声破空而来..."
        ]
    ],
    
    // 题库数据
    quizzes: [
        {
            id: 1,
            question: '当年施工队在挖掘防空洞时，意外喷出了什么神秘的可燃气体（"鬼火"），从而揭开了马王堆的面纱？',
            options: ['A. 沼气', 'B. 氧气', 'C. 氮气', 'D. 二氧化碳'],
            correct: 0,
            explanation: '施工队意外凿开了墓室，喷出的是沼气（甲烷），这是有机物在密闭环境中长期腐化产生的可燃气体。'
        },
        {
            id: 2,
            question: '进入墓室前，考古人员需要依次清除哪些特殊的填埋材料？',
            options: ['A. 石灰、沙子', 'B. 木炭、沙子', 'C. 白膏泥、木炭', 'D. 石头、泥土'],
            correct: 2,
            explanation: '马王堆汉墓采用了白膏泥和木炭的双层密封结构，白膏泥防水，木炭吸潮，共同构成了完美的防腐屏障。'
        },
        {
            id: 3,
            question: '一号墓出土的T形帛画通常被认为是指引墓主人升天的"地图"，画面上中下三部分分别代表了什么境界？',
            options: ['A. 天界、人间、冥界', 'B. 皇宫、街道、家', 'C. 春夏、秋冬、四季', 'D. 江河、湖泊、大海'],
            correct: 0,
            explanation: 'T形帛画从上到下描绘了天界（日月神祇）、人间（祭祀场景）和冥界（地祇托举）三个世界，体现了汉代的宇宙观。'
        },
        {
            id: 4,
            question: '哪一枚小小的印章最终确认了二号墓主人的身份？印章上的文字是什么？',
            options: ['A. "长沙丞相"', 'B. "利苍之印"', 'C. "轪侯之印"', 'D. "辛追"'],
            correct: 2,
            explanation: '出土的"轪侯之印"确认了二号墓的主人是第一代轪侯、长沙国丞相利苍。'
        },
        {
            id: 5,
            question: '墓中出土了大量关于养生的帛书，其中有一本是中国目前发现最早的医方书，叫什么名字？',
            options: ['A. 《黄帝内经》', 'B. 《五十二病方》', 'C. 《本草纲目》', 'D. 《伤寒杂病论》'],
            correct: 1,
            explanation: '《五十二病方》记载了52类疾病的治疗方剂，是中国现存最早的医方著作，比《黄帝内经》成书时间更早。'
        },
        {
            id: 6,
            question: '那件被誉为"世界上最轻的衣服"的素纱单衣，重量大约是多少克？',
            options: ['A. 49克', 'B. 100克', 'C. 200克', 'D. 500克'],
            correct: 0,
            explanation: '素纱单衣仅重49克，折叠后可放入火柴盒，代表了汉代缫丝、织造工艺的巅峰水平。'
        },
        {
            id: 7,
            question: '许多精美的漆器上刻有"成市□"的戳记，这代表了什么产地信息？',
            options: ['A. 长安', 'B. 洛阳', 'C. 成都', 'D. 苏州'],
            correct: 2,
            explanation: '"成市□"戳记中的"成市"指汉代成都市的市府机构，表明这些漆器产自成都，是当时的重要手工业中心。'
        },
        {
            id: 8,
            question: '三号墓出土的乐器中，有一种是目前发现的唯一完整的西汉初期瑟，它有多少根弦？',
            options: ['A. 5弦', 'B. 7弦', 'C. 12弦', 'D. 25弦'],
            correct: 3,
            explanation: '出土的瑟有25根弦，是研究汉代音乐的重要实物，证明了当时已有复杂的弦乐器。'
        },
        {
            id: 9,
            question: '辛追夫人陪葬的衣物中，有一种纹样像茱萸的刺绣，这在当时叫什么名字？',
            options: ['A. 乘云绣', 'B. 茱萸绣', 'C. 龙凤绣', 'D. 错金绣'],
            correct: 1,
            explanation: '茱萸绣以茱萸纹为图案，茱萸在古代被认为有辟邪的功效，常用于衣物装饰。'
        },
        {
            id: 10,
            question: '三号墓出土的《驻军图》主要体现了汉代的什么体系？',
            options: ['A. 农田水利网络', 'B. 军事布防体系', 'C. 丝绸之路路线', 'D. 城市排水规划'],
            correct: 1,
            explanation: '《驻军图》是中国现存最早的军事地图，详细标注了驻军地点、防区界线、指挥城堡等军事要素。'
        },
        {
            id: 11,
            question: '一号墓的辛追夫人、二号墓的利苍、三号墓的年轻墓主，他们之间的家庭关系是怎样的？',
            options: [
                'A. 辛追是利苍的妻子，年轻墓主是他们的儿子（利豨）',
                'B. 辛追是利苍的母亲，年轻墓主是利苍的儿子',
                'C. 辛追是利苍的女儿，年轻墓主是利苍的兄弟',
                'D. 他们没有血缘关系，只是同事'
            ],
            correct: 0,
            explanation: '辛追是轪侯利苍的妻子，三号墓的年轻男性墓主是他们的儿子利豨，继承了轪侯爵位。'
        },
        {
            id: 12,
            question: '根据现代科技复原和研究，辛追夫人去世时大约是多大年纪？',
            options: ['A. 约30岁', 'B. 约50岁', 'C. 约70岁', 'D. 约90岁'],
            correct: 1,
            explanation: '通过对遗体的医学检查，辛追去世时大约50岁，这在汉代算是比较长寿的。'
        },
        {
            id: 13,
            question: '漆盘上常写的"君幸食"三个字，用现代话翻译过来是什么意思？',
            options: ['A. "小心有毒"', 'B. "欢迎光临"', 'C. "吃好喝好"（劝君进食）', 'D. "皇家专用"'],
            correct: 2,
            explanation: '"君幸食"是汉代常见的漆器铭文，意为"请您用好餐"，体现了主人的好客之情。'
        },
        {
            id: 14,
            question: '现代法医推测，辛追夫人去世的直接原因很可能是什么？',
            options: ['A. 吃甜瓜过量导致消化不良（或瓜籽堵塞气管）', 'B. 战争受伤', 'C. 意外坠楼', 'D. 被毒杀'],
            correct: 0,
            explanation: '在辛追的食道和胃里发现了138颗甜瓜子，推测她可能是吃了大量甜瓜后引发急病去世。'
        },
        {
            id: 15,
            question: '汉朝第一代长沙王叫什么名字？',
            options: ['A. 吴芮', 'B. 刘邦', 'C. 项羽', 'D. 韩信'],
            correct: 0,
            explanation: '吴芮是汉朝第一代长沙王，也是唯一善终的异姓诸侯王。'
        },
        {
            id: 16,
            question: '湖南博物院近期发布的"辛追夫人"3D数字人，是基于什么技术复原的？她的年龄设定在多少岁左右？',
            options: ['A. 18岁', 'B. 30岁', 'C. 50岁', 'D. 70岁'],
            correct: 1,
            explanation: '湖南博物院利用数字技术复原了辛追夫人30岁左右的容貌，展现了她年轻时的风采。'
        },
        {
            id: 17,
            question: '二号墓的发掘过程非常艰难，因为历史上曾多次被盗，你能列举出二号墓被盗的具体朝代吗？',
            options: ['A. 唐代、宋代', 'B. 魏晋时期、宋代', 'C. 元代、明代', 'D. 清代、民国'],
            correct: 1,
            explanation: '考古发现二号墓有魏晋时期和宋代两个时期的盗洞，说明该墓历史上至少两次被盗。'
        },
        {
            id: 18,
            question: '辛追夫人的棺椁共有几层？',
            options: ['A. 2层', 'B. 4层', 'C. 6层', 'D. 8层'],
            correct: 1,
            explanation: '辛追的棺椁共有四层，从外到内依次是：外椁、内椁、外棺、内棺，体现了汉代贵族的葬制。'
        },
        {
            id: 19,
            question: '三号墓出土的《长沙国南部地形图》精确到了什么程度？',
            options: ['A. 像素级', 'B. 与现代地图相差无几', 'C. 包含了等高线', 'D. 仅是示意图'],
            correct: 1,
            explanation: '这幅2100多年前的地图与现代地图的吻合度高达90%以上，河流、山脉的走向基本正确，令人惊叹。'
        },
        {
            id: 20,
            question: '为何如此奢华的马王堆汉墓几乎没有金陪葬品？',
            options: [
                'A. 当时汉代法律（受文帝影响）规定陵墓不用金银铜锡，以陶木代替',
                'B. 被盗墓贼偷光了',
                'C. 家族贫穷',
                'D. 献给皇帝了'
            ],
            correct: 0,
            explanation: '汉文帝提倡薄葬，下诏"治霸陵皆以瓦器，不得以金银铜锡为饰"，这一政策影响了当时的丧葬习俗。'
        }
    ],
    
    // 文物数据
    artifacts: {
        't-shaped-silk': {
            id: 't-shaped-silk',
            name: 'T形帛画',
            icon: 'fas fa-scroll',
            description: '马王堆一号汉墓出土的T形帛画，描绘了天界、人间和冥界三个部分，是汉代丧葬观念的重要体现。',
            chapter: 3
        },
        'plain-gauze-gown': {
            id: 'plain-gauze-gown',
            name: '素纱单衣',
            icon: 'fas fa-tshirt',
            description: '重量仅49克的素纱单衣，是世界上最轻的衣服，代表了汉代纺织工艺的最高水平。',
            chapter: 5
        },
        'seal': {
            id: 'seal',
            name: '轪侯之印',
            icon: 'fas fa-stamp',
            description: '确认二号墓主人利苍身份的印章，是研究西汉列侯制度的重要实物资料。',
            chapter: 4
        },
        'lacquerware': {
            id: 'lacquerware',
            name: '漆盘',
            icon: 'fas fa-utensils',
            description: '刻有"君幸食"和"成市□"戳记的漆盘，反映了汉代成都漆器制造业的繁荣。',
            chapter: 4
        },
        'se': {
            id: 'se',
            name: '二十五弦瑟',
            icon: 'fas fa-guitar',
            description: '西汉初期唯一完整的二十五弦瑟，展现了汉代音乐文化的高度发展。',
            chapter: 5
        },
        'map': {
            id: 'map',
            name: '驻军图',
            icon: 'fas fa-map',
            description: '世界上最早的军事地图，精确描绘了汉代长沙国南部的军事布防情况。',
            chapter: 5
        }
    }
};

// 游戏状态管理
class GameState {
    constructor() {
        this.currentChapter = 0;
        this.score = 0;
        this.quizAnswers = [];
        this.discoveredArtifacts = [];
        this.currentQuizIndex = 0;
        this.isLoading = true;
        
        // 文物解锁状态
        this.artifactStatus = {};
        Object.keys(gameData.artifacts).forEach(key => {
            this.artifactStatus[key] = false;
        });
    }
    
    unlockArtifact(artifactId) {
        if (gameData.artifacts[artifactId] && !this.artifactStatus[artifactId]) {
            this.artifactStatus[artifactId] = true;
            this.discoveredArtifacts.push(artifactId);
            return true;
        }
        return false;
    }
    
    addQuizAnswer(questionId, selected, correct) {
        this.quizAnswers.push({ questionId, selected, correct });
        if (correct) this.score++;
    }
    
    getCorrectAnswersCount() {
        return this.quizAnswers.filter(answer => answer.correct).length;
    }
    
    getScorePercentage() {
        if (this.quizAnswers.length === 0) return 0;
        return Math.round((this.getCorrectAnswersCount() / this.quizAnswers.length) * 100);
    }
}

// 游戏核心类
class MaWangDuiGame {
    constructor() {
        this.state = new GameState();
        this.currentScene = null;
        this.isTransitioning = false;
        
        // 初始化游戏
        this.init();
    }
    
    init() {
        // 显示加载屏幕
        this.showLoadingScreen();
        
        // 设置事件监听器
        this.setupEventListeners();
        
        // 模拟加载过程
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showScreen('start');
        }, 1500);
    }
    
    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
        this.updateLoadingText('初始化游戏资源...');
        
        // 模拟加载步骤
        const steps = [
            '加载游戏数据...',
            '初始化场景...',
            '准备题库系统...',
            '加载完成！'
        ];
        
        steps.forEach((step, index) => {
            setTimeout(() => {
                this.updateLoadingText(step);
            }, index * 300);
        });
    }
    
    updateLoadingText(text) {
        const loadingText = document.getElementById('loading-text');
        if (loadingText) {
            loadingText.textContent = text;
        }
    }
    
    hideLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'none';
        this.state.isLoading = false;
    }
    
    setupEventListeners() {
        // 开始界面按钮
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('start-from-guide').addEventListener('click', () => this.startGame());
        document.getElementById('start-from-team').addEventListener('click', () => this.startGame());
        document.getElementById('how-to-play').addEventListener('click', () => this.showScreen('guide'));
        document.getElementById('team-info').addEventListener('click', () => this.showScreen('team'));
        
        // 返回按钮
        document.getElementById('back-from-guide').addEventListener('click', () => this.showScreen('start'));
        document.getElementById('back-from-team').addEventListener('click', () => this.showScreen('start'));
        
        // 游戏控制按钮
        document.getElementById('menu-button').addEventListener('click', () => this.toggleMenu());
        document.getElementById('close-menu').addEventListener('click', () => this.toggleMenu());
        document.getElementById('resume-game').addEventListener('click', () => this.toggleMenu());
        document.getElementById('restart-chapter').addEventListener('click', () => this.restartChapter());
        document.getElementById('view-guide').addEventListener('click', () => {
            this.toggleMenu();
            this.showScreen('guide');
        });
        document.getElementById('view-team').addEventListener('click', () => {
            this.toggleMenu();
            this.showScreen('team');
        });
        document.getElementById('exit-game').addEventListener('click', () => {
            this.toggleMenu();
            this.showScreen('start');
        });
        
        // 文物图鉴
        document.getElementById('inventory-button').addEventListener('click', () => this.showInventory());
        document.getElementById('close-inventory').addEventListener('click', () => this.hideInventory());
        
        // 章节地图
        document.getElementById('map-button').addEventListener('click', () => this.showMap());
        document.getElementById('close-map').addEventListener('click', () => this.hideMap());
        document.getElementById('go-to-chapter').addEventListener('click', () => this.goToSelectedChapter());
        
        // 转场继续按钮
        document.getElementById('continue-transition').addEventListener('click', () => this.continueFromTransition());
        
        // 对话继续按钮
        document.getElementById('next-dialogue').addEventListener('click', () => this.hideDialogue());
        
        // 任务按钮
        document.getElementById('submit-task').addEventListener('click', () => this.submitTask());
        document.getElementById('cancel-task').addEventListener('click', () => this.hideTask());
        
        // 文物关闭按钮
        document.getElementById('close-artifact').addEventListener('click', () => this.hideArtifact());
        
        // 答题按钮
        document.getElementById('submit-quiz').addEventListener('click', () => this.submitQuiz());
        document.getElementById('next-quiz').addEventListener('click', () => this.nextQuiz());
        
        // 游戏结束按钮
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
        document.getElementById('back-to-home').addEventListener('click', () => this.showScreen('start'));
        
        // 交互提示点击事件 - 修复的关键部分
        const interactionHint = document.getElementById('interaction-hint');
        if (interactionHint) {
            interactionHint.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleInteractionHintClick();
            });
        }
        
        // 场景背景点击事件
        const sceneBackground = document.getElementById('scene-background');
        if (sceneBackground) {
            sceneBackground.addEventListener('click', () => {
                this.handleSceneClick();
            });
        }
        
        // 地图节点点击
        document.querySelectorAll('.map-node').forEach(node => {
            node.addEventListener('click', (e) => {
                const chapterId = parseInt(e.currentTarget.dataset.chapter);
                this.selectMapChapter(chapterId);
            });
        });
    }
    
    showScreen(screenName) {
        // 隐藏所有屏幕
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // 隐藏所有覆盖层
        document.querySelectorAll('.screen-overlay').forEach(overlay => {
            overlay.classList.remove('active');
        });
        
        // 显示目标屏幕
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        // 特殊处理
        if (screenName === 'game') {
            this.updateGameUI();
        } else if (screenName === 'end') {
            this.showEndScreen();
        }
    }
    
    startGame() {
        // 重置游戏状态
        this.state = new GameState();
        
        // 显示游戏界面
        this.showScreen('game');
        
        // 开始序幕
        this.startChapter(0);
    }
    
    startChapter(chapterId) {
        if (this.isTransitioning) return;
        
        this.state.currentChapter = chapterId;
        this.updateGameUI();
        
        // 清除场景内容
        this.clearScene();
        
        // 如果是新章节，显示转场
        if (chapterId > 0 && chapterId < 8) {
            this.showTransition(chapterId - 1);
        } else {
            // 直接开始章节内容
            this.playChapter(chapterId);
        }
    }
    
    showTransition(transitionId) {
        this.isTransitioning = true;
        
        const transition = gameData.transitions[transitionId];
        if (!transition) {
            this.isTransitioning = false;
            this.playChapter(this.state.currentChapter);
            return;
        }
        
        // 显示转场文字
        for (let i = 0; i < 5; i++) {
            const lineElement = document.getElementById(`transition-line${i + 1}`);
            if (lineElement && transition[i]) {
                lineElement.textContent = transition[i];
            }
        }
        
        // 显示转场界面
        document.getElementById('transition-text').classList.add('active');
    }
    
    continueFromTransition() {
        this.isTransitioning = false;
        
        // 隐藏转场界面
        document.getElementById('transition-text').classList.remove('active');
        
        // 开始章节内容
        this.playChapter(this.state.currentChapter);
    }
    
    playChapter(chapterId) {
        this.clearScene();
        
        // 设置场景背景
        const sceneBackground = document.getElementById('scene-background');
        if (sceneBackground && gameData.chapters[chapterId]) {
            sceneBackground.style.background = `linear-gradient(135deg, ${gameData.chapters[chapterId].bgColor} 0%, ${this.darkenColor(gameData.chapters[chapterId].bgColor)} 100%)`;
        }
        
        // 根据章节ID执行不同的逻辑
        switch(chapterId) {
            case 0: // 序幕
                this.playPrologue();
                break;
            case 1: // 第一章
                this.playChapter1();
                break;
            case 2: // 第二章
                this.playChapter2();
                break;
            case 3: // 第三章
                this.playChapter3();
                break;
            case 4: // 第四章
                this.playChapter4();
                break;
            case 5: // 第五章
                this.playChapter5();
                break;
            case 6: // 终章
                this.playFinalChapter();
                break;
            case 7: // 终幕
                this.playFinalScene();
                break;
        }
    }
    
    darkenColor(color) {
        // 简单的颜色变暗函数
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            
            return `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`;
        }
        return color;
    }
    
    clearScene() {
        const sceneBackground = document.getElementById('scene-background');
        if (sceneBackground) {
            sceneBackground.innerHTML = '';
        }
        
        // 隐藏所有覆盖层
        document.querySelectorAll('.screen-overlay').forEach(overlay => {
            overlay.classList.remove('active');
        });
        
        // 隐藏交互提示
        this.hideInteractionHint();
    }
    
    // 序幕：课堂入睡
    playPrologue() {
        this.showInteractionHint('点击屏幕开始梦境穿越');
        
        // 设置场景点击事件
        this.currentScene = {
            type: 'prologue',
            onSceneClick: () => {
                this.hideInteractionHint();
                this.showDialogue({
                    speakerName: '教授',
                    speakerTitle: '课堂生动有趣的老师',
                    avatarIcon: 'fas fa-chalkboard-teacher',
                    text: '同学们，请看这些马王堆出土的帛书照片...这些文物藏着汉代的生命观和宇宙观...',
                    choices: [
                        { text: '真有趣啊，我得认真听(ง •̀_•́)ง', action: () => this.prologueChoice(1) },
                        { text: '有点困了...', action: () => this.prologueChoice(2) }
                    ]
                });
            }
        };
    }
    
    prologueChoice(choice) {
        if (choice === 1) {
            this.showDialogue({
                speakerName: '教授',
                speakerTitle: '课堂生动有趣的老师',
                avatarIcon: 'fas fa-chalkboard-teacher',
                text: '...那么谁知道，马王堆汉墓是因为什么偶然事件被发现的？',
                choices: [
                    { text: '好像是施工队挖防空洞时发现的...(+.+)(-.-)(_ _) ..zzZZ', action: () => this.advanceToChapter(1) },
                    { text: '呃...生命的土豆泥不在于蔬烩汤...而是可乐和原味鸡...只有静候真正鸡米花的那一天到来...鸡块...也就巧克力圣代了......', action: () => this.prologueChoice(3) }
                ]
            });
        } else {
            this.showDialogue({
                speakerName: '内心独白',
                speakerTitle: '学生',
                avatarIcon: 'fas fa-brain',
                text: '昨晚熬夜打游戏，现在眼皮好重...教授的声音越来越远...',
                choices: [
                    { text: '(՞- -՞)‪ᶻᶻᶻ......', action: () => this.advanceToChapter(1) },
                    { text: '横扫生命，做回尸体..._(xз」∠)_', action: () => this.advanceToChapter(1) }
                ]
            });
        }
    }
    
    // 第一章：神秘气体
    playChapter1() {
       this.currentScene = null;
    
    this.clearScene();
        
        // 添加工人NPC
        this.addInteractiveElement({
            id: 'worker-li',
            icon: 'fas fa-hard-hat',
            name: '工人老李',
            top: '50%',
            left: '50%',
            color: '#ff9800',
            onClick: () => {
                this.hideInteractionHint();
                this.showDialogue({
                    speakerName: '工人老李',
                    speakerTitle: '防空洞施工队工人',
                    avatarIcon: 'fas fa-hard-hat',
                    text: '小同志！你可算来了！刚才锄头刚凿开墙壁，就喷出蓝火，跟鬼火似的！吓死人了！',
                    choices: [
                        { text: '别慌，让我检查一下', action: () => this.startTask1() },
                     
                    ]
                });
            }
        });
    }
    
    startTask1() {
        this.showTask({
            title: '气体检测',
 
            content: `
                <div style="text-align: center; margin: 20px 0;">
                    <div id="gas-detector" style="width: 150px; height: 150px; background: #333; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 3px solid #666;">
                        <i class="fas fa-gas-pump" style="font-size: 4rem; color: #aaa;"></i>
                    </div>
                    <p>气体检测仪</p>
                    <div id="detector-readings" style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.5); border-radius: 10px; display: none;">
                        <h4 style="color: #ff9800; margin-bottom: 10px;">检测结果</h4>
                        <p>甲烷含量: <span id="methane-level" style="color: #ff4444; font-weight: bold;">0%</span></p>
                        <p>氧气含量: 19%</p>
                        <p>二氧化碳: 2%</p>
                    </div>
                </div>
            `,
            onComplete: () => {
                this.hideTask();
                // 显示第1题
                this.showQuizInChapter(1);
            }
        });
        
        // 设置检测仪点击事件
        setTimeout(() => {
            const gasDetector = document.getElementById('gas-detector');
            if (gasDetector) {
                gasDetector.addEventListener('click', () => {
                    const readings = document.getElementById('detector-readings');
                    const methaneLevel = document.getElementById('methane-level');
                    
                    // 显示读数
                    readings.style.display = 'block';
                    
                    // 模拟甲烷含量上升
                    let level = 0;
                    const interval = setInterval(() => {
                        level += 5;
                        methaneLevel.textContent = `${level}%`;
                        methaneLevel.style.color = level > 50 ? '#ff4444' : '#ff9800';
                        
                        if (level >= 85) {
                            clearInterval(interval);
                            methaneLevel.textContent = '85%';
                            methaneLevel.style.color = '#ff4444';
                            
                            // 启用提交按钮
                            document.getElementById('submit-task').disabled = false;
                        }
                    }, 100);
                });
            }
        }, 100);
    }
    
    // 第二章：九层之台
    playChapter2() {
       
        
        // 添加考古队长NPC
        this.addInteractiveElement({
            id: 'professor-zhang',
            icon: 'fas fa-user-tie',
            name: '张教授',
            top: '40%',
            left: '50%',
            color: '#4caf50',
            onClick: () => {
                this.hideInteractionHint();
                this.showDialogue({
                    speakerName: '张教授',
                    speakerTitle: '考古队队长',
                    avatarIcon: 'fas fa-user-tie',
                    text: '这墓室构造有玄机！你看这分层结构，先是厚厚的白膏泥，然后是木炭层，最后才是棺椁。这是古人智慧的体现！',
                    choices: [
                        { text: '让我看看分层结构', action: () => this.startTask2() },
                        
                    ]
                });
            }
        });
    }
    
    startTask2() {
        this.showTask({
            title: '清理填土层',
            description: '按照顺序清理墓道入口的填土层。',
            content: `
                <div style="text-align: center; margin: 20px 0;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                        <div id="white-clay-layer" class="task-option" data-layer="white-clay" style="width: 200px; padding: 15px; background: #f5f5f5; border-radius: 10px; cursor: pointer;">
                            <h4 style="color: #333; margin-bottom: 5px;">白膏泥层</h4>
                            <p style="color: #666; font-size: 0.9rem;">白色黏土，防水密封</p>
                        </div>
                        <div id="charcoal-layer" class="task-option" data-layer="charcoal" style="width: 200px; padding: 15px; background: #333; color: white; border-radius: 10px; cursor: pointer;">
                            <h4 style="margin-bottom: 5px;">木炭层</h4>
                            <p style="color: #aaa; font-size: 0.9rem;">吸潮防虫，调节湿度</p>
                        </div>
                    </div>
                    <div id="removal-order" style="margin-top: 30px;">
                        <h4 style="color: #ff9800; margin-bottom: 10px;">清理顺序</h4>
                        <div style="display: flex; justify-content: center; gap: 10px; min-height: 60px;">
                            <!-- 顺序将在这里显示 -->
                        </div>
                    </div>
                </div>
            `,
            onComplete: () => {
                this.hideTask();
                // 显示第2题
                this.showQuizInChapter(2);
            }
        });
        
        // 设置图层点击事件
        setTimeout(() => {
            let selectedLayers = [];
            
            document.querySelectorAll('.task-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const layer = e.currentTarget.dataset.layer;
                    
                    // 如果已经选中，取消选择
                    const index = selectedLayers.indexOf(layer);
                    if (index > -1) {
                        selectedLayers.splice(index, 1);
                        e.currentTarget.classList.remove('selected');
                    } else {
                        // 只能选择两个
                        if (selectedLayers.length < 2) {
                            selectedLayers.push(layer);
                            e.currentTarget.classList.add('selected');
                        }
                    }
                    
                    // 更新显示的顺序
                    const orderContainer = document.querySelector('#removal-order > div');
                    if (orderContainer) {
                        orderContainer.innerHTML = '';
                        
                        selectedLayers.forEach((selectedLayer, idx) => {
                            const layerName = selectedLayer === 'white-clay' ? '白膏泥' : '木炭';
                            const layerDiv = document.createElement('div');
                            layerDiv.style.padding = '10px 15px';
                            layerDiv.style.background = idx === 0 ? '#ff9800' : '#4caf50';
                            layerDiv.style.color = 'white';
                            layerDiv.style.borderRadius = '5px';
                            layerDiv.textContent = `${idx + 1}. ${layerName}`;
                            orderContainer.appendChild(layerDiv);
                        });
                        
                        // 如果选择了两个，启用提交按钮
                        if (selectedLayers.length === 2) {
                            document.getElementById('submit-task').disabled = false;
                        }
                    }
                });
            });
        }, 100);
    }
    
// 第三章：帛画之谜
    playChapter3() {
        // 解锁文物：T形帛画
        this.state.unlockArtifact('t-shaped-silk');
        
        // 设置场景背景（主墓室）
        document
.getElementById('scene-background').style.background = 'linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)';
        

        
        // 清空场景元素
        document
.getElementById('scene-background').innerHTML = '';
        
        // 模拟帛画NPC
        const silkPaintingArea = document.createElement('div');
        silkPaintingArea
.id = 't-shaped-silk';
        silkPaintingArea
.style.position = 'absolute';
        silkPaintingArea
.style.top = '50%';
        silkPaintingArea
.style.left = '50%';
        silkPaintingArea
.style.transform = 'translate(-50%, -50%)';
        silkPaintingArea
.style.width = '150px';
        silkPaintingArea
.style.height = '200px';
        silkPaintingArea
.style.cursor = 'pointer';
        silkPaintingArea
.style.textAlign = 'center';
        silkPaintingArea
.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-scroll" style="font-size: 5rem; color: #ffeb3b; text-shadow: 0 0 10px rgba(255, 235, 59, 0.7);"></i>
                <p style="margin-top: 10px; color: white;">T形帛画</p>
            </div>
        `;
        
        // 添加点击事件
        silkPaintingArea
.onclick = () => {
            this.hideInteractionHint();
            
            // 显示选择：直接查看文物或玩拼图
            this.showDialogue({
                speakerName: '辛追夫人',
                speakerTitle: '轪侯利苍之妻',
                text: '此画载我升天之路，你想仔细研究它的结构吗？',
                choices: [
                    { 
                        text: 'T形帛画', 
                        action: () => this.startTShapePuzzle() 
                    }
                ]
            });
        };
        
        // 添加到场景
        document
.getElementById('scene-background').appendChild(silkPaintingArea);
    }
    // T形帛画拼图游戏
    startTShapePuzzle() {
        this.showTask({
            title: 'T形帛画拼图',
            description: 'T形帛画由三块碎片组成，请将碎片拖放到正确位置，还原帛画原貌：',
            content: `
                <div style="text-align: center; margin: 20px 0;">
                    <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                        <p style="color: #a3d9ff;">T形帛画由三部分组成，请将下面的碎片拖放到上方的T形轮廓中：</p>
                        <p style="color: #ffd700; font-size: 0.9rem; margin-top: 5px;">
                            <i class="fas fa-lightbulb"></i> 提示：上部较宽的是天界，中部和下部略窄
                        </p>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                        <!-- T形拼图轮廓区域 -->
                        <div style="position: relative; width: 220px; height: 320px; 
                                    border: 3px dashed rgba(255, 215, 0, 0.3); 
                                    border-radius: 15px; background: rgba(0, 0, 0, 0.2);
                                    margin-bottom: 10px;">
                            <!-- 天界轮廓（上部较宽） -->
                            <div id="drop-zone-天界" class="drop-zone" data-piece="天界" 
                                 style="position: absolute; top: 20px; left: 10px; width: 200px; height: 120px;
                                        border: 2px dashed rgba(187, 222, 251, 0.3); 
                                        border-radius: 10px 10px 0 0;">
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                                            color: rgba(187, 222, 251, 0.5); font-weight: bold; font-size: 0.9rem;">
                                    放置碎片
                                </div>
                            </div>
                            
                            <!-- 人间轮廓（中部较窄） -->
                            <div id="drop-zone-人间" class="drop-zone" data-piece="人间"
                                 style="position: absolute; top: 140px; left: 60px; width: 100px; height: 80px;
                                        border: 2px dashed rgba(200, 230, 201, 0.3);">
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                                            color: rgba(200, 230, 201, 0.5); font-weight: bold; font-size: 0.9rem;">
                                    放置碎片
                                </div>
                            </div>
                            
                            <!-- 冥界轮廓（下部较窄） -->
                            <div id="drop-zone-冥界" class="drop-zone" data-piece="冥界"
                                 style="position: absolute; top: 220px; left: 60px; width: 100px; height: 100px;
                                        border: 2px dashed rgba(225, 190, 231, 0.3); 
                                        border-radius: 0 0 10px 10px;">
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                                            color: rgba(225, 190, 231, 0.5); font-weight: bold; font-size: 0.9rem;">
                                    放置碎片
                                </div>
                            </div>
                        </div>
                        
                        <!-- 已放置碎片显示 -->
                        <div id="placed-pieces" style="width: 100%; margin: 10px 0;">
                            <h4 style="color: #ffd700; margin-bottom: 10px; text-align: center;">
                                <i class="fas fa-check-circle" style="margin-right: 8px;"></i>已正确放置
                            </h4>
                            <div id="placed-pieces-container" style="display: flex; justify-content: center; gap: 10px; min-height: 50px;">
                                <div style="padding: 12px; color: rgba(255, 255, 255, 0.4); font-style: italic; font-size: 0.9rem;">
                                    请将碎片拖放到上方轮廓中
                                </div>
                            </div>
                        </div>
                        
                        <!-- 可拖动的拼图碎片 -->
                        <div id="puzzle-pieces-container" style="margin: 20px 0;">
                            <h4 style="color: #a3d9ff; margin-bottom: 15px; text-align: center;">
                                <i class="fas fa-puzzle-piece" style="margin-right: 8px;"></i>拼图碎片
                            </h4>
                            <div id="puzzle-pieces" style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                                <!-- 天界碎片 -->
                                <div class="puzzle-piece" id="piece-天界" data-piece="天界" draggable="true"
                                     style="width: 110px; height: 65px; cursor: grab; user-select: none;
                                            background: linear-gradient(135deg, #1a237e, #283593);
                                            border-radius: 10px 10px 0 0; border: 3px solid #5c6bc0;
                                            display: flex; flex-direction: column; align-items: center; justify-content: center;
                                            box-shadow: 0 4px 8px rgba(0,0,0,0.4); transition: all 0.3s;">
                                    <i class="fas fa-sun" style="font-size: 1.3rem; color: #bbdefb; margin-bottom: 5px;"></i>
                                    <div style="color: #e3f2fd; font-weight: bold; font-size: 0.85rem;">天界</div>
                                    <div style="color: #bbdefb; font-size: 0.7rem; margin-top: 3px;">较宽</div>
                                </div>
                                
                                <!-- 人间碎片 -->
                                <div class="puzzle-piece" id="piece-人间" data-piece="人间" draggable="true"
                                     style="width: 75px; height: 45px; cursor: grab; user-select: none;
                                            background: linear-gradient(135deg, #1b5e20, #2e7d32);
                                            border: 3px solid #66bb6a;
                                            display: flex; flex-direction: column; align-items: center; justify-content: center;
                                            box-shadow: 0 4px 8px rgba(0,0,0,0.4); transition: all 0.3s;">
                                    <i class="fas fa-users" style="font-size: 1rem; color: #c8e6c9; margin-bottom: 3px;"></i>
                                    <div style="color: #e8f5e9; font-weight: bold; font-size: 0.8rem;">人间</div>
                                    <div style="color: #c8e6c9; font-size: 0.65rem; margin-top: 2px;">较窄</div>
                                </div>
                                
                                <!-- 冥界碎片 -->
                                <div class="puzzle-piece" id="piece-冥界" data-piece="冥界" draggable="true"
                                     style="width: 75px; height: 55px; cursor: grab; user-select: none;
                                            background: linear-gradient(135deg, #4a148c, #6a1b9a);
                                            border-radius: 0 0 10px 10px; border: 3px solid #ab47bc;
                                            display: flex; flex-direction: column; align-items: center; justify-content: center;
                                            box-shadow: 0 4px 8px rgba(0,0,0,0.4); transition: all 0.3s;">
                                    <i class="fas fa-skull" style="font-size: 1rem; color: #e1bee7; margin-bottom: 3px;"></i>
                                    <div style="color: #f3e5f5; font-weight: bold; font-size: 0.8rem;">冥界</div>
                                    <div style="color: #e1bee7; font-size: 0.65rem; margin-top: 2px;">较窄</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 操作按钮 -->
                        <div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px;">
                            <button id="reset-puzzle" class="btn-secondary" style="padding: 10px 20px;">
                                <i class="fas fa-redo"></i> 重新开始
                            </button>
                            <button id="hint-puzzle" class="btn-secondary" style="padding: 10px 20px;">
                                <i class="fas fa-lightbulb"></i> 获取提示
                            </button>
                        </div>
                    </div>
                    
                    <!-- 操作提示 -->
                    <div style="margin-top: 25px; padding: 12px; background: rgba(255, 215, 0, 0.08); 
                                border-radius: 8px; border: 1px solid rgba(255, 215, 0, 0.2);">
                        <p style="color: #ffd700; margin: 0; font-size: 0.85rem; text-align: center;">
                            <i class="fas fa-mouse-pointer" style="margin-right: 8px;"></i>
                            拖动碎片到上方的T形轮廓中，正确放置后碎片会锁定
                        </p>
                    </div>
                </div>
            `,
            onComplete: () => {
                this.hideTask();
                // 拼图完成后显示奖励对话
                this.showDialogue({
                    speakerName: '辛追夫人',
                    speakerTitle: '轪侯利苍之妻',
                    avatarIcon: 'fas fa-female',
                    text: '你成功还原了T形帛画！这幅画上部较宽为天界，中部和下部略窄分别为人间和冥界，正是我升天之路的指引...',
                    choices: [
                        { 
                            text: '继续了解帛画的含义', 
                            action: () => this.showQuizInChapter(3) 
                        }
                    ]
                });
            }
        });
        
        // 初始化拼图交互
        setTimeout(() => {
            this.initPuzzleInteraction();
        }, 100);
    }
    
    // 初始化拼图交互逻辑
    initPuzzleInteraction() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        const dropZones = document.querySelectorAll('.drop-zone');
        const placedContainer = document.getElementById('placed-pieces-container');
        const submitBtn = document.getElementById('submit-task');
        const resetBtn = document.getElementById('reset-puzzle');
        const hintBtn = document.getElementById('hint-puzzle');
        
        // 存储已正确放置的碎片
        let placedPieces = {
            '天界': false,
            '人间': false,
            '冥界': false
        };
        
        // 当前被拖动的元素
        let draggedPiece = null;
        
        // 为每个碎片添加拖拽事件
        pieces
.forEach(piece => {
            piece
.addEventListener('dragstart', (e) => {
                // 如果已经放置正确，不能再次拖动
                if (piece.style.opacity === '0.5') {
                    e
.preventDefault();
                    return;
                }
                
                draggedPiece 
= piece;
                e
.dataTransfer.setData('text/plain', piece.dataset.piece);
                piece
.style.opacity = '0.7';
                piece
.style.boxShadow = '0 8px 16px rgba(0,0,0,0.6)';
                
                // 添加拖动效果类
                setTimeout(() => {
                    piece
.style.display = 'none';
                }, 0);
            });
            
            piece
.addEventListener('dragend', () => {
                pieces
.forEach(p => {
                    p
.style.opacity = '1';
                    p
.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
                    p
.style.display = 'flex';
                });
                draggedPiece 
= null;
            });
        });
        
        // 为每个放置区域添加事件
        dropZones
.forEach(zone => {
            zone
.addEventListener('dragover', (e) => {
                e
.preventDefault();
                const targetPiece = e.target.dataset.piece;
                
                // 高亮显示正确的放置区域
                if (draggedPiece && draggedPiece.dataset.piece === targetPiece) {
                    zone
.style.border = '2px dashed #4caf50';
                    zone
.style.background = 'rgba(76, 175, 80, 0.1)';
                } else if (draggedPiece) {
                    zone
.style.border = '2px dashed #f44336';
                    zone
.style.background = 'rgba(244, 67, 54, 0.1)';
                }
            });
            
            zone
.addEventListener('dragleave', () => {
                // 恢复原始样式
                const pieceType = zone.dataset.piece;
                let borderColor, bgColor;
                
                if (pieceType === '天界') {
                    borderColor 
= 'rgba(187, 222, 251, 0.3)';
                } else if (pieceType === '人间') {
                    borderColor 
= 'rgba(200, 230, 201, 0.3)';
                } else {
                    borderColor 
= 'rgba(225, 190, 231, 0.3)';
                }
                
                zone
.style.border = `2px dashed ${borderColor}`;
                zone
.style.background = 'transparent';
            });
            
            zone
.addEventListener('drop', (e) => {
                e
.preventDefault();
                const zonePiece = zone.dataset.piece;
                const draggedPieceName = draggedPiece ? draggedPiece.dataset.piece : null;
                
                // 检查是否匹配
                if (draggedPieceName && draggedPieceName === zonePiece) {
                    // 放置正确
                    placePieceCorrectly(draggedPiece, zone);
                } else if (draggedPieceName) {
                    // 放置错误
                    showPlacementFeedback(false, `这是${draggedPieceName}碎片，应该放在${draggedPieceName}区域`);
                }
                
                // 恢复区域样式
                const pieceType = zone.dataset.piece;
                let borderColor;
                if (pieceType === '天界') {
                    borderColor 
= 'rgba(187, 222, 251, 0.3)';
                } else if (pieceType === '人间') {
                    borderColor 
= 'rgba(200, 230, 201, 0.3)';
                } else {
                    borderColor 
= 'rgba(225, 190, 231, 0.3)';
                }
                
                zone
.style.border = `2px dashed ${borderColor}`;
                zone
.style.background = 'transparent';
            });
        });
        
        // 正确放置碎片
        function placePieceCorrectly(piece, zone) {
            const pieceName = piece.dataset.piece;
            
            // 标记为已放置
            placedPieces
[pieceName] = true;
            
            // 移动碎片到放置区域
            const zoneRect = zone.getBoundingClientRect();
            const containerRect = zone.parentElement.getBoundingClientRect();
            
            // 计算相对位置
            piece
.style.position = 'absolute';
            piece
.style.top = `${zoneRect.top - containerRect.top}px`;
            piece
.style.left = `${zoneRect.left - containerRect.left}px`;
            piece
.style.width = `${zoneRect.width}px`;
            piece
.style.height = `${zoneRect.height}px`;
            piece
.style.cursor = 'default';
            piece
.style.opacity = '0.5'; // 半透明表示已放置
            piece
.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.7)';
            piece
.style.zIndex = '10';
            piece
.style.pointerEvents = 'none';
            
            // 将碎片移动到轮廓容器中
            zone
.parentElement.appendChild(piece);
            
            // 更新显示
            updatePlacedDisplay();
            
            // 显示成功反馈
            showPlacementFeedback(true, `正确放置了${pieceName}碎片！`);
            
            // 检查是否完成
            checkPuzzleCompletion();
        }
        
        // 更新已放置碎片显示
        function updatePlacedDisplay() {
            if (!placedContainer) return;
            
            placedContainer
.innerHTML = '';
            
            // 按顺序显示已放置的碎片
            const order = ['天界', '人间', '冥界'];
            let hasPlaced = false;
            
            order
.forEach(pieceName => {
                if (placedPieces[pieceName]) {
                    hasPlaced 
= true;
                    
                    const pieceDiv = document.createElement('div');
                    let bgColor, icon, textColor;
                    
                    if (pieceName === '天界') {
                        bgColor 
= '#1a237e';
                        icon 
= 'fas fa-sun';
                        textColor 
= '#bbdefb';
                    } else if (pieceName === '人间') {
                        bgColor 
= '#1b5e20';
                        icon 
= 'fas fa-users';
                        textColor 
= '#c8e6c9';
                    } else {
                        bgColor 
= '#4a148c';
                        icon 
= 'fas fa-skull';
                        textColor 
= '#e1bee7';
                    }
                    
                    pieceDiv
.style.cssText = `
                        padding: 8px 12px;
                        background: 
${bgColor}
;
                        color: white;
                        border-radius: 6px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
                        font-size: 0.85rem;
                    `;
                    
                    pieceDiv
.innerHTML = `
                        <i class="
${icon}" style="color: ${textColor}
;"></i>
                        <span>
${pieceName}
</span>
                        <i class="fas fa-check" style="color: #4caf50; margin-left: 4px; font-size: 0.8rem;"></i>
                    `;
                    
                    placedContainer
.appendChild(pieceDiv);
                }
            });
            
            // 如果没有放置任何碎片
            if (!hasPlaced) {
                placedContainer
.innerHTML = `
                    <div style="padding: 12px; color: rgba(255, 255, 255, 0.4); font-style: italic; font-size: 0.9rem;">
                        请将碎片拖放到上方轮廓中
                    </div>
                `;
            }
        }
        
        // 检查拼图是否完成
        function checkPuzzleCompletion() {
            const allPlaced = Object.values(placedPieces).every(placed => placed);
            
            if (allPlaced && submitBtn) {
                submitBtn
.disabled = false;
                submitBtn
.innerHTML = '<i class="fas fa-trophy"></i> 拼图完成！点击继续';
                submitBtn
.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
                
                // 显示完成动画
                showPlacementFeedback(true, '恭喜！你成功还原了T形帛画！', true);
            }
        }
        
        // 显示放置反馈
        function showPlacementFeedback(isSuccess, message, isFinal = false) {
            // 创建反馈元素
            const feedback = document.createElement('div');
            feedback
.style.cssText = `
                position: fixed;
                top: 
${isFinal ? '40%' : '20%'}
;
                left: 50%;
                transform: translateX(-50%);
                background: 
${isSuccess ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'}
;
                color: white;
                padding: 
${isFinal ? '20px 30px' : '12px 20px'}
;
                border-radius: 
${isFinal ? '15px' : '10px'}
;
                z-index: 2000;
                font-weight: bold;
                box-shadow: 0 6px 20px rgba(0,0,0,0.4);
                text-align: center;
                max-width: 80%;
                animation: fadeIn 0.3s;
                font-size: 
${isFinal ? '1.1rem' : '0.95rem'}
;
                border: 
${isFinal ? '3px solid #ffd700' : 'none'}
;
            `;
            
            feedback
.innerHTML = `
                <i class="fas fa-
${isSuccess ? (isFinal ? 'trophy' : 'check-circle') : 'exclamation-triangle'}
" 
                   style="margin-right: 10px; 
${isFinal ? 'font-size: 1.3rem;' : ''}
"></i>
                ${message}
            `;
            
            document
.body.appendChild(feedback);
            
            // 自动移除
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback
.style.opacity = '0';
                    feedback
.style.transition = 'opacity 0.5s';
                    setTimeout(() => {
                        if (feedback.parentNode) {
                            document
.body.removeChild(feedback);
                        }
                    }, 500);
                }
            }, isFinal ? 4000 : 2000);
        }
        
        // 重置按钮功能
        if (resetBtn) {
            resetBtn
.addEventListener('click', () => {
                // 重置状态
                placedPieces 
= {
                    '天界': false,
                    '人间': false,
                    '冥界': false
                };
                
                // 重置所有碎片
                pieces
.forEach(piece => {
                    // 将碎片移回原容器
                    document
.getElementById('puzzle-pieces').appendChild(piece);
                    
                    // 重置样式
                    piece
.style.cssText = '';
                    
                    // 恢复原始样式
                    const pieceName = piece.dataset.piece;
                    if (pieceName === '天界') {
                        piece
.style.cssText = `
                            width: 110px; height: 65px; cursor: grab; user-select: none;
                            background: linear-gradient(135deg, #1a237e, #283593);
                            border-radius: 10px 10px 0 0; border: 3px solid #5c6bc0;
                            display: flex; flex-direction: column; align-items: center; justify-content: center;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.4); transition: all 0.3s;
                        `;
                    } else if (pieceName === '人间') {
                        piece
.style.cssText = `
                            width: 75px; height: 45px; cursor: grab; user-select: none;
                            background: linear-gradient(135deg, #1b5e20, #2e7d32);
                            border: 3px solid #66bb6a;
                            display: flex; flex-direction: column; align-items: center; justify-content: center;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.4); transition: all 0.3s;
                        `;
                    } else {
                        piece
.style.cssText = `
                            width: 75px; height: 55px; cursor: grab; user-select: none;
                            background: linear-gradient(135deg, #4a148c, #6a1b9a);
                            border-radius: 0 0 10px 10px; border: 3px solid #ab47bc;
                            display: flex; flex-direction: column; align-items: center; justify-content: center;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.4); transition: all 0.3s;
                        `;
                    }
                    
                    // 恢复拖拽功能
                    piece
.draggable = true;
                });
                
                // 重置放置区域样式
                dropZones
.forEach(zone => {
                    const pieceType = zone.dataset.piece;
                    let borderColor;
                    if (pieceType === '天界') {
                        borderColor 
= 'rgba(187, 222, 251, 0.3)';
                    } else if (pieceType === '人间') {
                        borderColor 
= 'rgba(200, 230, 201, 0.3)';
                    } else {
                        borderColor 
= 'rgba(225, 190, 231, 0.3)';
                    }
                    
                    zone
.style.border = `2px dashed ${borderColor}`;
                    zone
.style.background = 'transparent';
                });
                
                // 更新显示
                updatePlacedDisplay();
                
                // 重置提交按钮
                if (submitBtn) {
                    submitBtn
.disabled = true;
                    submitBtn
.innerHTML = '<i class="fas fa-check-circle"></i> 提交任务';
                    submitBtn
.style.background = '';
                }
                
                // 显示重置提示
                showPlacementFeedback(true, '拼图已重置，请重新开始');
            });
        }
        
        // 提示按钮功能
        if (hintBtn) {
            hintBtn
.addEventListener('click', () => {
                this.showDialogue({
                    speakerName: '提示',
                    speakerTitle: '游戏提示',
                    avatarIcon: 'fas fa-lightbulb',
                    text: `
                        T形帛画拼图提示：<br><br>
                        <strong>形状特征：</strong><br>
                        • 上部较宽 → 天界（日月神祇）<br>
                        • 中部较窄 → 人间（祭祀场景）<br>
                        • 下部较窄 → 冥界（地祇托举）<br><br>
                        <strong>正确顺序：</strong><br>
                        从上到下：天界 → 人间 → 冥界<br><br>
                        <strong>操作方法：</strong><br>
                        拖动碎片到上方对应的T形轮廓区域中
                    `,
                    choices: [
                        { text: '明白了，继续拼图', action: () => {} }
                    ]
                });
            });
        }
        
        // 初始化显示
        updatePlacedDisplay();
        
        // 确保提交按钮初始为禁用状态
        if (submitBtn) {
            submitBtn
.disabled = true;
        }
    }
        // 第四章：文物修复室
    playChapter4() {
        // 解锁文物：轪侯之印、漆盘、素纱单衣、驻军图
        this.state.unlockArtifact('seal');
        this.state.unlockArtifact('lacquerware');
        this.state.unlockArtifact('plain-gauze-gown');
        this.state.unlockArtifact('map');
        
   
        
        // 添加修复台交互元素
        this.addInteractiveElement({
            id: 'repair-table',
            icon: 'fas fa-tools',
            name: '修复台',
            top: '50%',
            left: '50%',
            color: '#3498db',
            onClick: () => {
                this.hideInteractionHint();
                this.showDialogue({
                    speakerName: '陈姐',
                    speakerTitle: '文物修复专家',
                    avatarIcon: 'fas fa-user-md',
                    text: '看这漆盘上的"成市□"戳记和"君幸食"铭文，暗藏着产地和用途的密码！旁边还有素纱单衣和《驻军图》...',
                    choices: [
                        { text: '"成市□"是什么意思？', action: () => this.showQuizInChapter(7) },
                        { text: '"君幸食"怎么翻译？', action: () => this.showQuizInChapter(13) },
                        { text: '这个印章是？', action: () => this.showQuizInChapter(4) },
                        { text: '素纱单衣有多重？', action: () => this.showQuizInChapter(6) },
                        { text: '《驻军图》是什么？', action: () => this.showQuizInChapter(10) },
                        { text: '继续探索', action: () => this.advanceToChapter(5) }
                    ]
                });
            }
        });
    }
    // 第五章：弦外之音
    playChapter5() {
        // 解锁文物：二十五弦瑟
        this.state.unlockArtifact('se');
        
     
        
        // 添加乐器交互元素
        this.addInteractiveElement({
            id: 'instruments',
            icon: 'fas fa-music',
            name: '乐器库',
            top: '65%',
            left: '50%',
            color: '#e74c3c',
            onClick: () => {
                this.hideInteractionHint();
                this.showDialogue({
                    speakerName: '乐师亡魂',
                    speakerTitle: '汉代宫廷乐师',
                    avatarIcon: 'fas fa-ghost',
                    text: '听，二十五弦瑟自鸣而响...这是一张珍贵的西汉瑟，可惜部分琴弦断裂了，需要修复才能重新奏响...',
                    choices: [
                        { text: '我想修复二十五弦瑟', action: () => this.startSeRepairTask() },
                    
                        { text: '继续前进', action: () => this.advanceToChapter(6) }
                    ]
                });
            }
        });
    }
  
    // 二十五弦瑟修复任务（简化版互动）
    startSeRepairTask() {
        this.showTask({
            title: '修复二十五弦瑟',
            description: '这是一张西汉二十五弦瑟，部分琴弦断裂。请按照提示顺序点击琴弦，修复这张古瑟：',
            content: `
                <div style="text-align: center; margin: 20px 0;">
                    <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                        <p style="color: #a3d9ff;">
                            <i class="fas fa-music" style="margin-right: 8px;"></i>
                            请按照下方提示的顺序点击琴弦，每根弦都有不同的音高
                        </p>
                        <p style="color: #ffd700; font-size: 0.9rem; margin-top: 8px;">
                            <i class="fas fa-lightbulb"></i> 提示：琴弦从左到右音高逐渐升高
                        </p>
                    </div>
                    
                    <!-- 瑟身和琴弦 -->
                    <div style="position: relative; width: 90%; max-width: 500px; height: 200px; 
                                margin: 0 auto 30px; background: linear-gradient(to bottom, #8d6e63, #6d4c41);
                                border-radius: 10px; padding: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
                        <div style="position: absolute; top: 10px; left: 0; width: 100%; height: 180px; 
                                    display: flex; justify-content: space-around; align-items: flex-start;">
                            <!-- 25根琴弦 -->
                            ${Array.from({length: 25}, (_, i) => `
                                <div class="se-string" data-string="${i + 1}" 
                                     style="position: relative; width: 12px; cursor: pointer;">
                                    <div class="string-line" 
                                         style="width: 2px; height: 160px; background: linear-gradient(to bottom, #d7ccc8, #8d6e63);
                                                margin: 0 auto; border-radius: 1px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                                    </div>
                                    <div class="string-knot" 
                                         style="position: absolute; top: 0; left: 50%; transform: translateX(-50%);
                                                width: 8px; height: 8px; background: #ffd700; border-radius: 50%;
                                                box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);">
                                    </div>
                                    <div class="string-number" 
                                         style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%);
                                                color: #fff; font-size: 0.7rem; font-weight: bold; width: 20px; text-align: center;">
                                        ${i + 1}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- 瑟身装饰 -->
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                                    color: rgba(255, 255, 255, 0.1); font-size: 2rem;">
                            <i class="fas fa-music"></i>
                        </div>
                    </div>
                    
                    <!-- 提示序列显示 -->
                    <div id="sequence-display" style="margin: 25px 0;">
                        <h4 style="color: #ffd700; margin-bottom: 15px;">
                            <i class="fas fa-list-ol" style="margin-right: 10px;"></i>修复序列
                        </h4>
                        <div id="target-sequence" style="
                            display: flex;
                            justify-content: center;
                            gap: 8px;
                            flex-wrap: wrap;
                            margin-bottom: 15px;
                            min-height: 50px;
                        ">
                            <!-- 目标序列会在这里动态生成 -->
                        </div>
                        <div id="current-sequence" style="
                            display: flex;
                            justify-content: center;
                            gap: 8px;
                            flex-wrap: wrap;
                            min-height: 50px;
                            padding: 15px;
                            background: rgba(255, 255, 255, 0.05);
                            border-radius: 10px;
                        ">
                            <div style="color: rgba(255, 255, 255, 0.5); font-style: italic;">
                                请按照上方序列点击琴弦
                            </div>
                        </div>
                    </div>
                    
                    <!-- 反馈信息 -->
                    <div id="feedback-area" style="
                        margin: 20px 0;
                        padding: 15px;
                        background: rgba(255, 215, 0, 0.1);
                        border-radius: 10px;
                        min-height: 60px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    ">
                        <p id="task-feedback" style="color: #a3d9ff; margin: 0; text-align: center;">
                            请点击"开始修复"按钮，然后按顺序点击琴弦
                        </p>
                        <div id="progress-info" style="margin-top: 10px; color: #ffd700; font-size: 0.9rem;">
                            进度: <span id="progress-count">0</span>/<span id="total-steps">8</span>
                        </div>
                    </div>
                    
                    <!-- 控制按钮 -->
                    <div style="margin-top: 25px; display: flex; justify-content: center; gap: 15px;">
                        <button id="start-sequence" class="btn-primary" style="padding: 12px 25px;">
                            <i class="fas fa-play"></i> 开始修复
                        </button>
                        <button id="reset-sequence" class="btn-secondary" style="padding: 12px 25px;">
                            <i class="fas fa-redo"></i> 重新开始
                        </button>
                        <button id="hint-sequence" class="btn-secondary" style="padding: 12px 25px;">
                            <i class="fas fa-lightbulb"></i> 获取提示
                        </button>
                    </div>
                </div>
            `,
            onComplete: () => {
                this.hideTask();
                // 任务完成后显示对话
                this.showDialogue({
                    speakerName: '乐师亡魂',
                    speakerTitle: '汉代宫廷乐师',
                    avatarIcon: 'fas fa-ghost',
                    text: '太棒了！你成功修复了这张二十五弦瑟。这是西汉初期唯一完整的瑟，25根弦的音阶排列非常精巧，现在可以重新奏响汉代雅乐了！',
                    choices: [
                        { 
                            text: '继续了解汉代音乐', 
                            action: () => this.showQuizInChapter(8) 
                        },
                        { 
                            text: '返回乐器库', 
                            action: () => {
                                this.hideDialogue();
                                // 重新显示第五章场景
                                this.playChapter5();
                            }
                        }
                    ]
                });
            }
        });
        
        // 初始化瑟修复互动
        setTimeout(() => {
            this.initSeRepairInteraction();
        }, 100);
    }
    
    // 初始化二十五弦瑟修复互动（简化版）
    initSeRepairInteraction() {
        console.log('开始初始化瑟修复互动');
        
        // 游戏参数（简化版，移除了节奏相关参数）
        const sequence = [1, 5, 8, 12, 15, 19, 22, 25]; // 修复序列（8个步骤）
        let currentStep = 0;
        let playerSequence = [];
        let isPlaying = false;
        
        // DOM元素 - 使用更可靠的获取方式
        setTimeout(() => {
            console.log('开始获取DOM元素');
            
            const strings = document.querySelectorAll('.se-string');
            const targetSequenceEl = document.getElementById('target-sequence');
            const currentSequenceEl = document.getElementById('current-sequence');
            const feedbackEl = document.getElementById('task-feedback');
            const progressCountEl = document.getElementById('progress-count');
            const totalStepsEl = document.getElementById('total-steps');
            const startBtn = document.getElementById('start-sequence');
            const resetBtn = document.getElementById('reset-sequence');
            const hintBtn = document.getElementById('hint-sequence');
            const submitBtn = document.getElementById('submit-task');
            
            console.log('找到琴弦数量:', strings.length);
            console.log('找到开始按钮:', startBtn ? '是' : '否');
            
            // 检查关键元素是否都找到了
            if (strings.length === 0) {
                console.error('没有找到琴弦元素！');
                showFeedback('加载错误：琴弦元素未找到', false);
                return;
            }
            
            // 初始化显示
            if (totalStepsEl) totalStepsEl.textContent = sequence.length;
            updateDisplay();
            
            // 生成目标序列显示
            if (targetSequenceEl) {
                sequence.forEach((stringNum, index) => {
                    const seqItem = document.createElement('div');
                    seqItem.className = 'sequence-item';
                    seqItem.style.cssText = `
                        width: 35px;
                        height: 35px;
                        background: linear-gradient(135deg, #1a237e, #283593);
                        color: white;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                        opacity: ${index === 0 ? 1 : 0.6};
                        transition: all 0.3s;
                    `;
                    seqItem.textContent = stringNum;
                    targetSequenceEl.appendChild(seqItem);
                });
            }
            
            // 为每根琴弦添加点击事件
            strings.forEach(string => {
                const stringNum = parseInt(string.dataset.string);
                
                // 添加点击事件
                string.addEventListener('click', handleStringClick);
                
                function handleStringClick() {
                    console.log('点击了琴弦:', stringNum);
                    
                    if (!isPlaying) {
                        showFeedback('请先点击"开始修复"按钮');
                        return;
                    }
                    
                    // 播放弦音（悦耳版）
                    playStringSound(stringNum);
                    
                    // 高亮显示被点击的弦
                    highlightString(string, true);
                    
                    // 记录玩家点击
                    playerSequence.push(stringNum);
                    
                    // 检查是否正确
                    checkStep();
                }
                
                // 添加悬停效果
                string.addEventListener('mouseenter', () => {
                    if (isPlaying) {
                        highlightString(string, false);
                    }
                });
                
                string.addEventListener('mouseleave', () => {
                    if (isPlaying) {
                        unhighlightString(string);
                    }
                });
            });
            
            // 播放弦音（悦耳版，使用标准音阶）
            function playStringSound(stringNum) {
                try {
                    // 使用标准音阶（C大调音阶），声音更悦耳
                    const standardNotes = [
                        261.63, // C4 (Do)
                        293.66, // D4 (Re)
                        329.63, // E4 (Mi)
                        349.23, // F4 (Fa)
                        392.00, // G4 (Sol)
                        440.00, // A4 (La)
                        493.88, // B4 (Si)
                        523.25, // C5 (Do高八度)
                        587.33, // D5 (Re高八度)
                        659.25  // E5 (Mi高八度)
                    ];
                    
                    const noteIndex = (stringNum - 1) % standardNotes.length;
                    const frequency = standardNotes[noteIndex];
                    
                    // 创建音频上下文
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    // 设置参数
                    oscillator.frequency.value = frequency;
                    oscillator.type = 'sine'; // 正弦波，最纯净的声音
                    
                    // 音量包络（快速起音，缓慢衰减）
                    const now = audioContext.currentTime;
                    gainNode.gain.setValueAtTime(0, now);
                    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05); // 降低音量
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8); // 延长衰减时间
                    
                    oscillator.start(now);
                    oscillator.stop(now + 0.8);
                    
                } catch (e) {
                    console.log('播放弦音:', stringNum);
                }
            }
            
            // 高亮琴弦
            function highlightString(stringElement, isClick = false) {
                const stringLine = stringElement.querySelector('.string-line');
                const stringKnot = stringElement.querySelector('.string-knot');
                
                if (stringLine) {
                    stringLine.style.background = isClick 
                        ? 'linear-gradient(to bottom, #ffd700, #ff9800)' 
                        : 'linear-gradient(to bottom, #bbdefb, #64b5f6)';
                    stringLine.style.boxShadow = isClick 
                        ? '0 0 15px rgba(255, 215, 0, 0.8)' 
                        : '0 0 10px rgba(187, 222, 251, 0.6)';
                    stringLine.style.transform = isClick ? 'scaleX(1.5)' : 'scaleX(1.2)';
                    stringLine.style.transition = 'all 0.1s';
                }
                
                if (stringKnot) {
                    stringKnot.style.background = isClick ? '#ff9800' : '#64b5f6';
                    stringKnot.style.boxShadow = isClick 
                        ? '0 0 15px rgba(255, 152, 0, 0.8)' 
                        : '0 0 10px rgba(100, 181, 246, 0.6)';
                    stringKnot.style.transform = isClick ? 'scale(1.5)' : 'scale(1.2)';
                }
                
                // 如果是点击，稍后恢复
                if (isClick) {
                    setTimeout(() => {
                        unhighlightString(stringElement);
                    }, 300);
                }
            }
            
            // 取消高亮
            function unhighlightString(stringElement) {
                const stringLine = stringElement.querySelector('.string-line');
                const stringKnot = stringElement.querySelector('.string-knot');
                
                if (stringLine) {
                    stringLine.style.background = 'linear-gradient(to bottom, #d7ccc8, #8d6e63)';
                    stringLine.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                    stringLine.style.transform = 'scaleX(1)';
                }
                
                if (stringKnot) {
                    stringKnot.style.background = '#ffd700';
                    stringKnot.style.boxShadow = '0 0 8px rgba(255, 215, 0, 0.5)';
                    stringKnot.style.transform = 'scale(1)';
                }
            }
            
            // 更新显示
            function updateDisplay() {
                // 更新进度
                if (progressCountEl) progressCountEl.textContent = currentStep;
                
                // 更新当前序列显示
                if (currentSequenceEl) {
                    currentSequenceEl.innerHTML = '';
                    
                    if (playerSequence.length === 0) {
                        currentSequenceEl.innerHTML = `
                            <div style="color: rgba(255, 255, 255, 0.5); font-style: italic;">
                                请按照上方序列点击琴弦
                            </div>
                        `;
                    } else {
                        playerSequence.forEach((stringNum, index) => {
                            const seqItem = document.createElement('div');
                            const isCorrect = stringNum === sequence[index];
                            
                            seqItem.style.cssText = `
                                width: 40px;
                                height: 40px;
                                background: ${isCorrect ? 'linear-gradient(135deg, #4caf50, #2e7d32)' : 'linear-gradient(135deg, #f44336, #c62828)'};
                                color: white;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: bold;
                                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                                font-size: 1.1rem;
                            `;
                            seqItem.textContent = stringNum;
                            currentSequenceEl.appendChild(seqItem);
                        });
                    }
                }
                
                // 高亮当前目标
                const targetItems = document.querySelectorAll('#target-sequence .sequence-item');
                targetItems.forEach((item, index) => {
                    item.style.opacity = index === currentStep ? '1' : '0.6';
                    item.style.transform = index === currentStep ? 'scale(1.1)' : 'scale(1)';
                    item.style.boxShadow = index === currentStep 
                        ? '0 0 15px rgba(255, 215, 0, 0.7)' 
                        : '0 4px 8px rgba(0,0,0,0.3)';
                });
            }
            
            // 检查步骤
            function checkStep() {
                const currentTarget = sequence[currentStep];
                const currentPlayer = playerSequence[currentStep];
                
                if (currentPlayer === currentTarget) {
                    // 正确
                    currentStep++;
                    
                    if (currentStep < sequence.length) {
                        // 还有下一步
                        showFeedback(`正确！请点击第${sequence[currentStep]}弦`, true);
                        updateDisplay();
                        
                    } else {
                        // 完成所有步骤
                        completeSequence();
                    }
                } else {
                    // 错误
                    showFeedback(`错误！应该是第${currentTarget}弦`, false);
                    
                    // 显示正确弦的高亮
                    const correctString = document.querySelector(`.se-string[data-string="${currentTarget}"]`);
                    if (correctString) {
                        highlightString(correctString, true);
                    }
                    
                    // 短暂延迟后重置当前步骤
                    setTimeout(() => {
                        playerSequence = [];
                        currentStep = 0;
                        updateDisplay();
                        showFeedback('顺序错误，请重新开始');
                    }, 1500);
                }
            }
            
            // 完成序列
            function completeSequence() {
                isPlaying = false;
                
                // 显示完成效果
                showFeedback('恭喜！你成功修复了二十五弦瑟！', true);
                
                // 启用提交按钮
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-trophy"></i> 修复完成！点击继续';
                    submitBtn.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
                }
                
                // 播放庆祝效果（使用更悦耳的音阶）
                playCelebration();
            }
            
            // 播放庆祝效果
            function playCelebration() {
                // 播放庆祝音效
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (C大三和弦)
                    
                    notes.forEach((freq, index) => {
                        setTimeout(() => {
                            const oscillator = audioContext.createOscillator();
                            const gainNode = audioContext.createGain();
                            
                            oscillator.connect(gainNode);
                            gainNode.connect(audioContext.destination);
                            
                            oscillator.frequency.value = freq;
                            oscillator.type = 'sine';
                            
                            const now = audioContext.currentTime;
                            gainNode.gain.setValueAtTime(0, now);
                            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
                            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
                            
                            oscillator.start(now);
                            oscillator.stop(now + 1.0);
                        }, index * 200);
                    });
                } catch (e) {
                    console.log('播放庆祝音效');
                }
                
                // 所有弦依次高亮
                strings.forEach((string, index) => {
                    setTimeout(() => {
                        highlightString(string, true);
                    }, index * 50);
                });
            }
            
            // 显示反馈信息
            function showFeedback(message, isSuccess = false) {
                if (feedbackEl) {
                    feedbackEl.textContent = message;
                    feedbackEl.style.color = isSuccess ? '#4caf50' : '#f44336';
                    
                    // 添加动画
                    feedbackEl.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        feedbackEl.style.transform = 'scale(1)';
                    }, 200);
                }
            }
            
            // 开始按钮功能
            if (startBtn) {
                startBtn.addEventListener('click', handleStartClick);
                
                function handleStartClick() {
                    console.log('点击了开始按钮');
                    if (isPlaying) return;
                    
                    isPlaying = true;
                    currentStep = 0;
                    playerSequence = [];
                    
                    // 禁用开始按钮
                    startBtn.disabled = true;
                    startBtn.innerHTML = '<i class="fas fa-play-circle"></i> 进行中...';
                    startBtn.style.opacity = '0.7';
                    
                    // 启用重置按钮
                    if (resetBtn) resetBtn.disabled = false;
                    
                    // 显示第一个提示
                    showFeedback(`请点击第${sequence[0]}弦`, true);
                    updateDisplay();
                }
            }
            
            // 重置按钮功能
            if (resetBtn) {
                resetBtn.disabled = true; // 初始禁用
                
                resetBtn.addEventListener('click', handleResetClick);
                
                function handleResetClick() {
                    console.log('点击了重置按钮');
                    isPlaying = false;
                    currentStep = 0;
                    playerSequence = [];
                    
                    // 重置按钮状态
                    if (startBtn) {
                        startBtn.disabled = false;
                        startBtn.innerHTML = '<i class="fas fa-play"></i> 开始修复';
                        startBtn.style.opacity = '1';
                    }
                    
                    resetBtn.disabled = true;
                    
                    // 重置显示
                    updateDisplay();
                    showFeedback('已重置，请点击"开始修复"重新开始');
                    
                    // 禁用提交按钮
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> 提交任务';
                        submitBtn.style.background = '';
                    }
                }
            }
            
            // 提示按钮功能
            if (hintBtn) {
                hintBtn.addEventListener('click', handleHintClick);
                
                function handleHintClick() {
                    const hintMessage = `
                        二十五弦瑟修复提示：<br><br>
                        <strong>游戏规则：</strong><br>
                        1. 点击"开始修复"按钮启动任务<br>
                        2. 按照上方显示的序列依次点击琴弦<br>
                        3. 每根弦都有不同的音高<br><br>
                        <strong>当前修复序列：</strong> ${sequence.join(' → ')}<br><br>
                        <strong>小贴士：</strong><br>
                        琴弦从左到右（1-25）音高逐渐升高，注意听音高的变化。
                    `;
                    
                    // 显示对话框提示
                    const dialogueOverlay = document.createElement('div');
                    dialogueOverlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        z-index: 3000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                    `;
                    
                    dialogueOverlay.innerHTML = `
                        <div style="
                            background: linear-gradient(135deg, #1a1a2e, #16213e);
                            border-radius: 15px;
                            padding: 25px;
                            max-width: 500px;
                            width: 100%;
                            border: 2px solid #ffd700;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                <h3 style="color: #ffd700; margin: 0;">
                                    <i class="fas fa-lightbulb" style="margin-right: 10px;"></i>游戏提示
                                </h3>
                                <button id="close-hint" style="
                                    background: none;
                                    border: none;
                                    color: #fff;
                                    font-size: 1.5rem;
                                    cursor: pointer;
                                ">×</button>
                            </div>
                            <div style="color: #ddd; line-height: 1.6; font-size: 0.95rem;">
                                ${hintMessage}
                            </div>
                            <div style="margin-top: 25px; text-align: center;">
                                <button id="confirm-hint" style="
                                    background: linear-gradient(135deg, #ff8a00, #ffd700);
                                    color: #1a1a2e;
                                    border: none;
                                    border-radius: 25px;
                                    padding: 12px 30px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    font-size: 1rem;
                                ">
                                    <i class="fas fa-check" style="margin-right: 8px;"></i>明白了
                                </button>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(dialogueOverlay);
                    
                    // 关闭按钮事件
                    document.getElementById('close-hint').addEventListener('click', () => {
                        document.body.removeChild(dialogueOverlay);
                    });
                    
                    document.getElementById('confirm-hint').addEventListener('click', () => {
                        document.body.removeChild(dialogueOverlay);
                    });
                }
            }
            
            // 初始显示
            updateDisplay();
            
        }, 200); // 延迟200ms确保DOM完全加载
    }

           // 终章：数字实验室
    playFinalChapter() {
        // 设置场景背景（数字实验室）
        document.getElementById('scene-background').style.background = 'linear-gradient(135deg, #00897b 0%, #004d40 100%)';

        
        // 清空场景元素
        document.getElementById('scene-background').innerHTML = '';
        
        // 添加AI辛追交互元素
        const aiXinZhuiArea = document.createElement('div');
        aiXinZhuiArea.id = 'ai-xinzhui';
        aiXinZhuiArea.style.position = 'absolute';
        aiXinZhuiArea.style.top = '50%';
        aiXinZhuiArea.style.left = '50%';
        aiXinZhuiArea.style.transform = 'translate(-50%, -50%)';
        aiXinZhuiArea.style.width = '150px';
        aiXinZhuiArea.style.height = '150px';
        aiXinZhuiArea.style.cursor = 'pointer';
        aiXinZhuiArea.style.textAlign = 'center';
        aiXinZhuiArea.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-robot" style="font-size: 5rem; color: #00bcd4;"></i>
                <p style="margin-top: 10px; color: white;">AI辛追</p>
            </div>
        `;
        
        // 添加点击事件
        aiXinZhuiArea.onclick = () => {
            this.hideInteractionHint();
            this.showDialogue({
                speakerName: 'AI辛追',
                speakerTitle: '30岁数字化身',
                text: '欢迎来到数字实验室！在我问你问题之前，先看看这些关于我的线索，它们会帮你找到答案。',
                choices: [
                    { text: '查看线索', action: () => this.showFinalChapterClues() },
                
                ]
            });
        };
        
        // 添加到场景
        document.getElementById('scene-background').appendChild(aiXinZhuiArea);
    }
    
    // 显示终章线索
    showFinalChapterClues() {
        this.showDialogue({
            speakerName: 'AI辛追',
            speakerTitle: '30岁数字化身',
            text: '这里有四个重要的考古线索，仔细阅读它们，然后回答我的问题。',
            choices: [
                { text: '查看线索一', action: () => this.showClue(1) },
                { text: '查看线索二', action: () => this.showClue(2) },
                { text: '查看线索三', action: () => this.showClue(3) },
                { text: '查看线索四', action: () => this.showClue(4) },
                { text: '已经看完线索，开始问答', action: () => this.startFinalQuiz() }
            ]
        });
    }
    
    // 显示具体线索
    showClue(clueNumber) {
        const clues = {
            1: {
                title: '线索一：生活痕迹',
                content: '墓中发现的精美丝绸衣物和丰富的食物残骸显示，辛追夫人有着相当长的成年生活经历。这些奢华的丝织品和保存完好的食品，反映了她在世时长期享受高品质生活。'
            },
            2: {
                title: '线索二：健康状况',
                content: '考古学家通过X光扫描发现，辛追夫人的骨骼愈合良好，牙齿磨损程度适中，这些都是长期营养充足、生活规律的典型特征。这表明她在世时身体健康，生活优渥。'
            },
            3: {
                title: '线索三：保存状态',
                content: '通过现代科学检测发现，辛追夫人的尸体保存状态极佳，这不仅归功于墓葬的密封技术，更反映了她生前良好的身体素质。只有生前健康状况良好的人，才能在死后保持如此完好的状态。'
            },
            4: {
                title: '线索四：社会地位',
                content: '辛追夫人的墓葬规模宏大，陪葬品极其丰富精美，展现了极高的社会地位。作为轪侯利苍的妻子，她享有尊贵的身份和优渥的生活条件。'
            }
        };
        
        const clue = clues[clueNumber];
        
        // 创建线索展示界面
        document.getElementById('dialogue-container').classList.remove('active');
        
        const clueContainer = document.createElement('div');
        clueContainer.id = 'clue-container';
        clueContainer.style.position = 'absolute';
        clueContainer.style.top = '0';
        clueContainer.style.left = '0';
        clueContainer.style.width = '100%';
        clueContainer.style.height = '100%';
        clueContainer.style.background = 'rgba(0, 0, 0, 0.9)';
        clueContainer.style.zIndex = '60';
        clueContainer.style.padding = '20px';
        clueContainer.style.display = 'flex';
        clueContainer.style.flexDirection = 'column';
        clueContainer.style.justifyContent = 'center';
        
        clueContainer.innerHTML = `
            <div style="background: linear-gradient(135deg, #00897b 0%, #004d40 100%); border-radius: 15px; padding: 25px; max-width: 500px; margin: 0 auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="color: #00bcd4; font-size: 1.5rem;">
                        <i class="fas fa-clue"></i> ${clue.title}
                    </h3>
                    <button id="close-clue" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                    <p style="color: #fff; line-height: 1.6; font-size: 1.1rem;">${clue.content}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    ${clueNumber > 1 ? '<button id="prev-clue" class="btn-secondary" style="padding: 10px 20px;"><i class="fas fa-arrow-left"></i> 上一个线索</button>' : '<div></div>'}
                    ${clueNumber < 4 ? '<button id="next-clue" class="btn-secondary" style="padding: 10px 20px;">下一个线索 <i class="fas fa-arrow-right"></i></button>' : '<div></div>'}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button id="back-to-clues" class="btn-primary" style="padding: 10px 20px;">
                        <i class="fas fa-list"></i> 返回线索列表
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('game-screen').appendChild(clueContainer);
        
        // 设置事件监听器
        document.getElementById('close-clue').addEventListener('click', () => {
            document.getElementById('game-screen').removeChild(clueContainer);
            this.showFinalChapterClues();
        });
        
        if (clueNumber > 1) {
            document.getElementById('prev-clue').addEventListener('click', () => {
                document.getElementById('game-screen').removeChild(clueContainer);
                this.showClue(clueNumber - 1);
            });
        }
        
        if (clueNumber < 4) {
            document.getElementById('next-clue').addEventListener('click', () => {
                document.getElementById('game-screen').removeChild(clueContainer);
                this.showClue(clueNumber + 1);
            });
        }
        
        document.getElementById('back-to-clues').addEventListener('click', () => {
            document.getElementById('game-screen').removeChild(clueContainer);
            this.showFinalChapterClues();
        });
    }
    
    startFinalQuiz() {
        // 如果线索容器还在，先移除
        const clueContainer = document.getElementById('clue-container');
        if (clueContainer) {
            document.getElementById('game-screen').removeChild(clueContainer);
        }
        
        this.hideDialogue();
        
        // 终章需要回答的问题（关于辛追年龄和死因）
        const finalChapterQuestions = [12, 14]; // 问题12和14
        
        // 记录这是终章问答
        this.isFinalChapterQuiz = true;
        this.finalQuizQuestions = finalChapterQuestions;
        this.finalQuizCurrentIndex = 0;
        
        // 显示第一个问题
        this.showQuiz(finalChapterQuestions[0] - 1, true);
    }
    
    // 修改后的submitQuiz方法中的相关部分
    submitQuiz() {
        const selectedOption = document.querySelector('.quiz-option.selected');
        if (!selectedOption) return;
        
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const quiz = this.gameData.quizzes[this.currentQuizIndex];
        const isCorrect = selectedIndex === quiz.correct;
        
        // 记录答案
        this.quizAnswers.push({
            questionId: quiz.id,
            selected: selectedIndex,
            correct: isCorrect
        });
        
        // 更新分数
        if (isCorrect) {
            this.score++;
        }
        
        // 显示反馈
        document.getElementById('feedback-text').textContent = isCorrect ? 
            '回答正确！' : '回答错误。';
        
        document.getElementById('quiz-explanation').innerHTML = `
            <p><strong>正确答案：</strong>${quiz.options[quiz.correct]}</p>
            <p><strong>解析：</strong>${quiz.explanation}</p>
        `;
        
        // 标记正确和错误的选项
        document.querySelectorAll('.quiz-option').forEach((option, index) => {
            if (index === quiz.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
        // 显示反馈区域
        document.getElementById('quiz-feedback').classList.remove('hidden');
        
        // 隐藏提交按钮，显示下一题按钮
        document.getElementById('submit-quiz').classList.add('hidden');
        document.getElementById('next-quiz').classList.remove('hidden');
    }
    
    // 修改后的nextQuiz方法
    nextQuiz() {
        // 隐藏答题界面
        document.getElementById('quiz-container').classList.remove('active');
        
        // 如果是终章问答
        if (this.isFinalChapterQuiz && this.finalQuizQuestions) {
            this.finalQuizCurrentIndex++;
            
            // 检查是否还有问题
            if (this.finalQuizCurrentIndex < this.finalQuizQuestions.length) {
                // 显示下一题
                setTimeout(() => {
                    this.showQuiz(this.finalQuizQuestions[this.finalQuizCurrentIndex] - 1, true);
                }, 500);
            } else {
                // 终章问答完成
                this.isFinalChapterQuiz = false;
                this.finalQuizQuestions = null;
                this.finalQuizCurrentIndex = 0;
                
                // 显示完成对话并跳转到终幕
                setTimeout(() => {
                    this.showDialogue({
                        speakerName: 'AI辛追',
                        speakerTitle: '30岁数字化身',
                        text: '很好！你已经掌握了关于我的重要信息。看来你在梦境中学到了不少知识。现在，该回到现实世界了...',
                        choices: [
                            { text: '回到现实', action: () => this.advanceToFinalScene() }
                        ]
                    });
                }, 500);
            }
        } 
        // 其他章节的问题逻辑保持不变
        else if (this.currentChapter < 7 && this.currentQuizIndex >= 0) {
            // 原有逻辑保持不变...
            setTimeout(() => {
                if (this.currentChapter === 1 && this.currentQuizIndex === 0) {
                    this.advanceToChapter(2);
                } else if (this.currentChapter === 2 && this.currentQuizIndex === 1) {
                    this.advanceToChapter(3);
                } else if (this.currentChapter === 3 && (this.currentQuizIndex === 2 || this.currentQuizIndex === 10)) {
                    this.advanceToChapter(4);
                } else if (this.currentChapter === 4 && (this.currentQuizIndex === 3 || this.currentQuizIndex === 6 || this.currentQuizIndex === 12)) {
                    this.advanceToChapter(5);
                } else if (this.currentChapter === 5 && (this.currentQuizIndex === 5 || this.currentQuizIndex === 7 || this.currentQuizIndex === 9)) {
                    this.showDialogue({
                        speakerName: '乐师亡魂',
                        speakerTitle: '汉代宫廷乐师',
                        text: '知识掌握得不错！现在去数字实验室见AI辛追吧，她会问你更多问题。',
                        choices: [
                            { text: '前往数字实验室', action: () => this.advanceToChapter(6) }
                        ]
                    });
                }
            }, 500);
        } 
        // 终幕的连续问答
        else if (this.currentChapter === 7) {
            this.currentQuizIndex++;
            
            // 检查是否所有问题都已回答
            if (this.currentQuizIndex < this.gameData.quizzes.length) {
                // 显示下一题
                setTimeout(() => {
                    this.showQuiz(this.currentQuizIndex);
                }, 500);
            } else {
                // 所有问题回答完毕，显示结束界面
                this.showScreen('end');
            }
        }
    }
    
    // 跳转到终幕
    advanceToFinalScene() {
        this.advanceToChapter(7);
    }
    
    // 添加的辅助方法
    hideDialogue() {
        document.getElementById('dialogue-container').classList.remove('active');
    }
    // 终幕：课堂惊醒
    playFinalScene() {
        
        
        // 添加教授交互元素
        this.addInteractiveElement({
            id: 'professor-final',
            icon: 'fas fa-chalkboard-teacher',
            name: '教授',
            top: '50%',
            left: '50%',
            color: '#ff9800',
            onClick: () => {
                this.hideInteractionHint();
                this.showDialogue({
                    speakerName: '教授',
                    speakerTitle: '《中国文化概论》教师',
                    avatarIcon: 'fas fa-chalkboard-teacher',
                    text: '同学！怎么睡了呢？刚才讲到的马王堆汉墓，请你回答几个问题...',
                    choices: [
                        { text: '好的教授，我准备好了', action: () => this.startFinalExam() }
                    ]
                });
            }
        });
    }
    
    startFinalExam() {
        this.hideDialogue();
        
        // 开始终幕问答（所有20个问题）
        this.state.currentQuizIndex = 0;
        this.state.quizAnswers = [];
        this.showQuiz(this.state.currentQuizIndex, false);
    }
    
    // ========== 交互元素管理 ==========
    addInteractiveElement(elementData) {
        const sceneBackground = document.getElementById('scene-background');
        if (!sceneBackground) return;
        
        const element = document.createElement('div');
        element.className = 'scene-interactive';
        element.id = elementData.id;
        
        element.style.position = 'absolute';
        element.style.top = elementData.top;
        element.style.left = elementData.left;
        element.style.transform = 'translate(-50%, -50%)';
        element.style.color = elementData.color;
        element.style.cursor = 'pointer';
        element.style.textAlign = 'center';
        element.style.zIndex = '5';
        
        element.innerHTML = `
            <i class="${elementData.icon}" style="font-size: 3.5rem; display: block; margin-bottom: 8px;"></i>
            <span style="font-size: 0.9rem; background: rgba(0,0,0,0.7); padding: 3px 8px; border-radius: 10px;">${elementData.name}</span>
        `;
        
        // 添加点击事件
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            if (elementData.onClick) {
                elementData.onClick();
            }
        });
        
        sceneBackground.appendChild(element);
    }
    
    showInteractionHint(text) {
        const hintElement = document.getElementById('interaction-hint');
        const hintText = document.getElementById('hint-text');
        
        if (hintElement && hintText) {
            hintText.textContent = text;
            hintElement.style.display = 'block';
            hintElement.style.pointerEvents = 'all';
        }
    }
    
    hideInteractionHint() {
        const hintElement = document.getElementById('interaction-hint');
        if (hintElement) {
            hintElement.style.display = 'none';
        }
    }
    
    handleInteractionHintClick() {
        if (this.currentScene && this.currentScene.onSceneClick) {
            this.currentScene.onSceneClick();
        }
    }
    
    handleSceneClick() {
        // 如果当前场景有点击事件，执行它
        if (this.currentScene && this.currentScene.onSceneClick) {
            this.currentScene.onSceneClick();
        }
    }
    
    // ========== 界面管理 ==========
    showDialogue(dialogueData) {
        // 更新对话信息
        document.getElementById('speaker-name').textContent = dialogueData.speakerName;
        document.getElementById('speaker-title').textContent = dialogueData.speakerTitle;
        document.getElementById('dialogue-text').textContent = dialogueData.text;
        
        // 更新头像
        const avatarIcon = document.querySelector('#speaker-avatar i');
        if (avatarIcon && dialogueData.avatarIcon) {
            avatarIcon.className = dialogueData.avatarIcon;
        }
        
        // 清空选项
        const choicesContainer = document.getElementById('dialogue-choices');
        if (choicesContainer) {
            choicesContainer.innerHTML = '';
            
            // 添加选项
            if (dialogueData.choices && dialogueData.choices.length > 0) {
                dialogueData.choices.forEach(choice => {
                    const choiceElement = document.createElement('button');
                    choiceElement.className = 'dialogue-choice';
                    choiceElement.textContent = choice.text;
                    choiceElement.addEventListener('click', () => {
                        this.hideDialogue();
                        if (choice.action) {
                            choice.action();
                        }
                    });
                    choicesContainer.appendChild(choiceElement);
                });
                choicesContainer.style.display = 'flex';
                document.getElementById('next-dialogue').style.display = 'none';
            } else {
                choicesContainer.style.display = 'none';
                document.getElementById('next-dialogue').style.display = 'block';
            }
        }
        
        // 显示对话界面
        document.getElementById('dialogue-container').classList.add('active');
    }
    
    hideDialogue() {
        document.getElementById('dialogue-container').classList.remove('active');
    }
    
    showTask(taskData) {
        // 更新任务信息
        document.getElementById('task-description').textContent = taskData.description;
        document.getElementById('task-content').innerHTML = taskData.content;
        
        // 设置任务完成回调
        this.currentTaskOnComplete = taskData.onComplete;
        
        // 重置提交按钮
        document.getElementById('submit-task').disabled = true;
        
        // 显示任务界面
        document.getElementById('task-container').classList.add('active');
    }
    
    submitTask() {
        // 这里可以添加任务验证逻辑
        if (this.currentTaskOnComplete) {
            this.currentTaskOnComplete();
            this.currentTaskOnComplete = null;
        }
    }
    
    hideTask() {
        document.getElementById('task-container').classList.remove('active');
    }
    
    showArtifact(artifactId) {
        const artifact = gameData.artifacts[artifactId];
        if (!artifact) return;
        
        // 更新文物信息
        document.getElementById('artifact-name').textContent = artifact.name;
        document.getElementById('artifact-image').innerHTML = `<i class="${artifact.icon}" style="font-size: 5rem;"></i>`;
        document.getElementById('artifact-info').innerHTML = `
            <p>${artifact.description}</p>
            <p style="margin-top: 15px; color: #ffd700;"><i class="fas fa-check-circle"></i> 已解锁</p>
        `;
        
        // 显示文物界面
        document.getElementById('artifact-container').classList.add('active');
    }
    
    hideArtifact() {
        document.getElementById('artifact-container').classList.remove('active');
    }
    
    showQuizInChapter(questionId) {
        const questionIndex = questionId - 1;
        this.showQuiz(questionIndex, true);
    }
    
    showQuiz(questionIndex, inChapter = false) {
        if (questionIndex >= gameData.quizzes.length) {
            if (this.state.currentChapter === 7) {
                // 终幕完成，显示结束界面
                this.showScreen('end');
            } else if (inChapter) {
                // 章节内问题回答完毕，继续章节
                this.advanceToChapter(this.state.currentChapter + 1);
            }
            return;
        }
        
        const quiz = gameData.quizzes[questionIndex];
        this.state.currentQuizIndex = questionIndex;
        this.currentQuizInChapter = inChapter;
        
        // 更新问题显示
        document.getElementById('quiz-question').textContent = quiz.question;
        document.getElementById('current-question').textContent = questionIndex + 1;
        document.getElementById('total-questions').textContent = gameData.quizzes.length;
        
        // 清空选项
        const optionsContainer = document.getElementById('quiz-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            // 添加选项
            quiz.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'quiz-option';
                optionElement.textContent = option;
                optionElement.dataset.index = index;
                
                optionElement.addEventListener('click', () => {
                    // 移除其他选项的选中状态
                    document.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // 选中当前选项
                    optionElement.classList.add('selected');
                    
                    // 启用提交按钮
                    document.getElementById('submit-quiz').disabled = false;
                });
                
                optionsContainer.appendChild(optionElement);
            });
        }
        
        // 重置反馈区域
        const feedbackElement = document.getElementById('quiz-feedback');
        if (feedbackElement) {
            feedbackElement.classList.remove('active');
        }
        document.getElementById('feedback-text').textContent = '';
        document.getElementById('quiz-explanation').innerHTML = '';
        
        // 隐藏下一题按钮，显示提交按钮
        document.getElementById('next-quiz').style.display = 'none';
        document.getElementById('submit-quiz').style.display = 'block';
        document.getElementById('submit-quiz').disabled = true;
        
        // 显示答题界面
        document.getElementById('quiz-container').classList.add('active');
    }
    
    submitQuiz() {
        const selectedOption = document.querySelector('.quiz-option.selected');
        if (!selectedOption) return;
        
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const quiz = gameData.quizzes[this.state.currentQuizIndex];
        const isCorrect = selectedIndex === quiz.correct;
        
        // 记录答案
        this.state.addQuizAnswer(quiz.id, selectedIndex, isCorrect);
        
        // 显示反馈
        document.getElementById('feedback-text').textContent = isCorrect ? 
            '回答正确！' : '回答错误。';
        
        document.getElementById('quiz-explanation').innerHTML = `
            <p><strong>正确答案：</strong>${quiz.options[quiz.correct]}</p>
            <p><strong>解析：</strong>${quiz.explanation}</p>
        `;
        
        // 标记正确和错误的选项
        document.querySelectorAll('.quiz-option').forEach((option, index) => {
            if (index === quiz.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
        // 显示反馈区域
        document.getElementById('quiz-feedback').classList.add('active');
        
        // 隐藏提交按钮，显示下一题按钮
        document.getElementById('submit-quiz').style.display = 'none';
        document.getElementById('next-quiz').style.display = 'block';
    }
    
    nextQuiz() {
        // 隐藏答题界面
        document.getElementById('quiz-container').classList.remove('active');
        
        if (this.currentQuizInChapter) {
            // 章节内问答，直接返回场景
            setTimeout(() => {
                // 根据当前章节决定下一步
                if (this.state.currentChapter === 1 && this.state.currentQuizIndex === 0) {
                    this.advanceToChapter(2);
                } else if (this.state.currentChapter === 2 && this.state.currentQuizIndex === 1) {
                    this.advanceToChapter(3);
                } else if (this.state.currentChapter === 3 && (this.state.currentQuizIndex === 2 || this.state.currentQuizIndex === 10)) {
                    this.advanceToChapter(4);
                } else if (this.state.currentChapter === 5 && (this.state.currentQuizIndex === 5 || this.state.currentQuizIndex === 7 || this.state.currentQuizIndex === 9)) {
                    // 第五章问题回答后
                    setTimeout(() => {
                        this.showDialogue({
                            speakerName: '乐师亡魂',
                            speakerTitle: '汉代宫廷乐师',
                            avatarIcon: 'fas fa-ghost',
                            text: '知识掌握得不错！现在去数字实验室见AI辛追吧，她会问你更多问题。',
                            choices: [
                                { text: '前往数字实验室', action: () => this.advanceToChapter(6) }
                            ]
                        });
                    }, 500);
                }
            }, 500);
        } else {
            // 终章或终幕的连续问答
            this.state.currentQuizIndex++;
            
            // 检查是否所有问题都已回答
            if (this.state.currentQuizIndex < gameData.quizzes.length) {
                // 显示下一题
                setTimeout(() => {
                    this.showQuiz(this.state.currentQuizIndex, false);
                }, 500);
            } else {
                // 所有问题回答完毕
                if (this.state.currentChapter === 6) {
                    // 终章完成，进入终幕
                    this.advanceToChapter(7);
                } else if (this.state.currentChapter === 7) {
                    // 终幕完成，显示结束界面
                    this.showScreen('end');
                }
            }
        }
    }
    
    advanceToChapter(nextChapterId) {
        if (nextChapterId < gameData.chapters.length) {
            this.startChapter(nextChapterId);
        } else {
            // 游戏完成
            this.showScreen('end');
        }
    }
    
    updateGameUI() {
        const chapter = gameData.chapters[this.state.currentChapter];
        if (!chapter) return;
        
        // 更新章节信息
        const chapterElement = document.getElementById('current-chapter');
        if (chapterElement) {
            chapterElement.textContent = `${chapter.name}: ${chapter.title}`;
        }
        
        // 更新进度条
        document.getElementById('progress-fill').style.width = `${chapter.progress}%`;
        document.getElementById('progress-text').textContent = `${chapter.progress}%`;
        
        // 更新地图节点状态
        document.querySelectorAll('.map-node').forEach((node, index) => {
            node.classList.remove('active');
            if (index === this.state.currentChapter) {
                node.classList.add('active');
            }
        });
    }
    
    toggleMenu() {
        const menu = document.getElementById('game-menu');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        } else {
            menu.classList.add('active');
        }
    }
    
    showInventory() {
        const inventoryContainer = document.getElementById('inventory-items');
        if (!inventoryContainer) return;
        
        inventoryContainer.innerHTML = '';
        
        // 添加所有文物
        Object.values(gameData.artifacts).forEach(artifact => {
            const isUnlocked = this.state.artifactStatus[artifact.id];
            const item = document.createElement('div');
            item.className = `inventory-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            item.innerHTML = `
                <div class="inventory-icon">
                    <i class="${artifact.icon}"></i>
                </div>
                <div class="inventory-name">${artifact.name}</div>
                <div class="inventory-status">${isUnlocked ? '已解锁' : '未解锁'}</div>
            `;
            
            if (isUnlocked) {
                item.addEventListener('click', () => {
                    this.hideInventory();
                    this.showArtifact(artifact.id);
                });
            }
            
            inventoryContainer.appendChild(item);
        });
        
        document.getElementById('inventory-menu').classList.add('active');
    }
    
    hideInventory() {
        document.getElementById('inventory-menu').classList.remove('active');
    }
    
    showMap() {
        const chapter = gameData.chapters[this.state.currentChapter];
        document.getElementById('map-chapter-name').textContent = `当前章节: ${chapter.name}`;
        document.getElementById('map-chapter-desc').textContent = chapter.title;
        
        // 禁用前往当前章节按钮
        document.getElementById('go-to-chapter').disabled = true;
        
        document.getElementById('map-menu').classList.add('active');
    }
    
    hideMap() {
        document.getElementById('map-menu').classList.remove('active');
    }
    
    selectMapChapter(chapterId) {
        const chapter = gameData.chapters[chapterId];
        document.getElementById('map-chapter-name').textContent = `选中章节: ${chapter.name}`;
        document.getElementById('map-chapter-desc').textContent = chapter.title;
        
        // 如果不是当前章节，启用前往按钮
        const goButton = document.getElementById('go-to-chapter');
        goButton.disabled = chapterId === this.state.currentChapter;
        if (!goButton.disabled) {
            goButton.dataset.chapterId = chapterId;
        }
    }
    
    goToSelectedChapter() {
        const chapterId = parseInt(document.getElementById('go-to-chapter').dataset.chapterId);
        this.hideMap();
        this.startChapter(chapterId);
    }
    
    showEndScreen() {
        // 计算得分
        const correctAnswers = this.state.getCorrectAnswersCount();
        const totalQuestions = gameData.quizzes.length;
        const scorePercentage = this.state.getScorePercentage();
        
        // 更新结束界面数据
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('total-questions-end').textContent = totalQuestions;
        document.getElementById('score-percentage').textContent = `${scorePercentage}%`;
        document.getElementById('artifacts-found').textContent = this.state.discoveredArtifacts.length;
        
        // 设置结束消息
        let message = '';
        if (scorePercentage >= 90) {
            message = '太棒了！你对马王堆汉墓的了解非常深入，教授一定会给你满分！';
        } else if (scorePercentage >= 70) {
            message = '很不错！你掌握了马王堆汉墓的核心知识，这次课程实践很成功！';
        } else if (scorePercentage >= 50) {
            message = '及格了！你对马王堆有一定了解，但还可以更深入一些。';
        } else {
            message = '需要加油哦！建议重新探索一遍，加深对马王堆汉墓的理解。';
        }
        
        document.getElementById('end-message-text').textContent = message;
    }
    
    restartChapter() {
        this.toggleMenu();
        this.playChapter(this.state.currentChapter);
    }
    
    restartGame() {
        this.startGame();
    }
}

// 初始化游戏
let game;

window.addEventListener('DOMContentLoaded', () => {
    game = new MaWangDuiGame();
    window.game = game; // 暴露给控制台调试
});