/**
 * @author Cornel Janssen
 *
 * @ngdoc service
 * @name angular-starter.core.LanguageUtilService
 *
 * @requires angular-starter.core.APP
 *
 * @description
 * Handles the languages used in the app
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.core')
    .service('LanguageUtilService', LanguageUtilService);

  LanguageUtilService.$inject = ['$translate', 'APP'];
  /* @ngInject */
  function LanguageUtilService($translate, APP) {

    var service = {
      getLanguage: getLanguage,
      getCurrentLanguage: getCurrentLanguage
    };

    return service;

    /**
     * @ngdoc method
     * @name getLanguage
     * @methodOf angular-starterv.core.LanguageUtilService
     *
     * @param {String} key language key
     *
     * @returns {Object} Language
     */
    function getLanguage(key){
      for(var i = 0; i < APP.languages.length; i++){
        if(APP.languages[i].key === key){
          return APP.languages[i];
        }
      }
    }

    /**
     * @ngdoc method
     * @name getCurrentLanguage
     * @methodOf angular-starter.core.LanguageUtilService
     *
     * @returns {Object} Language
     */
    function getCurrentLanguage(){
      var currentLocale = $translate.use();

      for(var i = 0; i < APP.languages.length; i++){
        if(APP.languages[i].key === currentLocale){
          return APP.languages[i];
        }
      }
    }
  }
})();
