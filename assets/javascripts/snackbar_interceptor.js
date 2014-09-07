(function(angular) {

  var
    definitions;

  definitions = [
    '$rootScope',
    'SNACKBAR_EVENT',
    snackbarInterceptor
  ];

  angular.module('ch.Snackbar')
    .factory('snackbarInterceptor', definitions);

  function snackbarInterceptor($rootScope, SNACKBAR_EVENT) {
    return {
      request: request
    };

    function request(config) {
      $rootScope.$broadcast(SNACKBAR_EVENT.LOADING);
      return config;
    }
  }
})(angular);