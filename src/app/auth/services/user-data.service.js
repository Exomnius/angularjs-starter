/**
 * @author Cornel Janssen
 *
 * @ngdoc service
 * @name angular-starter.auth.UserDataService
 * @requires $q
 * @requires $http
 * @requires blocks.logger.logger
 * @requires angular-starter.core.API
 *
 * @description
 * Retrieves the server-side configuration for the front-end app
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.auth')
    .factory('UserDataService', UserDataService);

  UserDataService.$inject = ['$q', '$http', 'logger', 'API'];
  /* @ngInject */
  function UserDataService($q, $http, logger, API) {
    var service = {
      getUser: getUser
    };

    return service;

    function getBaseUrl() {
      return API.url + 'user/';
    }

    /**
     * @ngdoc method
     * @name getUser
     * @methodOf angular-starter.auth.UserDataService
     *
     * @returns {Object} promise
     */
    function getUser(username, password) {
      //todo: fix for implementation
      /*var request = {
        method: 'GET',
        url: getBaseUrl() + '?username=' + username + '&password' + password
      };

      return $http(request).then(onSuccess, onError);*/
      return $q.when({
        code: 'CODE',
        username: username
      });
    }

    function onSuccess(response){
      return $q.when(response.data);
    }

    function onError(response){
      logger.error(response);
      return $q.reject(response);
    }
  }
})();
