var help = require('browser-test-helpers')()
var test = require('tape')

var Button = require('./fixtures/button.js')
var Nested = require('./fixtures/nested.js')

test('simple down and up', function (t) {
  var expected = 'Testing ' + Math.random()
  var button = new Button()
  button.on('clicked', function (el) {
    t.equal(el.innerHTML, expected, 'data was sent down and event came up')
    tearDown(t.end)
  })
  button.render(expected)
  help.click(button.element)
})

test('renders nested elements', function (t) {
  t.plan(1)
  setUp(function (fixture) {
    var nested = new Nested(fixture)
    nested.render('test')
    t.equal(fixture.innerHTML, '<div class="top"><ul class="middle"><li class="bottom">test</li></ul></div>')
    tearDown(t.end)
  })
})

function setUp (cb) {
  var fixture = document.createElement('div')
  fixture.setAttribute('id', 'fixture')
  document.body.appendChild(fixture)
  cb(fixture)
}

function tearDown (cb) {
  var fixture = document.getElementById('fixture')
  document.body.removeChild(fixture)
  cb()
}
