cc.Class({
    extends: cc.Component,

    properties: {
        logoAnim: cc.Animation,
    },

    onLoad () {
        console.log('os:' + cc.sys.os)
        
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
        cc.director.setDisplayStats(false)
    },

    start () {
        Global.Helpers.displayEgg()
        this.scheduleOnce(this.next, this.logoAnim.defaultClip.duration)
    },

    next () {
        Global.Helpers.loadStartMenu()
    }
})
