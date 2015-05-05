module.exports = Top

var BaseElement = require('../../index.js')

function Bottom (el) {
  BaseElement.call(this, el)
}
Bottom.prototype = Object.create(BaseElement.prototype)
Bottom.prototype.test = 'bottom'

Bottom.prototype.render = function (data) {
  //console.log('render bottom')
  //return this.super(data)
  var vtree = this.html('li.bottom', data)
  //return BaseElement.prototype.render(vtree)
  //return this.super(vtree)
  return this.super(vtree)
  //return vtree
}

function Middle (el) {
  Bottom.call(this, el)
}
Middle.prototype = Object.create(Bottom.prototype)
Middle.prototype.test = 'middle'

Middle.prototype.render = function (data) {
  //console.log('render middle', this)
  var bottom = Bottom.prototype.render(data)
  return this.super(this.html('ul.middle', bottom))
  //return this.super(data)
}

function Top (el) {
  Middle.call(this, el)
}
Top.prototype = Object.create(Middle.prototype)
Top.prototype.test = 'top'

Top.prototype.render = function (data) {
  var middle = Middle.prototype.render(data)
  var vtree = this.html('div.top', middle)
  //console.log(vtree)
  return this.super(vtree)

  //return this.super(data)
  // return this.super(this.html('.top'), [
  //   this.super(data)
  // ])
}
