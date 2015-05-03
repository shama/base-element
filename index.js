module.exports = BaseElement

var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')

function BaseElement (el) {
  if (!(this instanceof BaseElement)) return BaseElement(el)
  this.vtree = null
  this.element = null
  this.__appendTo__ = el || document.body
  this.__events__ = Object.create(null)
  // Decorate _name to methods for super()
  for (var method in this) {
    if (typeof this[method] === 'function') {
      this[method]._name = method
    }
  }
}

BaseElement.prototype.html = function () {
  return h.apply(this, arguments)
}

BaseElement.prototype.render = function (vtree) {
  if (!this.vtree) {
    this.vtree = vtree
    this.element = createElement(this.vtree)
    this.__appendTo__.appendChild(this.element)
  } else {
    var patches = diff(this.vtree, vtree)
    this.element = patch(this.element, patches)
    this.vtree = vtree
  }
  return this
}

BaseElement.prototype.send = function (name) {
  var found = this.__events__[name]
  if (!found) return this
  var args = Array.prototype.slice.call(arguments, 1)
  for (var i = 0; i < found.length; i++) {
    var fn = found[i]
    if (typeof fn === 'function') fn.apply(this, args)
  }
  return this
}

BaseElement.prototype.on = function (name, cb) {
  if (!Array.isArray(this.__events__[name])) this.__events__[name] = []
  this.__events__[name].push(cb)
}

// Ability to call super() on methods
Object.defineProperty(BaseElement.prototype, 'super', {
  get: function get () {
    var name = get.caller._name
    var found = this[name] === get.caller
    var proto = this
    while (proto = Object.getPrototypeOf(proto)) { // eslint-disable-line
      if (!proto[name]) {
        break
      } else if (proto[name] === get.caller) {
        found = true
      } else if (found) {
        return proto[name]
      }
    }
  }
})
