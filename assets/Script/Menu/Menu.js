cc.Class({
    extends: cc.Component,

    properties: {
        config: cc.Node,
        rank: cc.Node,
    },

    onLoad () {
        if (Global.userInfo) {
            Global.userInfo.show()
        }
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            Global.wxGame.gameClubButton.show()
        }
    },

    start () {
        this.initConfig()
        this.initRank()
    },

    initConfig () {
        if (!Global.config) {
            cc.game.addPersistRootNode(this.config)
            Global.config = this.config.getComponent('Config')
        }
        Global.config.close()
    },

    initRank () {
        if (!Global.rank) {
            cc.game.addPersistRootNode(this.rank)
            Global.rank = this.rank.getComponent('Rank')
            Global.rank.init()
        }
        Global.rank.close()
    },

    loadModeMenu () {
        cc.director.loadScene('ModeMenu', function() {
            console.log('ModeMenu is loaded.')
        })
    },

    openConfigMenu () {
        Global.config.open()
    },

    toggleRankList () {
        if (Global.rank.node.active) {
            Global.rank.close()
        } else {
            Global.rank.open()
        }
    },
    
    // system
    loadAchieveSystem () {
        cc.director.loadScene('AchieveSystem', function() {
            console.log('AchieveSystem is loaded.')
        })
    },

    loadRankSystem () {
        cc.director.loadScene('RankSystem', function() {
            console.log('RankSystem is loaded.')
        })
    },

})
