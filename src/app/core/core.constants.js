/**
 * @author Cornel Janssen
 *
 * @ngdoc object
 * @name angular-starter.cote.constants
 *
 * @description
 * Defines several constants for the core module
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.core')
    .constant('APP', {
      name: 'Angular Starter',
      logo: '../assets/images/logo.png',
      version: '0.0.0',
      author: 'Cornel Janssen',
      languages: [{
        name: 'LANGUAGES.DUTCH',
        key: 'nl',
        locale: 'be_nl'
      }, {
        name: 'LANGUAGES.ENGLISH',
        key: 'en',
        locale: 'en_gb'
      }]
    })
    .constant('API', {
      url: window.__env.API.url
    });
})();
