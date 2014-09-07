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
      request: request,
      response: response
    };

    function request(config) {
      $rootScope.$broadcast(SNACKBAR_EVENT.LOADING);
      return config;
    }

    function response(res) {
      $rootScope.$broadcast(SNACKBAR_EVENT.COMPLETE);
      return res;
    }
  }
})(angular);