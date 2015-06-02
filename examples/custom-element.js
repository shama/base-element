// This example uses ./list.js (an element created with base-element)
// in use with the library "custom-element": https://www.npmjs.com/package/custom-element

require('webcomponents.js')

var List = require('./list.js')
var createCustom = require('custom-element')

// Mock data for the element
var data = ['one', 'two', 'three']

var CustomHTMLElement = createCustom().on('created', function () {
  var self = this
  // When the element is created, consume List's API
  // Attaching to the element so it can be called via the element itself, totally optional though
  self.list = new List(self)
  self.list.render(data)
  self.list.addEventListener('clicked', function (item) {
    window.alert('You clicked ' + item.innerHTML)
  })
  self.list.addEventListener('added', function () {
    data.push(String(Math.random() * 9999))
    self.list.render(data)
  })
}).on('attribute', function (key) {
  // When an attribute is set, add the attribute value to our data
  var test = this.getAttribute(key)
  data.push(test)
  this.list.render(data)
})

// Register our custom element
var CustomElement = document.registerElement('custom-element', CustomHTMLElement)

// Create and append it to document.body
var el = new CustomElement()
document.body.appendChild(el)

// 2s later, modify the attribute of the element
setTimeout(function () {
  el.setAttribute('data-test', 'I was added because of an attribute')
}, 2000)
