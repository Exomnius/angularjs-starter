/**
 * @author Cornel Janssen
 *
 * @ngdoc overview
 * @name angular-starter.core
 *
 * @description
 * This module bootstraps the exception module
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.core', [
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngStorage',
      'ngMessages',
      'blocks.exception',
      'blocks.logger',
      'blocks.router',
      'ui.router',
      'pascalprecht.translate',
      'ngLocale',
      'LocalStorageModule',
      'ui.bootstrap'
    ]);
})();
