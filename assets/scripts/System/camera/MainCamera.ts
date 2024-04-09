import type { Camera } from 'cc'
import { Component, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('MainCamera')
export class MainCamera extends Component {
  @property({
    tooltip: '相机',
  })
  camera: Camera

  init(target) {
    this.target = target
  }

  lateUpdate() {
    if (this.target) {
      this.camera.x = this.target.x
      this.camera.y = this.target.y

      const targetPos = this.target.parent
        .convertToWorldSpaceAR(this.target.position)
      this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos)
    }
  }
}
