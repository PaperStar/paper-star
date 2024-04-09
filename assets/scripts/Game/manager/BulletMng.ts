import { Component, _decorator, log } from 'cc'
import type { GameManager } from '../GameManager'

const { ccclass } = _decorator

@ccclass('BulletMng')
export class BulletMng extends Component {
  game: GameManager

  init(game: GameManager) {
    this.game = game
  }

  spawnBullet(bulletType, dir, role) {
    const newBullet = this.game.poolMng.getBullet(bulletType)
    if (newBullet)
      newBullet.getComponent('Bullet').init(this, dir, role)
    else
      log('Too Many Bullets!')
  }

  despawnBullet(bullet) {
    const type = bullet.bulletType
    this.game.poolMng.putBullet(type, bullet.node)
  }
}
