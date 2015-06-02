/*global HTMLElement:false*/

// This example uses ./list.js (an element created with base-element)
// in use with web components: http://webcomponents.org/

var List = require('./list.js')

var data = ['one', 'two', 'three']

// Create a proto for our custom element
var proto = Object.create(HTMLElement.prototype)
proto.createdCallback = function () {
  // Create a new list and append to this custom element
  var list = new List(this)
  list.render(data)

  // When item clicked
  list.addEventListener('clicked', function (item) {
    window.alert('You clicked ' + item.innerHTML)
  })

  // When item added
  list.addEventListener('added', function () {
    data.push(String(Math.random() * 9999))
    list.render(data)
  })
}

// Create our tag using the above proto
var XList = document.registerElement('x-list', {
  prototype: proto
})
document.body.appendChild(new XList())
