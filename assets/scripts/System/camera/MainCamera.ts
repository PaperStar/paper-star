import type { Node } from 'cc'
import { Camera, Color, Component, _decorator } from 'cc'

const { ccclass } = _decorator

@ccclass('MainCamera')
export class MainCamera extends Component {
  /**
   * 目标
   */
  target: Node

  protected onLoad(): void {
    const camera = this.node.getComponent(Camera)
    camera.clearFlags = Camera.ClearFlag.SOLID_COLOR
    camera.clearColor = Color.GRAY
  }

  setTarget(target: Node) {
    this.target = target
  }

  lateUpdate() {
    // if (this.target) {
    //   this.node.setPosition(this.target.position)

    //   const targetParentUITransform = this.target.parent.getComponent(UITransform)
    //   // 目标的全局位置
    //   const targetPos = targetParentUITransform.convertToWorldSpaceAR(this.target.position)
    //   // 镜头跟随目标
    //   this.node.setPosition(targetPos)
    // }
  }
}
