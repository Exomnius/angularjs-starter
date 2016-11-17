/**
 * @author Cornel Janssen
 *
 * @ngdoc overview
 * @name angular-starter
 *
 * @description
 * This module bootstraps the angular-starter module.
 */

(function () {
  'use strict';

  angular
    .module('angular-starter', ['angular-starter.core', 'angular-starter.auth', 'angular-starter.dashboard'])
    .config(configure);

  configure.$inject = [];
  /* @ngInject */
  function configure() {}
})();
