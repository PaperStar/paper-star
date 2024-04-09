import { Component, _decorator, log } from 'cc'

const { ccclass } = _decorator

@ccclass('Test')
export class Test extends Component {
  start() {
    log('Test start')
  }

  update(deltaTime: number) {
    log('Test update', deltaTime)
  }
}
