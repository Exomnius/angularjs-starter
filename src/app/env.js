/**
 * @author Cornel Janssen
 *
 * @description
 * Defines configuration for the development environment
 */
(function (window) {
  var env = {
    API: {
      url: 'http://url.to.api/'
    }
  };

  window.__env = window.__env || {};

  window.__env = env;
}(this));
