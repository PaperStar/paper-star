import type { Camera, Node } from 'cc'
import { Component, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('MainCamera')
export class MainCamera extends Component {
  @property({
    tooltip: '相机',
  })
  camera: Camera

  /**
   * 目标
   */
  target: Node

  init(target: Node) {
    this.target = target
  }

  lateUpdate() {
    if (this.target) {
      this.camera.node.setPosition(this.target.position)

      const targetPos = this.target.parent
        .convertToWorldSpaceAR(this.target.position)
      this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos)
    }
  }
}
