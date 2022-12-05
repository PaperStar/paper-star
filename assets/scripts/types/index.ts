import { Enum } from 'cc'

export const PlanetType = Enum({
  Simple: -1,
  Other: -1,
})

export const BossType = Enum({
  Carrier: -1,
  BlackBomber: -1,
})

/**
 * 敌人类型
 */
export const FoeType = Enum({
  Foe0: -1,
  Foe1: -1,
  Foe2: -1,
  Foe3: -1,
  Boss1: -1,
  Boss2: -1,
})

export const AttackType = Enum({
  Melee: -1,
  Range: -1,
})

export const BulletType = Enum({
  Line: -1,
  Chain: -1,
  FireBall: -1,
  None: 999,
})

/**
 * 道具类型
 */
export const PropType = Enum({
  Chain: -1,
  FireBall: -1,
  Star: -1,
  Fast: -1,
  Slow: -1,
  Life: -1,
})
