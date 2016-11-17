/**
 * @author Cornel Janssen
 *
 * @ngdoc controller
 * @name angular-starter.auth.LoginController
 * @requires $q
 * @requires $translate
 * @requires blocks.logger:logger
 * @requires $location
 * @requires angular-starter.auth.Auth
 * @requires angular-starter.core.APP
 *
 * @description
 * This controller handles the view logic of the login view
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.auth')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$q', '$translate', 'logger', '$location', 'Auth', 'APP'];
  /* @ngInject */
  function LoginController($q, $translate, logger, $location, AuthFactory, APP) {
    var vm = this;

    vm.error = false;

    activate();

    /**
     * @ngdoc method
     * @name activate
     * @methodOf angular-starter.auth.LoginController
     *
     * @description
     * Activates the login view.
     */
    function activate() {
      var promises = [];

      return $q.all(promises).then(function() {
        //check if sapId is present as query parameter
        var queryParams = $location.search();

        if(angular.isDefined(queryParams.lang)){
          for(var i=0;i<APP.languages.length;i++){
            if(APP.languages[i].key === queryParams.lang){
              $translate.use(APP.languages[i].key);
              delete queryParams.lang;
            }
          }
        }

        //check if user is already logged in
        AuthFactory.isAuthenticated().then(function(status){
          if(status === AuthFactory.OK){
            $location.path('/dashboard');
          }
        });

        logger.info('Activated Login View');
      });
    }

    /**
     * @ngdoc method
     * @name attemptLogin
     * @methodOf angular-starter.auth.LoginController
     *
     * @description
     * Attempt to login with the entered credentials. If valid, redirect to the dashboard, else show error message.
     */
    vm.attemptLogin = function(isValid){
      vm.error = false;
      AuthFactory.login(vm.username, vm.password).then(login, showErrors);
    };

    /**
     * @name login
     * @description
     * Redirect to the dashboard
     */
    function login(){
      $location.path('/dashboard');
    }

    /**
     * @name showErrors
     * @description
     * Display error message
     *
     * @param {String} error The error message
     * @param {Number} status The http status
       */
    function showErrors(error, status){
      vm.error = true;
    }
  }
})();

