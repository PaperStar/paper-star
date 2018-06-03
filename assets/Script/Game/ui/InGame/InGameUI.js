import Player from 'Player'

cc.Class({
    extends: cc.Component,

    properties: {
        waveUI: cc.Node,
        killDisplay: cc.Node,
        comboDisplay:cc.Node,

        player: {
            default: null,
            type: Player
        },
        openPanelFlag: true,
    },
    
    start () {
        cc.director.setClearColor(cc.Color.GRAY)
        if (Global.userInfo) {
            Global.userInfo.node.active = false
        }
        this.scheduleOnce(this.togglePanel, 3)
    },

    init(game) {
        this.waveUI = this.waveUI.getComponent('WaveUI')
        this.waveUI.node.active = false
        this.killDisplay = this.killDisplay.getComponent('KillDisplay')
        this.killDisplay.node.active = false
        this.comboDisplay = this.comboDisplay.getComponent('ComboDisplay')
        this.comboDisplay.init()

        // anim        
        this.anim = this.node.getChildByName('panel').getComponent(cc.Animation)

        this.shootBtn = this.node.getChildByName('shoot')
        this.shootTouchEvent()

        // info
        this.Info = this.node.getChildByName('Info')
        this.HPBar = this.Info.getChildByName('HPBar').getComponent(cc.ProgressBar)
        this.lifeLabel = this.Info.getChildByName('Life').getChildByName('num').getComponent(cc.Label)
        this.lifeLabel.string = this.player.life
        this.scoreLabel = this.Info.getChildByName('Score').getComponent(cc.Label)
    },

    showWave (num) {
        this.waveUI.node.active = true;
        this.waveUI.show(num);
    },
    
    showKills (num) {
        this.killDisplay.playKill(num);
    },

    showLife () {
        this.lifeLabel.string = this.player.life
    },

    showHp () {
        this.HPBar.progress = this.player.curHp / this.HPBar.totalLength
    },

    showScore (num) {
        this.scoreLabel.string = num
    },
    
    addCombo () {
        this.comboDisplay.playCombo();
    },

    shootTouchEvent () {
        let self = this
        self.shootBtn.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.player._shootFlag = true
        }, self.player);
        self.shootBtn.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // ...
        }, self.player);
        self.shootBtn.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.player._shootFlag = false
        }, self.player);
        self.shootBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.player._shootFlag = false
        }, self.player);
    },

    togglePanel () {
        if (this.openPanelFlag) {
            this.anim.play('ClosePanel')
            this.openPanelFlag = false
        } else {
            this.anim.play('OpenPanel')
            this.openPanelFlag = true
        }
    },

    loadConfigMenu () {
        Global.config.open()
    },

    update (dt) {

    },
})
