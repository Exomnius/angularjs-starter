/**
 * @ngdoc service
 * @name blocks.logger.logger
 *
 * @description
 * Handles the output of logs in a custom format
 */

(function () {
  'use strict';

  angular
    .module('blocks.logger')
    .factory('logger', loggerFactory);

  loggerFactory.$inject = ['$log'];

  /**
   * @ngdoc method
   * @name logger
   * @methodOf blocks.logger.logger
   *
   * @description
   * Initializes the logger factory
   *
   * @return {object} New logger factory object
   */
  /* @ngInject */
  function loggerFactory($log) {
    var service = {
      error: error,
      info: info,
      success: success,
      warning: warning,

      // straight to console
      log: $log.log
    };

    return service;

    /**
     * @ngdoc method
     * @name error
     * @methodOf blocks.logger.logger
     * @description
     * logs a message with the error prefix
     *
     * @param {String} message The message that will be logged
     * @param {Object} data The error data
     */
    function error(message, data) {
      $log.error('Error: ' + message, data);
    }

    /**
     * @ngdoc method
     * @name info
     * @methodOf blocks.logger.logger
     * @description
     * logs a message with the info prefix
     *
     * @param {String} message The message that will be logged
     * @param {Object} data The error data
     */
    function info(message, data) {
      $log.info('Info: ' + message, data);
    }

    /**
     * @ngdoc method
     * @name success
     * @methodOf blocks.logger.logger
     * @description
     * logs a message with the success prefix
     *
     * @param {String} message The message that will be logged
     * @param {Object} data The error data
     */
    function success(message, data) {
      $log.info('Success: ' + message, data);
    }

    /**
     * @ngdoc method
     * @name warning
     * @methodOf blocks.logger.logger
     * @description
     * logs a message with the warning prefix
     *
     * @param {String} message The message that will be logged
     * @param {Object} data The error data
     */
    function warning(message, data) {
      $log.warn('Warning: ' + message, data);
    }
  }
}());
