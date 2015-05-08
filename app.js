import Nav from './lib/nav.js'

const container = document.getElementsByClassName('container')[0]
const style = document.createElement('style')
document.head.appendChild(style)

const nav = new Nav(container)
nav.render([
  { label: 'Top', link: '#top' },
  { label: 'Examples', link: '#examples' },
])
style.innerHTML += nav.css()
