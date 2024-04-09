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
 * Get Parent Menu
 * @param {*} SceneName
 */
function getParentMenu(SceneName: string) {
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
  back() {
    const curSceneName = director.getScene().name
    const parentScene = getParentMenu(curSceneName)
    director.loadScene(parentScene, () => {
      log(`Back To ${parentScene}`)
    })
  }
}
