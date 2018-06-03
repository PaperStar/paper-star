const menu = [
    {
        parent: 'StartMenu',
        children: [
            'StartMenu',
            'ModeMenu',
            'AchieveSystem',
        ]
    },
    {
        parent: 'ModeMenu',
        children: [
            'FreeMode',
            'GravityMode',
            'MissionMode',
            'PropsMode',
        ]
    },
]

function getParentMenu (SceneName) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].children) {
            for (let j = 0; j < menu[i].children.length; j++) {
                if (SceneName == menu[i].children[j]) {
                    return menu[i].parent
                }
            }
        }
    }
    return 'StartMenu'
}

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {},

    start () {
        Global.curSceneName = cc.director.getScene().name
    },

    back () {
        let parentScene = getParentMenu(Global.curSceneName)
        cc.director.loadScene(parentScene, function() {
            console.log('Back To ' + parentScene)
        })
    }
})
