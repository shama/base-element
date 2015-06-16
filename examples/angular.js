/*eslint-disable */

// This example uses ./list.js (an element created with base-element)
// in use with an AngularJS directive: https://docs.angularjs.org/guide/directive

var List = require('./list.js')

angular.module('myApp')
  .directive('list', function () {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function ($scope, $element) {
        var list = new List($element[0])
        $scope.$watch('data', function (data) {
          list.render(data)
        })

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
    }
  })
