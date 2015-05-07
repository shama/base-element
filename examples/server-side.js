var List = require('./list.js')

var http = require('http')
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})

  // Data for the list
  var data = ['one', 'two', 'three']

  // Create/render a list
  var list = new List()
  list.render(data)

  // Convert the list element to static HTML and send out
  var html = list.element.toString()
  res.end(html)
}).listen(1337)

console.log('Server running at http://localhost:1337/')
