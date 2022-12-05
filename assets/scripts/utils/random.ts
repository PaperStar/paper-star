import { Enum } from 'cc'

export const ColorList = Enum({
  blue: '#0078E7',
  success: '#21ba45',
  warning: '#f2711c',
  danger: '#db2828',
  info: '#42B8DD',
  purple: '#8e71c1',
  black: '#000000',
  dark: '#303133',
  light: '#eeeeee',
})

// Returns a random integer between min (included) and max (excluded)
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomColor() {
  const RoleColor = [
    'blue',
    'success',
    'warning',
    'danger',
    'info',
    'purple',
    'black',
  ]
  return this.ColorList[RoleColor[this.getRandom(0, RoleColor.length - 1)]]
}
