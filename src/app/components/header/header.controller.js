/**
 * @author Cornel Janssen
 *
 * @ngdoc controller
 * @name angular-starter.HeaderController
 * @requires $translate
 * @requires angular-starter.auth.Auth
 * @requires APP
 *
 * @description
 * This controller contains the logic for displaying the header
 */

(function () {
  'use strict';

  angular
    .module('angular-starter')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$translate', 'Auth', 'APP'];
  /* @ngInject */
  function HeaderController($translate, AuthFactory, APP) {
    var vm = this;

    activate();

    function activate() {
      vm.currentLanguage = $translate.use();
      vm.languages = APP.languages;
    }

    /**
     * @ngdoc method
     * @name changeLanguage
     * @methodOf angular-starter.HeaderController
     *
     * @description
     * Changes the language of the user
     */
    vm.changeLanguage = function(language){
      $translate.use(language);

      vm.currentLanguage = language;
    };

    /**
     * @ngdoc method
     * @name logout
     * @methodOf angular-starter.HeaderController
     *
     * @description
     * Logs the user out
     */
    vm.logout = function(){
      AuthFactory.logout();
    };
  }
})();

