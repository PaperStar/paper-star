cc.Class({
    extends: cc.Component,

    properties: {
        bar: cc.Node,
        anim: cc.Animation,
    },

    init () {
        this.node.opacity = 0
        this.progressBar = this.getComponent(cc.ProgressBar)
    },

    setDisplayPosition (pos) {
        let percent = pos.y / (this.node.height * this.node.scale)
        this.node.setAnchorPoint(0.5, -percent)
        this.bar.setAnchorPoint(0, -percent)
    },

    show () {
        this.node.opacity = 255
    },

    display (curHp, hp) {
        let percent = curHp / hp
        this.progressBar.progress = percent
        if (percent > 0.7) {
            this.bar.color = cc.Color.GREEN
        } else if (percent > 0.3) {
            this.bar.color = cc.Color.YELLOW
        } else {
            this.bar.color = cc.Color.RED
        }
        // fade
        if (this.anim) {
            this.anim.play('hpBarFade')
        }
    },

    update () {
        this.node.rotation = -this.node.parent.rotation
    }
})
