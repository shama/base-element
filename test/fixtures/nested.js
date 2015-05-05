module.exports = Top

var BaseElement = require('../../index.js')

function Bottom (el) {
  BaseElement.call(this, el)
}
Bottom.prototype = Object.create(BaseElement.prototype)

Bottom.prototype.render = function (data) {
  var vtree = this.html('li.bottom', data)
  return this.afterRender(vtree)
}

function Middle (el) {
  Bottom.call(this, el)
}
Middle.prototype = Object.create(Bottom.prototype)

Middle.prototype.render = function (data) {
  var bottom = Bottom.prototype.render(data)
  var vtree = this.html('ul.middle', bottom)
  return this.afterRender(vtree)
}

function Top (el) {
  Middle.call(this, el)
}
Top.prototype = Object.create(Middle.prototype)

Top.prototype.render = function (data) {
  var middle = Middle.prototype.render(data)
  var vtree = this.html('div.top', middle)
  return this.afterRender(vtree)
}
