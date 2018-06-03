cc.Class({
    extends: cc.Component,

    properties: {
        bgAnim: cc.Animation,
        storyBoardAnim: cc.Animation,
    },

    onLoad () {
        
    },

    start () {
        this.scheduleOnce(this.bgFadeIn, this.storyBoardAnim.defaultClip.duration)
    },

    bgFadeIn () {
        this.bgAnim.play('bgFadeIn')
        this.scheduleOnce(Global.Helpers.loadStartMenu, this.bgAnim.currentClip.duration)
    }
})
