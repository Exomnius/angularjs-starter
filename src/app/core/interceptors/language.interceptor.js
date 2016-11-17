/**
 * @author Cornel Janssen
 *
 * @ngdoc interceptor
 * @name angular-starter.core.LanguageInterceptor
 * @requires $injector
 * @requires $translate
 * @requires angular-starter.core.APP
 *
 * @description
 * Adds the correct Accept Language to the http requests
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.core')
    .factory('LanguageInterceptor', LanguageInterceptor);

  LanguageInterceptor.$inject = ['$injector', 'APP'];
  /* @ngInject */
  function LanguageInterceptor($injector, APP) {
    var interceptor = {
      request: request
    };

    return interceptor;

    /**
     * @ngdoc method
     * @name request
     * @methodOf angular-starter.core.LanguageInterceptor
     *
     * @description
     * Adds a language header to every request
     *
     * @param {Object} config The request config
     */
    function request(config){
      var language = $injector.get('$translate').use(); //prevent circular dependencies
      config.headers = config.headers || {};

      for(var i = 0; i < APP.languages; i++){
        if(language === APP.languages[i].key){
          config.headers['Accept-Language'] = APP.languages[i].locale;
          break;
        }
      }

      return config;
    }
  }
})();
