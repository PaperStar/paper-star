import type { Animation, Camera, Node } from 'cc'
import { Component, _decorator, v2, view } from 'cc'

const { ccclass, property } = _decorator

@ccclass('CameraControl')
export class CameraControl extends Component {
  @property()
  target: Node = null

  camera: Camera

  anim: Animation
  // Jump Zoom
  @property()
  jumpZoom = false

  centerAtStart = false
  // Smooth Follow
  smoothFollow = false

  @property({
    visible(this: CameraControl) {
      return this.smoothFollow
    },
  })
  followX = 0

  @property({
    visible(this: CameraControl) {
      return this.smoothFollow
    },
  })
  followY = 0

  @property({
    visible(this: CameraControl) {
      return this.smoothFollow
    },
  })
  minFollowDist = 0

  @property({
    visible(this: CameraControl) {
      return this.smoothFollow
    },
  })
  followRatio = 0

  // Overview
  overview = false
  @property({
    visible(this: CameraControl) {
      return this.overview
    },
  })
  overviewTargets: Node[] = []

  @property({
    visible(this: CameraControl) {
      return this.overview
    },
  })
  overviewMargin = 0

  // Speed Zoom
  speedZoom = false
  @property({
    visible(this: CameraControl) {
      return this.speedZoom
    },
  })
  zoomInSpeed = 0

  @property({
    visible(this: CameraControl) {
      return this.speedZoom
    },
  })
  zoomOutSpeed = 0

  // Camera Shake
  canShake = false
  @property({
    visible(this: CameraControl) {
      return this.canShake
    },
  })
  shakeDuration = 0

  // Pointer Pan
  pointerPan = false
  @property({
    visible(this: CameraControl) {
      return this.pointerPan
    },
  })
  pointerXMult = 0

  @property({
    visible(this: CameraControl) {
      return this.pointerPan
    },
  })
  pointerYMult = 0

  // Boundaries in world position
  useBoundaries = false
  @property({
    visible(this: CameraControl) {
      return this.useBoundaries
    },
  })
  topBound = 0

  @property({
    visible(this: CameraControl) {
      return this.useBoundaries
    },
  })
  bottomBound = 0

  @property({
    visible(this: CameraControl) {
      return this.useBoundaries
    },
  })
  leftBound = 0

  @property({
    visible(this: CameraControl) {
      return this.useBoundaries
    },
  })
  rightBound = 0

  // use this for initialization
  onLoad() {
    // get player node in game
    this.target = this.target.getComponent('Game').player.node

    this.startFollow = false
    const canvas = cc.find('Canvas').getComponent(cc.Canvas)
    this.visibleSize = view.getVisibleSize()
    this.initZoomRatio = this.camera.zoomRatio
    // place camera on target if centerAtStart
    if (this.centerAtStart)
      this.node.position = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO)

    this.previousPos = this.node.position
    if (this.pointerPan) {
      // this.jumpZoom = false;
      this.overview = false
      this.speedZoom = false
      canvas.node.on('mousemove', this.onMouseMove, this)
      canvas.node.on('touchmove', this.onTouchMove, this)
      this.pointerPos = null
    }
    if (this.overview) {
      this.jumpZoom = false
      this.speedZoom = false
    }
    if (this.speedZoom)
      this.jumpZoom = false
  }

  // called every frame, uncomment this function to activate update callback
  lateUpdate(dt) {
    this.camera.x = this.target.x
    this.camera.y = this.target.y

    let targetPos

    if (this.overview) {
      targetPos = this.target.parent.convertToWorldSpaceAR(
        this.getOverviewTargetsMidpoint(),
      )
    }
    else {
      targetPos = this.target.parent.convertToWorldSpaceAR(
        this.target.position,
      )
    }

    if (this.pointerPan && this.pointerPos) {
      let xDelta = this.pointerPos.x / (this.visibleSize.width / 2) - 1
      let yDelta = this.pointerPos.y / (this.visibleSize.height / 2) - 1
      xDelta *= this.pointerXMult
      yDelta *= this.pointerYMult
      targetPos = cc.pAdd(targetPos, cc.v2(xDelta, yDelta))
    }

    // smooth follow
    if (this.smoothFollow) {
      if (Math.abs(targetPos.x - this.node.x) >= this.followX
        || Math.abs(targetPos.y - this.node.y) >= this.followY) {
        // when camera and target distance is larger than max distance
        this.startFollow = true
      }
      if (this.startFollow) {
        this.node.position = this.node.position.lerp(
          targetPos,
          this.followRatio,
        )
        if (targetPos.sub(this.node.position).mag() <= this.minFollowDist)
          this.startFollow = false
      }
    }
    else {
      this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos)
    }

    // speed zoom
    if (this.speedZoom) {
      const curSpeed = Math.abs(this.previousPos.x - targetPos.x) / dt
      let ratio = 0
      if (curSpeed > this.zoomOutSpeed) {
        ratio = 1 - (curSpeed - this.zoomOutSpeed)
        / (this.zoomInSpeed - this.zoomOutSpeed)
        this.camera.zoomRatio = cc.lerp(this.camera.zoomRatio, ratio, 0.02)
      }
      else {
        this.camera.zoomRatio = cc.lerp(
          this.camera.zoomRatio,
          this.initZoomRatio,
          0.02,
        )
      }
    }

    this.previousPos = targetPos

    // jump zoom
    if (this.jumpZoom) {
      const ratio = targetPos.y / cc.winSize.height
      this.camera.zoomRatio = 1 + (0.6 - ratio) * 0.35
    }

    // boundaries

    if (this.useBoundaries) {
      const width = (this.visibleSize.width / 2) / this.camera.zoomRatio
      const height = (this.visibleSize.height / 2) / this.camera.zoomRatio
      const minX = this.node.x - width
      const maxX = this.node.x + width
      const minY = this.node.y - height
      const maxY = this.node.y + height
      if (minX < this.leftBound)
        this.node.x = this.leftBound + width

      if (minY < this.bottomBound)
        this.node.y = this.bottomBound + height

      if (maxX > this.rightBound)
        this.node.x = this.rightBound - width

      if (maxY > this.topBound)
        this.node.y = this.topBound - height
    }
  }

  getOverviewTargetsMidpoint() {
    let midPoint = v2(0, 0)
    let minX = 99999
    let minY = 99999
    let maxX = -99999
    let maxY = -99999
    for (let i = 0; i < this.overviewTargets.length; ++i) {
      const target = this.overviewTargets[i]
      maxX = target.x > maxX ? target.x : maxX
      minX = target.x < minX ? target.x : minX
      maxY = target.y > maxY ? target.y : maxY
      minY = target.y < minY ? target.y : minY
    }
    maxX += this.overviewMargin
    minX -= this.overviewMargin
    maxY += this.overviewMargin
    minY -= this.overviewMargin
    const distX = Math.abs(maxX - minX)
    const distY = Math.abs(maxY - minY)
    midPoint = cc.v2(minX + distX / 2, minY + distY / 2)
    const ratio = Math.max(
      distX / this.visibleSize.width,
      distY / this.visibleSize.height,
    )
    this.camera.zoomRatio = 1 / ratio
    return midPoint
  }

  shakeCamera() {
    if (!this.canShake)
      return
    this.anim.play('shake')
    this.scheduleOnce(this.stopShake.bind(this), this.shakeDuration)
  }

  stopShake() {
    this.anim.stop()
    this.camera.node.position = cc.v2(0, 0)
  }

  onMouseMove(event) {
    this.pointerPos = event.getLocation()
  }

  onTouchMove(event) {
    this.pointerPos = event.getLocation()
  }
}
