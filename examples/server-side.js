var List = require('./list.js')
var http = require('http')
var browserify = require('browserify')
var path = require('path')

// Create our server
http.createServer(function (req, res) {
  // Some crude routing
  if (req.url === '/' || req.url === '/index.html') {
    index(res)
  } else if (req.url === '/bundle.js') {
    script(res)
  } else {
    res.end('')
  }
}).listen(1337)
console.log('Server running at http://localhost:1337/')

// Our index.html
function index (res) {
  res.writeHead(200, {'Content-Type': 'text/html'})

  // Initial data for the list
  var data = ['This is', 'the initial', 'content']

  // Create/render the list
  var list = new List()

  // Convert the list element to static HTML and send out
  var html = list.toString(data)

  // Serve up our template
  var template = `<html><body>
    ${html}
    <script src="/bundle.js"></script>
  </body></html>`
  res.end(template)
}

// Our script that will take over after the initial static render
function script (res) {
  var b = browserify()
  b.add(path.join(__dirname, 'standalone.js'))
  b.bundle(function (err, buf) {
    if (err) throw err
    res.writeHead(200, {'Content-Type': 'application/javascript'})
    res.end(buf)
  })
}
