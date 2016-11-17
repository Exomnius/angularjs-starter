/**
 * @author Cornel Janssen
 *
 * @ngdoc directive
 * @name angular-starter.directive:noPropagation
 * @restrict 'A'
 * @element ANY
 *
 * @description
 * This directive prevents the propagation of events when a user clicks on the parent.
 */

(function () {
  'use strict';

  angular
    .module('angular-starter')
    .directive('noPropagation', NoPropagation);

  NoPropagation.$inject = [];
  /* @ngInject */
  function NoPropagation() {

    var directive = {
      restrict: 'A',
      link: link
    };

    function link (scope, element) {
      element.bind('click', function(e) {
        e.stopPropagation();
      }).bind('touchend', function(e) {
        e.stopPropagation();
      });
    }

    return directive;
  }
})();
