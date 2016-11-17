/**
 * @ngdoc overview
 * @name blocks.router
 * @requires ui.router blocks.logger
 *
 * @description
 * This module bootstraps the router module
 */

(function () {
  'use strict';

  angular.module('blocks.router', [
    'ui.router',
    'blocks.logger'
  ]);
})();
