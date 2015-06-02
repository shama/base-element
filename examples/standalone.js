// This example uses ./list.js (an element created with base-element)
// by itself :)

var List = require('./list.js')

// Data for the list
var data = ['one', 'two', 'three']

// Clear out any staticly rendered html (if this script is being served by server-side.js)
document.body.innerHTML = ''

// Create a list
var list = new List(document.body)
list.className = 'my-list'
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

// WIP: CSS should be written out to a separate file or nonce'd
// this part is just for testing and will be removed
var style = document.createElement('style')
style.innerHTML = list.css()
document.head.appendChild(style)
