import type { Node, Prefab } from 'cc'
import { find, instantiate } from 'cc'

export class ResourceUtil {
  /**
   * 创建ui界面
   */
  public static async createUI(uiPrefab: Prefab, parent?: Node) {
    const node = instantiate(uiPrefab)
    node.setPosition(0, 0, 0)

    if (!parent)
      parent = find('Canvas')

    parent.addChild(node)
    return node
  }
}
