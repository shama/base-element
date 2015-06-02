// This example shows an example "complex" slideshow element in use with ES6
// syntax care of babel: https://babeljs.io/

import BaseElement from '../index.js'

class Slides extends BaseElement {
  constructor (el) {
    super(el)
    // Create a property for the actively shown slide
    this.activeIndex = 0
    // When a slide is selected, set that as the activeIndex then render
    this.addEventListener('select', idx => {
      this.activeIndex = idx
      this.render(this.data)
    })
    // Inline styles for this element
    this.style = {
      display: 'table',
      margin: '0',
      padding: '0'
    }
  }
  render (slides) {
    // Save a local copy of data for re-rendering
    this.data = slides
    slides = slides.map((slide, idx) => {
      let tag = 'li'
      // If this is the active slide, set the content and .active class
      if (idx === this.activeIndex) {
        tag = 'li.active'
        this.content = slide.content
      }
      // Render each <li><button/></li>
      return this.html(tag, {
        style: {
          listStyle: 'none',
          float: 'left',
          margin: '0 .5em'
        }
      }, [
        this.html('button', {
          onclick: e => {
            // onclick send a select event up with index
            this.send('select', idx)
          }
        }, slide.name)
      ])
    })
    // Build our tree with <div><ul>buttons</ul><div>content</div></div>
    let vtree = this.html('div', [
      this.html('ul.sections', this, slides),
      this.html('.content', {
        style: {
          padding: '1em'
        }
      }, this.content)
    ])
    // Return the tree wrapped in afterRender
    return this.afterRender(vtree)
  }
}

// The end user API from here on down
let slides = new Slides(document.body)
slides.render([
  { name: 'intro', content: 'Intro...' },
  { name: 'examples', content: 'Examples...' },
  { name: 'outro', content: 'Outro...' }
])
