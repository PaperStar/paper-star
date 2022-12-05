export function inflictDamage(otherCollider) {
  const name = otherCollider.node.name.toLowerCase()
  if (name.includes('bullet'))
    return otherCollider.node.getComponent('Bullet').damage

  if (name.includes('foe'))
    return 1

  return 1
}
