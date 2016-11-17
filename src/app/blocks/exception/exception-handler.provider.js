/**
 * @ngdoc service
 * @name blocks.exception.exceptionHandlerProvider
 * @requires $provide
 *
 * @description
 * Handles the configuration of the custom exception module
 */

// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function () {
  'use strict';

  angular
    .module('blocks.exception')
    .provider('exceptionHandler', exceptionHandlerProvider)
    .config(config);

  function exceptionHandlerProvider() {
    /* jshint validthis:true */
    this.config = {
      appErrorPrefix: undefined
    };

    this.configure = function (appErrorPrefix) {
      this.config.appErrorPrefix = appErrorPrefix;
    };

    this.$get = function () {
      return {config: this.config};
    };
  }

  config.$inject = ['$provide'];

  /**
   * @ngdoc method
   * @name config
   * @methodOf blocks.exception.exceptionHandlerProvider
   * @description
   * Configure by setting an optional string value for appErrorPrefix.
   * Accessible via config.appErrorPrefix (via config value).
   *
   * @param {Object} $provide Injected
   */
  /* @ngInject */
  function config($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];

  /**
   * @ngdoc method
   * @name extendExceptionHandler
   * @methodOf blocks.exception.exceptionHandlerProvider
   * @description
   * Extend the $exceptionHandler service to also display a toast.
   *
   * @param  {Object} $delegate Injected
   * @param  {Object} exceptionHandler Custom exception handler
   * @param  {Object} logger Custom logger
   * @return {Function} the decorated $exceptionHandler service
   */
  function extendExceptionHandler($delegate, exceptionHandler, logger) {
    return function (exception, cause) {
      var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
      var errorData = {exception: exception, cause: cause};
      exception.message = appErrorPrefix + exception.message;
      $delegate(exception, cause);
      /**
       * Could add the error to a service's collection,
       * add errors to $rootScope, log errors to remote web server,
       * or log locally. Or throw hard. It is entirely up to you.
       * throw exception;
       *
       * @example
       *     throw { message: 'error message we added' };
       */
      logger.error(exception.message, errorData);
    };
  }
})();
