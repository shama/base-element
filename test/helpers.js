/*global MouseEvent:false*/
module.exports = Helpers

function Helpers () {
  if (!(this instanceof Helpers)) return new Helpers()
}

Helpers.prototype.click = function (el, opts) {
  opts = opts || {}
  var ev = new MouseEvent('click', {
    bubbles: opts.bubbles !== false,
    cancelable: opts.cancelable !== false,
    view: opts.view || window
  })
  return el.element.dispatchEvent(ev)
}
