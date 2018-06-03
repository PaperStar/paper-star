import Helpers from 'Helpers'
cc.Class({
    extends: cc.Component,

    properties: {
        hp: 1000,
        curHp: 1000,
        gravityRadial: cc.Prefab,
        radius: 100,
        gravityRadius: 200,
        gravityForce: 300
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init () {
        this.curHp = this.hp
        this.node.color = cc.hexToColor(Helpers.getRandomColor())
        this.getComponent(cc.RigidBody).angularVelocity = cc.randomMinus1To1() * 200
        this.node.scale = Math.random() * 1 + 0.3
        this.node.rotation = Helpers.getRandom(0, 360)
        
        // gravity
        let planeGravityRadial = cc.instantiate(this.gravityRadial)
        planeGravityRadial.parent = this.node
        planeGravityRadial.getComponent(cc.PhysicsCircleCollider).radius = this.node.width + Math.random() * 200
        this.gravityForce = 100 + Math.random() * 200
        planeGravityRadial.getComponent('gravity-radial').gravityForce = this.gravityForce
    },

    // update (dt) {},
});
