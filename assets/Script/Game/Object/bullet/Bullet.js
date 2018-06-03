import { BulletType } from 'Types'

cc.Class({
    extends: cc.Component,

    properties: {
        bulletType: {
            default: BulletType.Line,
            type: BulletType
        },
        length: 20,
        moveSpeed: 500,
        delay: {
            default: 0.3,
            tooltip: '子弹延迟发射时间'
        },
        width: {
            default: 2,
            displayName: '子弹宽度'
        },
        lifeTime: {
            default: 10,
            displayName: '存活时间'
        },
        collisionTime: {
            default: 2,
            displayName: '可碰撞次数'
        },
        damage: {
            default: 10,
            displayName: '伤害值'
        },
        sprite: cc.Sprite,
        canBreak: true,
        brokenFX: cc.Node,
        isVisible: false,
    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    init (waveMng, dir, role) {
        this.waveMng = waveMng
        this.isVisible = true
        this.node.rotation = 0
        this.sprite.enabled = true
        this.sprite.node.opacity = 255
        this.role = role

        if (role.node.name == 'player') {
            this.scheduleOnce(function(){
                role._delayFlag = false
            }, this.delay)

            // color
            let color = role.node.color
            this.sprite.node.color = color
            this.brokenFX.getChildByName('pieceU').color = color
            this.brokenFX.getChildByName('pieceD').color = color
        }
        this.collisionTime = role.bulletCollisionTime

        this.anim = this.getComponent(cc.Animation)
        this.anim.stop()
        
        // 改变子弹长宽
        this.node.height = this.length
        this.node.width = this.width
        this.getComponent(cc.PhysicsBoxCollider).size.height = this.length
        this.getComponent(cc.PhysicsBoxCollider).size.width = this.width


        this.getComponent(cc.RigidBody).linearVelocity = cc.pMult(dir, this.moveSpeed)
        // this.scheduleOnce(this.vanish, this.lifeTime)

        // fx
        this.brokenFX.active = false
    },

    broke () {
        this.isMoving = false
        this.sprite.enabled = false
        this.brokenFX.active = true
        this.anim.play('break')
        this.scheduleOnce(this.recycle, this.anim.currentClip.duration)
    },

    hit () { 
        
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        switch (otherCollider.node.name) {
            case 'gravity-radial':
                break;
            default:
                this.collisionTime--
                break;
        }
        if (this.isVisible && this.collisionTime <= 0) {
            this.isVisible = false
            this.broke()
        }
    },

    vanish () {
        this.anim.play('vanish')
        this.scheduleOnce(this.recycle, this.anim.currentClip.duration)
    },

    recycle () {
        this.waveMng.despawnBullet(this)
    },

    update (dt) {
        if (this.isMoving === false) {
            return;
        }

        // ...
    }
})
