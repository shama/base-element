module.exports = Button

var BaseElement = require('../../index.js')

function Button (el) {
  BaseElement.call(this, el)
  var self = this
  this.onclick = function (e) {
    self.send('clicked', e.target)
  }
}
Button.prototype = Object.create(BaseElement.prototype)

Button.prototype.render = function (label) {
  var vtree = this.html('button', this, label)
  return this.afterRender(vtree)
}
