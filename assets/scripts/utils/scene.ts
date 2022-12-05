import { director, log } from 'cc'

//  Paper Star - @YunYouJun
export function displayEgg() {
  log(
    '%c Paper Star - @YunYouJun ',
    'background:#000;color:#fff;padding:2px;border-radius:2px',
  )
}

export function loadStartMenu() {
  director.loadScene('StartMenu', () => {
    log('StartMenu is loaded.')
  })
}

export function loadStoryBoard() {
  director.loadScene('StoryBoard')
}
