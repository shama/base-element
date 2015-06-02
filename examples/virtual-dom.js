// This example uses ./list.js (an element created with base-element)
// in use with virtual-dom: https://github.com/Matt-Esch/virtual-dom

var List = require('./list.js')

var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')

// Data for the list
var data = ['one', 'two', 'three']

// Create a list that does not automatically appendTo
// as we'll be handling that with virtual-dom
var list = new List()

// When item clicked
list.addEventListener('clicked', function (item) {
  window.alert('You clicked ' + item.innerHTML)
})

// When item added
list.addEventListener('added', function () {
  data.push(String(Math.random() * 9999))
  list.render(data)
})

// Main render function
function render () {
  return h('.my-list', [
    'With ' + data.length + ' rows:',
    list.render(data)
  ])
}

// Initial DOM tree render
var tree = render()
var rootNode = createElement(tree)
document.body.appendChild(rootNode)

// Main render loop
setInterval(function () {
  var newTree = render()
  var patches = diff(tree, newTree)
  rootNode = patch(rootNode, patches)
  tree = newTree
}, 100)
