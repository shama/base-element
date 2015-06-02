// An example element that can gets used by all the other examples

module.exports = List

var BaseElement = require('../index.js')
var attachCSS = require('attach-css')

function List (el) {
  BaseElement.call(this, el)
  this.className = 'list'
}
List.prototype = Object.create(BaseElement.prototype)

List.prototype.render = function (items) {
  var self = this

  // Create li upon click just lets us know it was clicked
  items = items.map(function (item) {
    return self.html('li', {
      onclick: function (e) {
        self.send('clicked', e.target)
      }
    }, item)
  })

  // Add button that adds new li's to list
  items.unshift(this.html('li', this.html('button', {
    onclick: function (e) {
      self.send('added')
    }
  }, ['add item'])))

  return this.afterRender(this.html('ul', this, items))
}

// Localized CSS can be returned using attachCSS()
List.prototype.css = function () {
  // Can be a string, brfs a style.css, or css preprocessor
  return attachCSS(`
  * {
    font-family: Helvetica, sans-serif;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  ul li {
    list-style: none;
    border-bottom: 1px solid #ddd;
    padding: .3em 0;
  }
  ul li:hover {
    background-color: #eee;
    transition: .5s;
    padding-left: .5em;
    cursor: pointer;
  }
  li:first-child {
    padding: .3em;
    border-bottom: 1px solid #333;
    text-align: right;
  }
  button {
    border: none;
    padding: .3em .5em;
    background-color: #00bcd4;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
  }
  button:hover {
    padding: .3em 1em;
    transition: .5s;
  }
  `, this.vtree)
}
