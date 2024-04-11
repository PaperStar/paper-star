import { Enum } from 'cc'

export * from './data'

export enum PlanetType {
  Simple,
  Other,
}

export const BossType = Enum({
  Carrier: -1,
  BlackBomber: -1,
})

/**
 * 敌人类型
 */
export enum FoeType {
  Foe0,
  Foe1,
  Foe2,
  Foe3,
  Boss1,
  Boss2,
}

export const AttackType = Enum({
  Melee: -1,
  Range: -1,
})

/**
 * 子弹类型
 */
export enum BulletType {
  /**
   * 直线
   */
  Line,
  /**
   * 链式
   */
  Chain,
  /**
   * 火球
   */
  FireBall,
  None,
}

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
