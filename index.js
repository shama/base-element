module.exports = BaseElement

var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')
var toHTML = require('vdom-to-html')
var isArray = require('isarray')

function BaseElement (el) {
  if (!(this instanceof BaseElement)) return new BaseElement(el)
  this.vtree = null
  this.element = null
  this.__appendTo__ = el
  this.__events__ = Object.create(null)
  this.__BaseElementSig__ = 'be-' + Date.now()
  this.__onload__ = new Onload(this.send.bind(this))
}

BaseElement.prototype.html = function BaseElement_html () {
  return h.apply(this, arguments)
}

BaseElement.prototype.afterRender = function BaseElement_afterRender (vtree) {
  if (this.hasOwnProperty('__BaseElementSig__')) {
    return BaseElement.prototype.render.call(this, vtree)
  }
  return vtree
}

BaseElement.prototype.render = function BaseElement_render (vtree) {
  if (typeof vtree === 'function') {
    vtree = vtree.call(this)
  }
  // Top level vnode must have className for CSS
  // TODO: Check if were using CSS though
  if (vtree && vtree.properties && !vtree.properties.className) {
    vtree.properties.className = this.__BaseElementSig__
  }
  if (!this.vtree) {
    this.vtree = vtree
    this.element = createElement(this.vtree)
    if (this.__appendTo__) {
      this.__appendTo__.appendChild(this.element)
    }
  } else {
    var patches = diff(this.vtree, vtree)
    this.element = patch(this.element, patches)
    this.vtree = vtree
  }
  return this.vtree
}

BaseElement.prototype.toString = function BaseElement_toString () {
  this.render.apply(this, arguments)
  return toHTML(this.vtree)
}

BaseElement.prototype.send = function BaseElement_send (name) {
  var found = this.__events__[name]
  if (!found) return this
  var args = Array.prototype.slice.call(arguments, 1)
  for (var i = 0; i < found.length; i++) {
    var fn = found[i]
    fn.apply(this, args)
  }
  return this
}

BaseElement.prototype.addEventListener = function BaseElement_addEventListener (name, cb) {
  if (typeof cb !== 'function') return
  if (!isArray(this.__events__[name])) this.__events__[name] = []
  this.__events__[name].push(cb)
}

function Onload (cb) {
  this.cb = cb
}
Onload.prototype.hook = function BaseElement_hook (node) {
  var self = this
  setTimeout(function BaseElement_hook_setTimeout () {
    self.cb('load', node)
  }, 10)
}
Onload.prototype.unhook = function BaseElement_unhook (node) {
  var self = this
  setTimeout(function BaseElement_unhook_setTimeout () {
    self.cb('unload', node)
  }, 10)
}
