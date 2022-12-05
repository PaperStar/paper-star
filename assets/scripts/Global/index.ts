import { director, game } from 'cc'

game.once(game.EVENT_ENGINE_INITED, () => {
  debug()
})

/**
 * Debug
 *
 */
export function debug() {
  director.getPhysicsManager().enabled = true
  // let debugFlag = true
  const debugFlag = false
  if (debugFlag) {
    director.getPhysicsManager().debugDrawFlags
      = cc.PhysicsManager.DrawBits.e_aabbBit
        | cc.PhysicsManager.DrawBits.e_pairBit
        | cc.PhysicsManager.DrawBits.e_centerOfMassBit
        | cc.PhysicsManager.DrawBits.e_jointBit
        | cc.PhysicsManager.DrawBits.e_shapeBit
  }

  window.Global = {
    Helpers,
    wxGame: null,
    userInfo: null,
    config: null,
    rank: null,
    curSceneName: 'StartMenu',
    common: null, // public method
    commonInfo: null, // some const
    game: null,
  }
}
