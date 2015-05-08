import BaseElement from '../index.js'
import MenuButton from './menu-button.js'

export default class Nav extends BaseElement {
  constructor (el) {
    super(el)
    this.data = []
    this.shown = false
    this.on('toggle', () => {
      this.shown = !this.shown
      this.render(this.data)
    })
    this.menu = new MenuButton(false)
    this.menu.on('click', () => {
      this.shown = !this.shown
      this.render(this.data)
    })
  }

  render (links) {
    this.data = links
    let el = (this.shown) ? this.links(links) : this.menu.render()
    return this.afterRender(this.html('nav.nav', el))
  }

  links (links) {
    links = links.map((link) => {
      return this.html('li', this.html('button', {
        onclick: (e) => {
          this.send('navigate', link.link)
        }
      }, link.label))
    })
    return this.html('ul.nav', this, links)
  }

  css () {
    let css = this.menu.css() + `
      ul {
        margin: 0;
        padding: 1em 0 0 0;
        width: 200px;
        height: 100%;
        background-color: #DCEDC8;
        border-right: 1px solid #33691E;
      }
      li {
        list-style: none;
        width: 100%;
      }
      button {
        width: 100%;
        font-size: 1.2em;
        padding: .2em .5em;
        border: none;
        background: none;
        cursor: pointer;
        text-align: left;
      }
      button:hover {
        background-color: #AED581;
      }
    `
    return this.attachCSS(css)
  }
}
