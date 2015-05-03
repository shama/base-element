# base-element
A base element library for building standalone virtual DOM based elements.

## example
Create a generic JavaScript "class" that inherits BaseElement:

```js
var BaseElement = require('base-element')

function Bear () {
  BaseElement.call(this)
}
Bear.prototype = Object.create(BaseElement.prototype)
// Or inherits(Bear, BaseElement)
```

Then build your elements:

```js
Bear.prototype.render = function (typeOfBear) {
  // Create a virtual DOM tree
  var vtree = this.html('div.bear', ['Im a ' + typeOfBear + '!'])
  // Call the super() render method with your vtree
  return this.super(vtree)
}
```

## data down, events up
Virtual DOMs work best (in the opinion of myself and many) when data goes down
and event (or actions) go up.

A simple example is a button element that changes when clicked. **How** it
changes is up to the element but **what** it changes to is up to the user.

This is our Button element:

```js
var BaseElement = require('base-element')

function Button () {
  BaseElement.call(this)
}
Button.prototype = Object.create(BaseElement.prototype)
// Or inherits(Button, BaseElement)

Button.prototype.render = function (label) {
  var self = this
  return this.super(this.html('button', {
    onclick: function (event) {
      self.send('clicked', event.target)
    }
  }, label))
}
```

and this is the user's implementation, creates a button and on every click it
changes to a random number:

```js
var button = require('your-button')()
button.on('click', function (button) {
  button.render('button label ' + Math.random())
})
```

## api

### `var element = new BaseElement(attachTo)`
`attachTo` is a DOM element you want to append to. Defaults to `document.body`.

### `element.render(vtree)`
Renders your virtual DOM tree to the DOM element.

### `element.send(name[, params])`
Sends an event up with a given `name` and `params`.

### `element.on(name, function)`
Register an event listener for a given name:

```js
element.on('clicked', function (params) {})
```

### `element.element`
The root DOM node the virtual tree resides on.

### `element.vtree`
The current virtual DOM tree of the base element.

# license
(c) 2015 Kyle Robinson Young. MIT License
