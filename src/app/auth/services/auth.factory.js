/**
 * @author Cornel Janssen
 *
 * @ngdoc service
 * @name angular-starter.auth.AuthService
 * @requires $rootScope
 * @requires $q
 * @requires $http
 * @requires $sessionStorage
 * @requires $location
 * @requires angular-starter.auth.UserService
 *
 * @description
 * Retrieves the server-side configuration for the front-end app
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.auth')
    .factory('Auth', AuthFactory);

  AuthFactory.$inject = ['$rootScope', '$q', 'logger', '$sessionStorage', '$location', 'UserDataService'];
  /* @ngInject */
  function AuthFactory($rootScope, $q, logger, $sessionStorage, $location, UserDataService) {

    var factory = {
      OK: 200,
      UNAUTHORIZED: 401,

      login: login,
      logout: logout,
      getToken: getToken,
      setToken: setToken,
      isAuthenticated: isAuthenticated
    };

    return factory;

    /**
     * @ngdoc method
     * @name performLogin
     * @methodOf angular-starter.auth.AuthService
     *
     * @returns {Object} promise
     */
    function login(username,password) {
      return UserDataService.getUser(username, password).then(function(user){
        logger.success('Logged in', user);

        setToken(user.code, user.name);
        $rootScope.user = user;
      });
    }

    /**
     * @ngdoc method
     * @name isAuthenticated
     * @methodOf angular-starter.auth.AuthService
     *
     * @returns {Object} promise
     */
    function isAuthenticated(){
      var token = getToken();
      var deferred = $q.defer();

      //todo: check if user is already logged in
      /*if(angular.isDefined(token) && token != null && angular.isDefined(token.user)){
        //if user is not logged in, perform check if token is present and try to login with token
        login(token.sapId).then(function(){
          deferred.resolve(factory.OK);
        });
      }else{
        deferred.reject(factory.UNAUTHORIZED);
      }*/
      deferred.resolve(factory.OK);

      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name logout
     * @methodOf angular-starter.auth.AuthService
     *
     * @returns {Object} promise
     */
    function logout() {
      clearToken();

      $location.path('/login');
    }

    /**
     * @ngdoc method
     * @name setToken
     * @methodOf angular-starter.auth.AuthService
     *
     * @param {String} code Unique identifier for the user
     * @param {String} username The username of the user
     */
    function setToken(code, username) {
      var token = {
        code: code,
        username: username
      };

      $sessionStorage.token = token;
    }

    /**
     * @ngdoc method
     * @name getToken
     * @methodOf angular-starter.auth.AuthService
     *
     * @returns {Object} token
     */
    function getToken() {
      return  $sessionStorage.token;
    }

    /**
     * @ngdoc method
     * @name clearToken
     * @methodOf angular-starter.auth.AuthService
     */
    function clearToken(){
      $sessionStorage.token = null;
    }
  }
})();
