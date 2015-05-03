var List = require('./list.js')

// Data for our list
var data = [
  'one', 'two', 'three'
]

// Create instance of our list
var list = new List()

// When item clicked
list.on('clicked', function (item) {
  window.alert('You clicked ' + item.innerHTML)
})

// When item added
list.on('added', function () {
  data.push(String(Math.random() * 9999))
  list.render(data)
})

list.render(data)
