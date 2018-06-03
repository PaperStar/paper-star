cc.Class({
    extends: cc.Component,

    properties: {
        fxParticle: cc.ParticleSystem,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init (waveMng) {
        this.waveMng = waveMng
    },

    show () {
        this.node.active = true
    },

    hide () {
        this.node.active = false
    },

    showParticle () {
        this.fxParticle.resetSystem();
    }

    // update (dt) {},
});
