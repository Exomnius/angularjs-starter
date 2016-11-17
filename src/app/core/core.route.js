/**
 * @author Cornel Janssen
 *
 * @ngdoc object
 * @name angular-starter.core
 *
 * @description
 * This config configures the routing of the angular-starter.core module
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.core')
    .config(configureStates);

  configureStates.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$translatePartialLoaderProvider'];
  /**
   * @ngdoc method
   * @name configureStates
   * @methodOf angular-starter.core
   *
   * @param {$stateProvider} state provider
   * @param {$locationProvider} location provider
   * @param {$urlRouterProvider} url route provider
   *
   * @description
   * Configures the different states of the angular-starter.core module
   */
  /* @ngInject */
  function configureStates($stateProvider, $locationProvider, $urlRouterProvider, $translatePartialLoaderProvider) {
    var templates = getTemplates();
    var statusPages = getStatusPages();

    //load templates
    templates.forEach(function (template) {
      $stateProvider.state(template.state, template.config);
    });

    //load status pages
    statusPages.forEach(function (statusPage) {
      $translatePartialLoaderProvider.addPart(statusPage.path, $stateProvider.state(statusPage.state, statusPage.config));
    });

    /**
     * Setup default routes
     */
    $urlRouterProvider.when('', '/login');
    $urlRouterProvider.when('/', '/login');
    //404 if route not found
    $urlRouterProvider.otherwise('/404');

    /**
     * Enable HTML5 mode
     */
    $locationProvider.html5Mode(true);
  }

  /**
   * @ngdoc method
   * @name getTemplates
   * @methodOf angular-starter.core
   *
   * @returns {Array} List of the layout templates
   *
   * @description
   * Returns the layout templates of the angular-starter project
   */
  function getTemplates() {
    return [
      {
        state: 'admin-panel',
        config: {
          abstract: true,
          templateUrl: 'app/layouts/admin-panel/admin-panel.html'
        }
      }, {
        state: 'admin-panel.default',
        config: {
          abstract: true,
          views: {
            header: {
              templateUrl: 'app/components/header/header.html',
              controller: 'HeaderController',
              controllerAs: 'vmHeader'
            },
            content: {
              template: '<div id="admin-panel-content-view" ui-view></div>'
            }
          }
        }
      }, {
        state: 'public',
        config: {
          abstract: true,
          templateUrl: 'app/layouts/public/public.html'
        }
      }, {
        state: 'public.default',
        config: {
          abstract: true,
          views: {
            content: {
              template: '<div id="public-content-view" ui-view></div>'
            }
          }
        }
      }
    ];
  }

  /**
   * @ngdoc method
   * @name getStatusPages
   * @methodOf angular-starter.core
   *
   * @returns {Array} List of status pages (404, 500, ...)
   *
   * @description
   * Returns the status pages of the angular-starter project
   */
  function getStatusPages() {
    return [{
      path: 'app/core',
      state: 'public.default.404',
      config: {
        url: '/404',
        templateUrl: 'app/core/404.html',
        controller: function () {
        }
      }
    }, {
      path: 'app/core',
      state: 'public.default.500',
      config: {
        url: '/500',
        templateUrl: 'app/core/500.html',
        controller: function () {
        }
      }
    }];
  }
})();
