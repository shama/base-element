var help = require('browser-test-helpers')()
var test = require('tape')

var createElement = require('../index.js')
var Button = require('./fixtures/button.js')
var Nested = require('./fixtures/nested.js')

test('simple down and up', function (t) {
  setUp(function (fixture) {
    var expected = 'Testing ' + Math.random()
    var button = new Button(fixture)
    button.addEventListener('clicked', function (el) {
      t.equal(el.innerHTML, expected, 'data was sent down and event came up')
      tearDown(fixture, t.end)
    })
    button.render(expected)
    help.click(button.element)
  })
})

test('renders nested elements', function (t) {
  t.plan(1)
  setUp(function (fixture) {
    var nested = new Nested(fixture)
    nested.render('test')
    t.equal(fixture.innerHTML, '<div class="top"><ul class="middle"><li class="bottom">test</li></ul></div>')
    tearDown(fixture, t.end)
  })
})

test('functional API', function (t) {
  t.plan(1)
  setUp(function (fixture) {
    var el = createElement(fixture)
    el.render(function () {
      return this.html('.test', 'testing')
    })
    t.equal(fixture.innerHTML, '<div class="test">testing</div>')
    tearDown(fixture, t.end)
  })
})

test('load event fired', function (t) {
  t.plan(1)
  setUp(function (fixture) {
    var button = new Button(fixture)
    button.addEventListener('load', function (node) {
      t.equal(node.innerHTML, 'Test')
      tearDown(fixture, t.end)
    })
    button.render('Test')
  })
})

test('unload event fired', function (t) {
  t.plan(1)
  setUp(function (fixture) {
    var button = new Button()
    button.addEventListener('unload', function (node) {
      t.equal(node.innerHTML, 'Test')
      tearDown(fixture, t.end)
    })

    var el = createElement(fixture)
    el.render(function () {
      return this.html('div', button.render('Test'))
    })

    setTimeout(function () {
      el.render(function () {
        return this.html('div')
      })
    }, 100)
  })
})

test('toString', function (t) {
  t.plan(1)
  setUp(function (fixture) {
    var nested = new Nested(fixture)
    t.equal(nested.toString('test'), '<div class="top"><ul class="middle"><li class="bottom">test</li></ul></div>')
    tearDown(fixture, t.end)
  })
})

function setUp (cb) {
  var fixture = document.createElement('div')
  fixture.setAttribute('id', 'fixture' + Date.now())
  document.body.appendChild(fixture)
  cb(fixture)
}

function tearDown (fixture, cb) {
  fixture.parentNode.removeChild(fixture)
  cb()
}
