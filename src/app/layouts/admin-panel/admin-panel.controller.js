/**
 * @author Cornel Janssen
 *
 * @ngdoc controller
 * @name angular-starter.controller:AdminPanelController
 * @requires blocks.logger:logger
 * @requires angular-starter.core:APP
 *
 * @description
 * This controller handles the layout view logic of the admin layout template
 */

(function () {
  'use strict';

  angular
    .module('angular-starter')
    .controller('AdminPanelController', AdminPanelController);

  AdminPanelController.$inject = ['logger', 'APP'];
  /* @ngInject */
  function AdminPanelController(logger, APP) {
    var vm = this;

    vm.APP = APP;
    activate();

    function activate() {
      logger.log('AdminLayout Loaded!');
    }
  }
})();


