(function(angular) {

  var
    dependencies;

  dependencies = [
    'ch.Snackbar.Templates'
  ];

  angular.module('ch.Snackbar', dependencies)
    .constant('POSITIONS', {
      TOP_LEFT: 'TOP_LEFT',
      BOTTOM_RIGHT: 'BOTTOM_RIGHT',
      TOP_RIGHT: 'TOP_RIGHT',
      BOTTOM_LEFT: 'BOTTOM_LEFT'
    })
    .constant('SNACKBAR_EVENT', {
      LOADING: 'LOADING'
    });

})(angular);