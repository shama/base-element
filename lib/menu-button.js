
import BaseElement from '../index.js'

export default class MenuButton extends BaseElement {
  constructor (el) {
    super(el)
    this.onload = this.setAttributes({
      width: '18',
      height: '12',
      viewBox: '0 0 18 12',
      xmlns: 'http://www.w3.org/2000/svg'
    })
    this.onclick = (e) => {
      this.send('click')
    }
  }

  render () {
    return this.afterRender(this.html('svg.menu', this, [
      this.html('rect', { onload: this.setAttributes({ width: 18, height: 2, x: 0, y: 0 }) }),
      this.html('rect', { onload: this.setAttributes({ width: 18, height: 2, x: 0, y: 5 }) }),
      this.html('rect', { onload: this.setAttributes({ width: 18, height: 2, x: 0, y: 10 }) })
    ]))
  }

  css () {
    return this.attachCSS(`
      svg {
        position: absolute;
        top: 10px;
        left: 10px;
        cursor: pointer;
        border: 1px solid black;
      }
      rect {
        fill: black;
      }
    `)
  }

  // TODO: Move into BaseElement?
  setAttributes (attrs) {
    class SetAttributes {
      constructor (attrs) {
        this.attrs = attrs
      }
      hook (node) {
        setTimeout(() => {
          for (var k in this.attrs) {
            if (this.attrs.hasOwnProperty(k)) {
              node.setAttribute(k, this.attrs[k])
            }
          }
        }, 10)
      }
    }
    return new SetAttributes(attrs)
  }
}
