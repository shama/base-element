/*eslint-disable */

var List = require('./list.js')

var MyListComponent = Ember.Component.extend({
  data: ['one', 'two', 'three'],
  didInsertElement: function () {
    this._super()

    var data = this.get('data')

    var list = new List(this.element)
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

  }
})
