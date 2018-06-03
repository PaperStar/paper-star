cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    init (game) {
        this.game = game
        this.hide()
    },

    show () {
        this.node.active = true
    },

    hide () {
        this.node.active = false
    },

    revive () {
        this.game.revive()
    },

    giveUp () {
        this.gameOver()
    },

    gameOver() {
        this.game.gameOver()
    },
})
