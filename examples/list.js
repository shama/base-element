module.exports = List

var BaseElement = require('../index.js')

function List (el) {
  BaseElement.call(this, el)
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

  return this.afterRender(this.html('ul', items))
}
