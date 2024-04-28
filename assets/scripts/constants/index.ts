export enum GameState {
  /**
   * 初始化资源
   */
  INIT,
  /**
   * 游戏进行中
   */
  PLAYING,
  /**
   * 游戏暂停
   */
  PAUSE,
  /**
   * 游戏结束
   */
  OVER,
}

export const SCENE = {
  /**
   * 道具模式
   */
  PROPS_MODE: 'PropsMode',
}

/**
 * Player actions
 */
export enum PLAYER_ACTION {
  MOVE,
  STOP_MOVE,
}
