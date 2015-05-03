var List = require('./list.js')

// Data for the list
var data = ['one', 'two', 'three']

// Create a list
var list = new List()
list.render(data)

// When item clicked
list.on('clicked', function (item) {
  window.alert('You clicked ' + item.innerHTML)
})

// When item added
list.on('added', function () {
  data.push(String(Math.random() * 9999))
  list.render(data)
})
