module.exports = Button

var BaseElement = require('../../index.js')

function Button (el) {
  BaseElement.call(this, el)
}
Button.prototype = Object.create(BaseElement.prototype)

Button.prototype.render = function (label) {
  var self = this
  var vtree = this.html('button', {
    onclick: function (e) {
      self.send('clicked', e.target)
    }
  }, label)
  return this.super(vtree)
}
