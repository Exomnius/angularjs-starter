/**
 * @author Cornel Janssen
 *
 * @ngdoc object
 * @name angular-starter.dashboard
 *
 * @description
 * This config configures the routing of the angular-starter.dashboard module
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.dashboard')
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider', '$translatePartialLoaderProvider'];
  /**
   * @ngdoc method
   * @name routerConfig
   * @methodOf angular-starter.dashboard
   *
   * @param {$stateProvider} state provider
   * @param {$translatePartialLoaderProvider} translation partial loader provider
   *
   * @description
   * Configures the states and translations of the angular-starter.dashboard module.
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
   * @methodOf angular-starter.dashboard
   *
   * @returns {Array} List of states
   *
   * @description
   * Returns the states of the angular-starter.dashboard module
   */
  function getStates() {
    return [{
      path: 'app/dashboard',
      state: 'admin-panel.default.dashboard',
      config: {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vmDashboard',
        resolve: {
          access: ['Auth', function(Auth){ return Auth.isAuthenticated(); }]
        }
      }
    }];
  }

})();
