cc.Class({
    extends: cc.Component,

    properties: {
        labelWave: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation)
    },

    start () {

    },

    show (num) {
        this.labelWave.string = num
        this.anim.play('wave-pop')
    },

    hide () {
        this.node.active = false
    }

    // update (dt) {},
});
