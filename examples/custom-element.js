// Example using with: https://github.com/requireio/custom-element

require('webcomponents.js')

var List = require('./list.js')
var createCustom = require('custom-element')

var data = ['one', 'two', 'three']

var CustomHTMLElement = createCustom().on('created', function () {
  var list = new List(this)
  list.render(data)
  list.on('clicked', function (item) {
    window.alert('You clicked ' + item.innerHTML)
  })
  list.on('added', function () {
    data.push(String(Math.random() * 9999))
    list.render(data)
  })
})

var CustomElement = document.registerElement('custom-element', CustomHTMLElement)
document.body.appendChild(new CustomElement())
