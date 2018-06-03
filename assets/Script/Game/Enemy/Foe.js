
import { FoeType, BulletType, AttackType } from 'Types'

cc.Class({
    extends: cc.Component,

    properties: {
        foeType: {
            default: FoeType.Foe1,
            type: FoeType
        },
        atkType: {
            default: AttackType.Melee,
            type: AttackType
        },
        bulletType: {
            default: BulletType.Arrow,
            type: BulletType
        },
        bulletCollisionTime: {
            default: 2,
            displayName: '子弹可碰撞次数'
        },
        hp: 0,
        curHp: 0,
        score: 0,
        crashDamage: 0,
        moveSpeed: 0,
        turnSpeed: 0,
        moveDir: cc.v2(0, 1),
        atkDir: cc.v2(),
        atkRange: 0,
        atkDuration: 0,
        atkPrepTime: 0,
        fxSmoke: cc.ParticleSystem,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init (waveMng) {
        this.waveMng = waveMng
        this.player = waveMng.player
        this.isAttacking = false
        this.isAlive = false
        this.isInvincible = false
        this.isMoving = false
        this.curHp = this.hp
        this.node.rotation = Math.random() * 360 
        this.anim = this.node.getChildByName('sprite').getComponent(cc.Animation)
        this.anim.play('fadeIn')
        this.readyToMove()
        this.body = this.getComponent(cc.RigidBody)
    },

    readyToMove () {
        this.isAlive = true
        this.isMoving = true
        this.fxSmoke.resetSystem()
    },

    prepAttack () {
        this.isAttacking = true
        this.scheduleOnce(this.attack, this.atkPrepTime)
    },

    attack () {
        if (this.isAlive === false) {
            return
        }
        this.atkDir = cc.pNormalize(cc.pSub(this.player.node.position, this.node.position))
        // if (this.atkType === AttackType.Melee) {
            
        // }
        this.isAttacking = false
        this.isMoving = true
    },

    rotate () {
        let sepAngle = cc.radiansToDegrees( cc.pAngleSigned(this.moveDir, this.atkDir) )
        if ( sepAngle > 2) {
            this.node.rotation -= this.turnSpeed
        } else if ( sepAngle < -1 ) {
            this.node.rotation += this.turnSpeed
        }        
        this.moveDir = cc.pForAngle( cc.degreesToRadians(90 - this.node.rotation) )
    },

    attackOnTarget () {

    },

    dead () {
        this.isMoving = false
        this.isAttacking = false
        this.unscheduleAllCallbacks()
        this.node.stopAllActions()
        if (this.player && this.player.isAlive) {
            this.player.addKills()
            this.waveMng.killFoe(this.score)
        }
        this.anim.play('dead')
        this.scheduleOnce(this.recycle, this.anim.currentClip.duration)
    },

    recycle () {
        this.waveMng.despawnFoe(this)
    },

    onBeginContact (contact, selfCollider, otherCollider) {
        switch (otherCollider.node.name) {
            case 'bullet':
                this.hp -= 10
                break;
            default:
                this.hp--
                break;
        }

        if (this.hp <= 0 && this.isAlive) {
            this.isAlive = false
            this.dead()
        }
    },

    update (dt) {
        if (this.isAlive === false) {
            return
        }
        if (!this.isAttacking) {
            this.prepAttack()
        }
        if (this.isMoving) {
            if (this.atkType === AttackType.Melee) {
                this.body.linearVelocity = cc.pMult(this.moveDir, this.moveSpeed)
            }
            this.rotate()
        } else {
            this.body.linearVelocity = cc.v2(0, 0)
        }
    },
})
