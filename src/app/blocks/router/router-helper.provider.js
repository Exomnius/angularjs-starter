/**
 * @ngdoc service
 * @name blocks.router.routerHelperProvider
 * @requires $locationProvider
 * @requires $stateProvider
 * @requires $urlRouterProvider
 *
 * @description
 * Handles the configuration of the custom router module
 */

/* Help configure the state-base ui.router */
/* eslint-disable angular/on-watch */
(function () {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routerHelper', routerHelperProvider);

  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  /**
   * @ngdoc method
   * @name routerHelperProvider
   * @methodOf blocks.router.routerHelperProvider
   *
   * @description
   * Bootstraps the routerHelperProvider
   */
  /* @ngInject */
  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    var config = {
      docTitle: undefined,
      resolveAlways: {}
    };

    $locationProvider.html5Mode(true);

    this.configure = function (cfg) {
      angular.extend(config, cfg);
    };

    this.$get = RouterHelper;
    RouterHelper.$inject = ['$location', '$rootScope', '$state', 'loggerFactory'];
    /* @ngInject */
    function RouterHelper($location, $rootScope, $state, loggerFactory) {
      var handlingStateChangeError = false;
      var hasOtherwise = false;
      var stateCounts = {
        errors: 0,
        changes: 0
      };

      var service = {
        configureStates: configureStates,
        getStates: getStates,
        stateCounts: stateCounts
      };

      init();

      return service;

      /**
       * @ngdoc method
       * @name configureStates
       * @methodOf blocks.router.routerHelperProvider
       *
       * @description
       * Configure the states
       *
       * @param {Array} states the application states
       * @param {Object} otherwisePath Path that is used when no state matches
       */
      function configureStates(states, otherwisePath) {
        states.forEach(function (state) {
          state.config.resolve = angular.extend(state.config.resolve || {}, config.resolveAlways);
          $stateProvider.state(state.state, state.config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function handleRoutingErrors() {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, error) {
            if (handlingStateChangeError) {
              return;
            }
            stateCounts.errors++;
            handlingStateChangeError = true;
            var destination = (toState &&
              (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target';
            var msg = 'Error routing to ' + destination + '. ' +
              (error.data || '') + '. <br/>' + (error.statusText || '') +
              ': ' + (error.status || '');
            loggerFactory.warning(msg, [toState]);
            $location.path('/');
          }
        );
      }

      function init() {
        handleRoutingErrors();
        updateDocTitle();
      }

      function getStates() {
        return $state.get();
      }

      function updateDocTitle() {
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState) {
            stateCounts.changes++;
            handlingStateChangeError = false;
            var title = config.docTitle + ' ' + (toState.title || '');
            $rootScope.title = title; // data bind to <title>
          }
        );
      }
    }
  }
})();
