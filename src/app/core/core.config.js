/**
 * @author Cornel Janssen
 *
 * @ngdoc object
 * @name angular-starter.core.config
 * @requires $logProvider
 * @requires routerHelperProvider
 * @requires exceptionHandlerProvider
 * @requires $translateProvider
 * @requires $translatePartialLoaderProvider
 * @requires localStorageServiceProvider
 * @requires $httpProvider
 * @requires $animateProvider
 * @requires APP
 *
 * @description
 * This config provides general configuration for the angular-starter.core module
 */

(function () {
  'use strict';

  var config = {
    appErrorPrefix: '[AngularStarter Error] ',
    appTitle: 'Angular Starter'
  };

  angular.module('angular-starter.core')
    .value('config', config)
    .config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', '$translateProvider', '$translatePartialLoaderProvider', 'localStorageServiceProvider', '$httpProvider', '$animateProvider', 'APP']; // jscs:ignore maximumLineLength,
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, $translateProvider, $translatePartialLoaderProvider, localStorageServiceProvider, $httpProvider, $animateProvider, APP) { // jscs:ignore maximumLineLength,
    /**
     * Setup logging
     */
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({docTitle: config.appTitle + ': '});

    /**
     * Setup translations
     */
      //load translations from each module
    $translateProvider.useLoader('$translatePartialLoader', {urlTemplate: '{part}/il8n/{lang}.json'});
    $translatePartialLoaderProvider.addPart('app');
    //sanitize values
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    //cache translations files
    $translateProvider.useLoaderCache(true);
    //use languages from APP constant
    var languageKeys = [];

    for(var i = 0; i < APP.languages; i++){
      languageKeys.push(APP.languages[i].key);
    }
    //try to detect the user language
    $translateProvider.registerAvailableLanguageKeys(languageKeys).use('nl');
    //store the users language in a cookie
    $translateProvider.useLocalStorage();

    /**
     * Setup local storage
     */
      //add prefix
    localStorageServiceProvider.setPrefix('angular-starter').setStorageType('sessionStorage');

    /**
     * Setup interceptors
     */
    $httpProvider.interceptors.push('LanguageInterceptor');

    /**
     * Disable angular-animate for font awesome spinners
     */
    $animateProvider.classNameFilter(/^((?!(fa-spin|fa-pulse)).)*$/);
  }

})();
