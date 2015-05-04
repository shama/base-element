# base-element
An element authoring library for creating standalone and performant elements.

View [this example List element](https://github.com/shama/base-element/blob/master/examples/list.js) in use with:
* [React](https://github.com/shama/base-element/blob/master/examples/react.js)
* [Ember](https://github.com/shama/base-element/blob/master/examples/ember.js)
* [Web Component](https://github.com/shama/base-element/blob/master/examples/webcomponent.js)
* [virtual-dom](https://github.com/shama/base-element/blob/master/examples/virtual-dom.js)
* [or just standalone](https://github.com/shama/base-element/blob/master/examples/standalone.js)

## example usage
Create a generic JavaScript "class" that inherits BaseElement:

```js
var BaseElement = require('base-element')

function Bear () {
  BaseElement.call(this)
}
Bear.prototype = Object.create(BaseElement.prototype)
// Or inherits(Bear, BaseElement)
// Or class Bear extends BaseElement
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
DOMs work best (in the opinion of myself and many) when data goes down
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
// Or class Button extends BaseElement

Button.prototype.render = function (label) {
  var self = this
  // The "label" data is coming down
  return this.super(this.html('button', {
    onclick: function (event) {
      // We send the "clicked" event up
      self.send('clicked', event.target)
    }
  }, label))
}
```

and this is the user's implementation, creates a button and on every click it
changes to a random number:

```js
var button = require('your-button')()
button.on('clicked', function (button) {
  button.render('button label ' + Math.random())
})
```

## install

### npm with browserify, webpack, etc

* `npm install base-element`
* `var BaseElement = require('base-element')`

### standalone

* copy/download/etc [dist/base-element.js](https://github.com/shama/base-element/blob/master/dist/base-element.js)
* `<script src="base-element.js"></script>`
* `<script>var element = new BaseElement()</script>`

## api

### `var element = new BaseElement([attachTo])`
`attachTo` is a DOM element you want to append to. Defaults to `document.body`.

If you pass in `false` then the element will not automatically append itself to
a parent node. This is useful if you plan on handling the rendering of the
virtual tree on your own.

### `element.render(vtree)`
Renders your virtual DOM tree to the DOM element and returns the updated `vtree`.

### `element.send(name[, params])`
Sends an event up with a given `name` and `params`.

### `element.on(name, function)`
Register an event listener for a given name:

```js
element.on('clicked', function (params) {})
```

### `element.super([params])`
This method can be called within any inherited method. It will call the parent's
class of the same name.

```js
Button.prototype.render = function (data) {
  var tree = this.html('button')
  // Calls the render method on BaseElement
  return this.super(vtree)
}
```

### `element.html(tag[, options], value)`
A convenience wrapper for creating virtual-hyperscript nodes, i.e.:

```js
var h = require('virtual-dom/h')
var vtree = h('div', 'Testing')

// is the same as
var vtree = this.html('div', 'Testing')
```

### `element.element`
The root DOM node the virtual tree resides on.

### `element.vtree`
The current virtual DOM tree of the base element.

# license
(c) 2015 Kyle Robinson Young. MIT License
