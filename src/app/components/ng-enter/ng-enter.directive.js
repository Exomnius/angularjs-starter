/**
 * @author Cornel Janssen
 *
 * @ngdoc directive
 * @name angular-starter.directive:autoFocus
 * @restrict 'A'
 * @element ANY
 * @requires $timeout
 *
 * @description
 * This directive focuses the cursor on the element
 */

(function () {
  'use strict';

  angular
    .module('angular-starter')
    .directive('ngEnter', NgEnter);

  NgEnter.$inject = [];
  /* @ngInject */
  function NgEnter() {

    var directive = {
      restrict: 'A',
      link: link,
      scope: {
        expr: '&ngEnter'
      }
    };

    function link (scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
            scope.$eval(scope.expr);
          });
          event.preventDefault();
        }
      });
    }

    return directive;
  }
})();
