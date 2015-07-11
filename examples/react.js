// This example uses ./list.js (an element created with base-element)
// in use with a React component: https://facebook.github.io/react/

var List = require('./list.js')
var React = require('react')

// Create a React component that wraps the List
var XList = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.propTypes.string)
  },
  componentDidMount: function () {
    var list = new List(React.findDOMNode(this))
    var data = this.props.items
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
  },
  render: function () {
    return React.createElement('div')
  }
})

React.render(
  React.createElement(XList, { items: ['one', 'two', 'three'] }),
  document.body
)
