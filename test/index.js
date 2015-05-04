var help = require('browser-test-helpers')()
var test = require('tape')

var Button = require('./fixtures/button.js')

test('simple down and up', function (t) {
  var expected = 'Testing ' + Math.random()
  var button = new Button()
  button.on('clicked', function (el) {
    t.equal(el.innerHTML, expected, 'data was sent down and event came up')
    t.end()
  })
  button.render(expected)
  help.click(button.element)
})
