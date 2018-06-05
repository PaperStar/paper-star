import JoystickCommon from 'JoystickCommon'
import Player from 'Player'

cc.Class({
    extends: cc.Component,

    properties: {
        dot: {
            default: null,
            type: cc.Node,
            displayName: '摇杆操纵点',
        },
        ring: {
            default: null,
            type: cc.Node,
            displayName: '摇杆背景节点',
        },
        player: {
            default: null,
            type: Player,
            displayName: '操控的角色',
        },

        stickX: {
            default: 0,
            displayName: '摇杆 X 位置',
        },
        stickY: {
            default: 0,
            displayName: '摇杆 Y 位置',
        },

        touchType: {
            default: JoystickCommon.TouchType.DEFAULT,
            type: JoystickCommon.TouchType,
            displayName: '触摸类型',
        },

        directionType: {
            default: JoystickCommon.DirectionType.ALL,
            type: JoystickCommon.DirectionType,
            displayName: '方向类型',
        },
    
        _stickPos: {
            default: null,
            type: cc.Node,
            displayName: '摇杆当前位置',
        },   

        _touchLocation: {
            default: null,
            type: cc.Node,
            displayName: '摇杆当前位置',

        },

        _angle: {
            default: 0,
            displayName: '当前触摸的角度',
        },
    },

    onLoad () {
        this._radius = this.ring.width / 2;
        this._createStickSprite();

        this._initTouchEvent();
        if(this.touchType == JoystickCommon.TouchType.FOLLOW) {
            this.node.opacity = 0;
        }
    },

    _createStickSprite: function()
    {
        //调整摇杆的位置
        this.ring.setPosition(this.stickX, this.stickY);
        this.dot.setPosition(this.stickX, this.stickY);
    },

    _initTouchEvent ()
    {
        let self = this;

        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self)
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self)
        self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self)
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchEndEvent, self)
    },

    _touchStartEvent (event) {
        let touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

        if(this.touchType == JoystickCommon.TouchType.DEFAULT) {
            this._stickPos = this.ring.getPosition();
            //触摸点与圆圈中心的距离
            let distance = cc.pDistance(touchPos,cc.v2(0,0));
            let posX = this.ring.getPosition().x + touchPos.x;
            let posY = this.ring.getPosition().y + touchPos.y;
            //手指在圆圈内触摸,控杆跟随触摸点
            if(this._radius > distance)
            {
                this.dot.setPosition(cc.v2(posX, posY));
                return true;
            }
            return false;
        }

        if(this.touchType == JoystickCommon.TouchType.FOLLOW) {
            // 记录摇杆位置，给touch move使用
            this._stickPos = touchPos;
            this.node.opacity = 255;
            this._touchLocation = event.getLocation();
             // 更改摇杆的位置
            this.ring.setPosition(touchPos);
            this.dot.setPosition(touchPos);
        }
    },

    _touchMoveEvent (event) {
        if(this.touchType == JoystickCommon.TouchType.FOLLOW) {
            // 如果touch start位置和touch move相同，禁止移动
            if (this._touchLocation.x == event.getLocation().x && this._touchLocation.y == event.getLocation().y){
                return false;
            }
        }
        
        // 以圆圈为锚点获取触摸坐标
        let touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        let distance = cc.pDistance(touchPos,cc.v2(0,0));

        // 由于摇杆的postion是以父节点为锚点，所以定位要加上touch start时的位置
        let posX = this._stickPos.x + touchPos.x;
        let posY = this._stickPos.y + touchPos.y;
        if(this._radius > distance) {
            this.dot.setPosition(cc.v2(posX, posY));
        } else {
            //控杆永远保持在圈内，并在圈内跟随触摸更新角度
            var x = this._stickPos.x + Math.cos(cc.pToAngle( cc.pSub(cc.v2(posX,posY), this.ring.getPosition() ))) * this._radius;
            var y = this._stickPos.y + Math.sin(cc.pToAngle( cc.pSub(cc.v2(posX,posY), this.ring.getPosition() ))) * this._radius;
            this.dot.setPosition(cc.v2(x, y));
        }
        //更新角度
        this._angle = cc.radiansToDegrees( cc.pToAngle( cc.pSub(cc.v2(posX,posY), this.ring.getPosition())) )
        this.player.moveAngle = this._angle
        //设置实际速度
        this._setSpeed(cc.v2(posX,posY));

        this.player.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.player.moveDir.x * this.player.moveSpeed, this.player.moveDir.y * this.player.moveSpeed)
        this.player.startMove()
    },

    _touchEndEvent () {
        this.dot.setPosition(this.ring.getPosition());
        if(this.touchType == JoystickCommon.TouchType.FOLLOW) {
            this.node.opacity = 0;
        }
        this.player.stopMove()
    },

    // methods

    //设置实际速度
    _setSpeed (point)
    {
        //触摸点和遥控杆中心的距离
        let distance = cc.pDistance(point, this.ring.getPosition())
        //如果半径
        if (distance < this._radius) {
            this.player.moveSpeed = this.player.normalSpeed
        } else {
            this.player.speedUpFlag = true
        }
    },

    update () {
        // 刚体旋转
        let rotation = this.player.getComponent(cc.RigidBody).getWorldRotation()
        let radian = cc.degreesToRadians(90 - rotation)
        let dir = cc.pForAngle(radian)
        this.player.moveDir = dir
    }
})
