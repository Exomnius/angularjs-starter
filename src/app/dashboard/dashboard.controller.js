/**
 * @author Cornel Jqnssen
 *
 * @ngdoc controller
 * @name angular-starter.dashboard.DashboardController
 * @requires blocks.logger:logger
 *
 * @description
 * This controller handles the view logic of the dashboard view
 */

(function () {
  'use strict';

  angular
    .module('angular-starter.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['logger'];
  /* @ngInject */
  function DashboardController(logger) {
    var vm = this;

    activate();

    /**
     * @ngdoc method
     * @name activate
     * @methodOf angular-starter.dashboard.DashboardController
     *
     * @description
     * Activates the dashboard view.
     */
    function activate() {
        logger.info('Activated Dashboard View');
    }
  }
})();
