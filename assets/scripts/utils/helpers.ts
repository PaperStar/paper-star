import type { Collider2D } from 'cc'
import { Bullet } from '../game/objects/bullet/Bullet'

/**
 * 计算承受伤害
 * @param otherCollider
 */
export function inflictDamage(otherCollider: Collider2D) {
  const name = otherCollider.node.name.toLowerCase()
  if (name.includes('bullet'))
    return otherCollider.node.getComponent(Bullet).damage

  if (name.includes('foe'))
    return 1

  return 1
}
