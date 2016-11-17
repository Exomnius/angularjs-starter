/**
 * @ngdoc service
 * @name blocks.exception.exceptionFactory
 * @requires $q
 * @requires blocks.logger:loggerFactory
 *
 * @description
 * This factory provides a small wrapper for the exceptions with a better format
 */

(function () {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exceptionFactory', exceptionFactory);

  exceptionFactory.$inject = ['$q', 'loggerFactory'];

  /* @ngInject */
  function exceptionFactory($q, loggerFactory) {
    var service = {
      catcher: catcher
    };
    return service;

    /**
     * @ngdoc method
     * @name catcher
     * @methodOf blocks.exception.exceptionFactory
     * @description
     * Wraps the exception and logs it
     *
     * @param {String} message The error message
     * @returns {Promise} deferred promise
     */
    function catcher(message) {
      return function (e) {
        var thrownDescription;
        var newMessage;
        if (e.data && e.data.description) {
          thrownDescription = '\n' + e.data.description;
          newMessage = message + thrownDescription;
        }
        e.data.description = newMessage;
        loggerFactory.error(newMessage);
        return $q.reject(e);
      };
    }
  }
})();
