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
    .directive('autoFocus', AutoFocus);

  AutoFocus.$inject = ['$timeout'];
  /* @ngInject */
  function AutoFocus($timeout) {

    var directive = {
      restrict: 'A',
      link: link
    };

    function link (scope, element) {
      $timeout(function() {
        element[0].focus();
      });
    }

    return directive;
  }
})();
