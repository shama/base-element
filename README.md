# base-element
An element authoring library for creating standalone and performant elements.

[![build status](https://secure.travis-ci.org/shama/base-element.svg)](https://travis-ci.org/shama/base-element)
[![NPM version](https://badge.fury.io/js/base-element.svg)](https://badge.fury.io/js/base-element)
[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/shama.svg)](https://saucelabs.com/u/shama)

View [this example List element](https://github.com/shama/base-element/blob/master/examples/list.js) in use with:
* [React](https://github.com/shama/base-element/blob/master/examples/react.js)
* [Ember](https://github.com/shama/base-element/blob/master/examples/ember.js)
* [Web Component](https://github.com/shama/base-element/blob/master/examples/webcomponent.js)
* [virtual-dom](https://github.com/shama/base-element/blob/master/examples/virtual-dom.js)
* [or just standalone](https://github.com/shama/base-element/blob/master/examples/standalone.js)

Or other examples:
* [with ES6](https://github.com/shama/base-element/blob/master/examples/es6.js)
* [nested architecture](https://github.com/shama/base-element/blob/master/examples/nesting.js)
* [server side rendering](https://github.com/shama/base-element/blob/master/examples/server-side.js)

## example usage
You can construct your element API however you choose. A way that I prefer is
by inheriting prototypes:

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
  // Call afterRender with your vtree when returning your vtree
  return this.afterRender(vtree)
}
```

### Prefer just functions?
If you prefer just functions, an alternative interface is available:

```js
var createElement = require('base-element')

// Create an element on a parent
var el = createElement(document.body)
el.render(function () {
  // Render a button upon clicked will alert
  return el.html('button', {
    onclick: function (e) {
      window.alert(e.target.innerText + ' button was clicked')
    }
  }, 'click me')
})
```

### data down, events up
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
  var vtree = this.html('button', {
    onclick: function (event) {
      // We send the "clicked" event up
      self.send('clicked', event.target)
    }
  }, label)
  return this.afterRender(vtree)
}
```

and this is the user's implementation, creates a button and on every click it
changes to a random number:

```js
var button = require('your-button')()
button.addEventListener('clicked', function (node) {
  button.render('button label ' + Math.random())
})
```

### nested architecture
Elements created using `base-element` are intended on being shared and extended
by others. Each element should not require an additional library/framework to
run it or be injected into it in order to be ran. Elements should be standalone.

For example if you create an `input-box` element and published on npm:

```js
var BaseElement = require('base-element')
function InputBox (el) {
  BaseElement.call(this, el)
}
InputBox.prototype = Object.create(BaseElement.prototype)
module.exports = InputBox

InputBox.prototype.render = function (value) {
  // Builds an <input value="{value}: />
  return this.afterRender(this.html('input', {
    onkeyup: function(e) {
      // When keys are typed in it we send the value up
      this.send('changed', e.target.value)
    }.bind(this),
    value: value || ''
  }))
}
```

Later yourself or another user can extend `input-box` to add functionality on
top, such as `email-input`:

```js
var InputBox = require('input-box')
function EmailInput (el) {
  InputBox.call(this, el)

  // When we receive a "changed" event from InputBox, handle it here
  this.addEventListener('changed', function (text) {
    /* Perform some email validation on text here,
       then render() if we need an update */
  })
}
EmailInput.prototype = Object.create(InputBox.prototype)
module.exports = EmailInput

EmailInput.prototype.render = function (data) {
  data = data || {}
  var vtree = this.html('div', [
    // Put a <label>Enter your email</label> inside this <div>
    this.html('label', data.label || 'Enter your email'),
    // Call the InputBox's render
    InputBox.prototype.render(data.value)
  ])
  // Return the virtual DOM tree
  return this.afterRender(vtree)
}
```

Both `input-box` and `email-input` can be ran on their own. When `input-box`
updates over time, `email-input` can stay on a previous version until an upgrade
can be made.

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
`attachTo` is a DOM element you want to append to such as `document.body`

By default, the element will not attach itself to a parent node. This is useful
for handling the rendering on your own.

### `element.send(name[, params...])`
Sends an event up with a given `name` and `params`.

### `element.addEventListener(name, function)`
Register an event listener for a given name:

```js
element.addEventListener('clicked', function (params) {})
```

### `element.afterRender([params...])`
This method needs to be called when returning a constructed virtual tree. It
will detect if we are at the top of the render tree and perform the DOM diff
and patching.

```js
Button.prototype.render = function (data) {
  var vtree = this.html('button')
  return this.afterRender(vtree)
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

### `element.toString([data...])`
For rendering your element as a string of HTML. `data` is any initial data
passed to your `render` function.

### `element.element`
The root DOM node the virtual tree resides on.

### `element.vtree`
The current virtual DOM tree of the base element.

### default events
`load` and `unload` events will be sent by default if your top level element
registers `this` as it's properties:

```js
var BaseElement = require('base-element')
function Button(el) {
  BaseElement.call(this, el)
  this.addEventListener('load', function (node) {
    console.log(node + ' has loaded!')
  })
  this.addEventListener('unload', function (node) {
    console.log(node + ' has unloaded!')
  })
}
Button.prototype.render = function (data) {
  // The top level element is provided with `this`, events will be fired
  return this.afterRender(this.html('button', this, 'click me'))
}
```

# license
(c) 2015 Kyle Robinson Young. MIT License
