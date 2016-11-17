/**
 * @author Cornel Janssen
 *
 * @ngdoc directive
 * @name angular-starter.directive:adminPanelContent
 * @restrict 'A'
 * @element DIV
 * @scope
 * @requires $compile
 * @requires $templateRequest
 * @requires blocks.logger:logger
 *
 * @description
 * This directive makes sure that, on every state change, the screen scrolls to the top. It also adds the footer template to the bottom of the layout template.
 */

(function () {
  'use strict';

  angular
    .module('angular-starter')
    .directive('adminPanelContent', AdminPanelContent);

  AdminPanelContent.$inject = ['$compile', '$templateRequest', 'logger'];
  /* @ngInject */
  function AdminPanelContent($compile, $templateRequest, logger) {

    var directive = {
      link: link,
      restrict: 'A'
    };

    return directive;

    function link(scope, element) {
      /**
       * Scrolls to the top of the page when new content is loaded
       */
      scope.$on('$stateChangeStart', function () {
        var mdContentElement = element.parent();
        mdContentElement.scrollTop(0);
      });
      /**
       * Add footer to the end of the content page
       */
      scope.$on('$viewContentLoaded', function () {
        var contentView = element.find('#admin-panel-content-view');
        $templateRequest('app/components/footer/footer.html').then(function (template) {
          var linkFn = $compile(template);
          var content = linkFn(scope);
          contentView.append(content);
        }, function () {
          logger.error('Could not load footer template');
        });
      });
    }
  }
})();
