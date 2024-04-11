import { Component, Node, _decorator } from 'cc'

const { ccclass, property } = _decorator

@ccclass('FightPanel')
export class FightPanel extends Component {
  @property(Node)
  public joystick: Node = null!// 手柄节点

  start() {

  }

  update(_deltaTime: number) {

  }
}
