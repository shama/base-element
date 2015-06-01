var test = require('tape')

var Nested = require('./fixtures/nested.js')

test('toString on server side', function (t) {
  t.plan(1)
  var nested = new Nested()
  t.equal(nested.toString('test'), '<div class="top"><ul class="middle"><li class="bottom">test</li></ul></div>')
  t.end()
})
