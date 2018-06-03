import Helpers from 'Helpers'
cc.Class({
    extends: cc.Component,

    properties: {
        map: {
            default: null,
            type: cc.Node
        },
        planet: cc.Prefab,
        planetNum: 10,
        fiveStarAnim: cc.Prefab,
        fourStarAnim: cc.Prefab,
        twoStarAnim: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    // start () {},

    init () {
        this.StarAnim = this.node.getChildByName('bg').getChildByName('StarAnim')
        this.generatePlanet(this.planetNum)
        this.generateManyStarAnim(30)
    },

    generateManyStarAnim (num) {
        for (let i = 0; i < num; i++) {
            this.generateStarAnim(this.fiveStarAnim)
            this.generateStarAnim(this.fourStarAnim)
            this.generateStarAnim(this.twoStarAnim)
        }
    },

    generateStarAnim (StarPrefab) {
        let Star = cc.instantiate(StarPrefab)
        Star.parent = this.StarAnim
        let randomPosition = cc.p(cc.randomMinus1To1() * this.map.width / 2, cc.randomMinus1To1() * this.map.height / 2)
        Star.setPosition(randomPosition)
        Star.scale = Math.random() + 0.1
    },

    generatePlanet (num) {
        this.PlanetRectArray = []
        this.PlanetMargin = 100
        for (let i = 0; i < num; i++) {
            this.curPlanet = cc.instantiate(this.planet)
            this.curPlanetPos = cc.p(cc.randomMinus1To1() * (this.map.width - 500) / 2, cc.randomMinus1To1() * (this.map.height - 500) / 2)
            this.curPlanetRect = cc.rect(this.curPlanetPos.x, this.curPlanetPos.y, this.curPlanet.width + this.PlanetMargin, this.curPlanet.height + this.PlanetMargin)

            // 检验当前位置是否已有 planet
            for (let j = 0; j < i; j++) {
                this.oldPlanetRect = this.PlanetRectArray[j]
                this.checkIntersectPlanet()
            }
            this.PlanetRectArray.push(this.curPlanetRect)
            this.curPlanet.parent = this.map
            this.curPlanet.tag = i
            this.curPlanet.setPosition(this.curPlanetPos)
            this.curPlanet.getComponent('planet').init()
        }
    },

    checkIntersectPlanet () {
        if (cc.rectIntersectsRect(this.oldPlanetRect, this.curPlanetRect)) {
            this.curPlanetPos = cc.p(cc.randomMinus1To1() * (this.map.width - 500) / 2, cc.randomMinus1To1() * (this.map.height - 500) / 2)
            this.curPlanetRect = cc.rect(this.curPlanetPos.x, this.curPlanetPos.y, this.curPlanet.width + this.PlanetMargin, this.curPlanet.height + this.PlanetMargin)
            this.checkIntersectPlanet ()
        }
    }

    // update (dt) {},
});
