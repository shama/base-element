module.exports = BaseElement

var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')
var toHTML = require('vdom-to-html')
var EventTarget = require('dom-event-target')
var inherits = require('inherits')
var nextTick = require('next-tick')

function BaseElement (el) {
  if (!(this instanceof BaseElement)) return new BaseElement(el)
  EventTarget.call(this)
  this.vtree = null
  this.element = null
  this.__appendTo__ = el
  this.__BaseElementSig__ = 'be-' + Date.now()
  this.__onload__ = new Onload(this.send.bind(this))
}
inherits(BaseElement, EventTarget)

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

function Onload (cb) {
  this.cb = cb
}
Onload.prototype.hook = function BaseElement_hook (node) {
  var self = this
  nextTick(function BaseElement_hook_nextTick () {
    self.cb('load', node)
  })
}
Onload.prototype.unhook = function BaseElement_unhook (node) {
  var self = this
  nextTick(function BaseElement_unhook_nextTick () {
    self.cb('unload', node)
  })
}
