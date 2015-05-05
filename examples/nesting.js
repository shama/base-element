var BaseElement = require('../index.js')

// First Bear extends BaseElement
function Bear (el) {
  BaseElement.call(this, el)
}
Bear.prototype = Object.create(BaseElement.prototype)
Bear.prototype.render = function (items) {
  var self = this
  var vtree = items.map(function (item) {
    return self.html('li.bear', item)
  })
  return this.afterRender(vtree)
}

// Second Grizzly extends Bear
function Grizzly (el) {
  Bear.call(this, el)
}
Grizzly.prototype = Object.create(Bear.prototype)
Grizzly.prototype.render = function (data) {
  var bears = Bear.prototype.render(data.bears)
  var vtree = this.html('ul.grizzly', [
    this.html('li', 'Top'),
    bears,
    this.html('li', 'Bottom')
  ])
  return this.afterRender(vtree)
}

// Third App extends Grizzly
function App (el) {
  Grizzly.call(this, el)
}
App.prototype = Object.create(Grizzly.prototype)
App.prototype.render = function (data) {
  var middle = Grizzly.prototype.render(data)
  var vtree = this.html('div.app', [data.heading, middle])
  return this.afterRender(vtree)
}

// The end user only cares about App
var app = new App(document.body)
app.render({
  heading: 'Bears',
  bears: ['Grizzly', 'Polar', 'Brown']
})
