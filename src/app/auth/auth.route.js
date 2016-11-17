/**
 * @author Cornel Janssen
 *
 * @ngdoc object
 * @name angular-starter.auth
 *
 * @description
 * This config configures the routing of the angular-starter.auth module
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.auth')
    .config(routerConfig)
    .run(checkAuthentication);

  routerConfig.$inject = ['$stateProvider', '$translatePartialLoaderProvider'];
  /**
   * @ngdoc method
   * @name routerConfig
   * @methodOf angular-starter.auth
   *
   * @param {$stateProvider} state provider
   * @param {$translatePartialLoaderProvider} translation partial loader provider
   *
   * @description
   * Configures the states and translations of the angular-starter.reservation module.
   */
  /* @ngInject */
  function routerConfig($stateProvider, $translatePartialLoaderProvider) {
    var states = getStates();
    states.forEach(function (state) {
      $translatePartialLoaderProvider.addPart(state.path, $stateProvider.state(state.state, state.config));
    });
  }

  /**
   * @ngdoc method
   * @name getStates
   * @methodOf angular-starter.auth
   *
   * @returns {Array} List of states
   *
   * @description
   * Returns the states of the angular-starter.auth module
   */
  function getStates() {
    return [{
      path: 'app/auth',
      state: 'public.default.login',
      config: {
        url: '/login',
        templateUrl: 'app/auth/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vmLogin'
      }
    }];
  }

  checkAuthentication.$inject = ['$rootScope', '$state', 'Auth'];
  /**
   * @ngdoc method
   * @name checkAuthentication
   * @methodOf angular-starter.auth
   *
   * @description
   * Check if the user is authenticated after every route change
   */
  /* @ngInject */
  function checkAuthentication($rootScope, $state, AuthFactory) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === AuthFactory.UNAUTHORIZED) {
        $state.go('public.default.login');
      }
    });
  }
})();
