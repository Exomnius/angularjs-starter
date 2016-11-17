/**
 * @author Cornel Janssen
 *
 * @ngdoc controller
 * @name angular-starter.PublicController
 * @requires blocks.logger:logger
 * @requires angular-starter.core:APP
 *
 * @description
 * This controller handles the layout view logic of the public layout template
 */

(function () {
  'use strict';

  angular
    .module('angular-starter')
    .controller('PublicController', PublicController);

  PublicController.$inject = ['logger', 'APP'];
  /* @ngInject */
  function PublicController(logger, APP) {
    var vm = this;

    vm.APP = APP;

    activate();

    function activate() {
      logger.log('PublicLayout Loaded!');
    }
  }
})();


