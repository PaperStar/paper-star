import { Component, _decorator, director, log } from 'cc'

const menu = [
  {
    parent: 'StartMenu',
    children: [
      'StartMenu',
      'ModeMenu',
      'AchieveSystem',
    ],
  },
  {
    parent: 'ModeMenu',
    children: [
      'FreeMode',
      'GravityMode',
      'MissionMode',
      'PropsMode',
    ],
  },
]

/**
 *
 *
 * @param {*} SceneName
 * @return {String}
 */
function getParentMenu(SceneName) {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (SceneName === menu[i].children[j])
          return menu[i].parent
      }
    }
  }
  return 'StartMenu'
}

const { ccclass } = _decorator

@ccclass('Back')
export class Back extends Component {
  start() {
    Global.curSceneName = director.getScene().name
  }

  back() {
    const parentScene = getParentMenu(Global.curSceneName)
    director.loadScene(parentScene, () => {
      log(`Back To ${parentScene}`)
    })
  }
}
