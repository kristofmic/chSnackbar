
// assets/javascripts/templates_module.js
angular.module('ch.Snackbar.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('snackbar.html',
    "<div class=\"snackbar\" role=\"alert\" ng-style=\"styles.wrapper\" ng-class=\"position\"><p class=\"snackbar-message\" ng-style=\"styles.message\">{{message}}</p></div>"
  );

}]);


// assets/javascripts/snackbar_module.js
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
    });

})(angular);

// assets/javascripts/snackbar.js
(function(angular) {

  angular.module('ch.Snackbar')
    .provider('snackbar', snackbarProvider);

  function snackbarProvider() {
    var
      colors,
      definitions;

    colors = {
      success: '#5cb85c',
      error: '#d9534f',
      notice: '#333'
    };

    definitions = [
      '$document',
      '$rootScope',
      '$templateCache',
      '$compile',
      '$timeout',
      '$animate',
      'POSITIONS',
      snackbarFactory
    ];

    return {
      setColors: setColors,
      $get: snackbarFactory
    };

    function setColors(config) {
      colors.success = config.success || colors.success;
      colors.error = config.error || colors.error;
      colors.notice = config.notice || colors.notice;
    }

    function snackbarFactory($document, $rootScope, $templateCache, $compile, $timeout, $animate, POSITIONS) {
      var
        templateUrl = 'snackbar.html',
        template = $templateCache.get(templateUrl),
        scope = $rootScope.$new(),
        body = $document.find('body'),
        POP_UP = 'snackbar-pop-up',
        POP_OUT = 'snackbar-pop-out',
        POP_OUT_TIMEOUT = 4000,
        REMOVE_TIMEOUT = 4200,
        POSITION_CLASSES,
        stack = [];

      POSITION_CLASSES = {
        TOP_LEFT: 'snackbar-top-left',
        BOTTOM_RIGHT: 'snackbar-bottom-right',
        TOP_RIGHT: 'snackbar-top-right',
        BOTTOM_LEFT: 'snackbar-bottom-left'
      };

      return {
        success: success,
        error: error,
        notice: notice
      };

      function success(message, pos) {
        var
          successConfig;

        successConfig = {
          'background-color': colors.success
        };

        notice(message, pos, successConfig);
      }

      function error(message, pos) {
        var
          errorConfig;

        errorConfig = {
          'background-color': colors.error
        };

        notice(message, pos, errorConfig);
      }

      function notice(message, pos, config) {
        var
          snackbar,
          styles,
          position;

        config = config || {};

        if (message) {
          styles = getStyles();
          position = getPosition();

          scope.message = message;
          scope.styles = styles;
          scope.position = position;

          snackbar = $compile(template)(scope);

          if (stack.length) {
            for(var i = 0, len = stack.length; i < len; i++) {
              clearSnackbar(stack[i], i);
            }
          }

          insertSnackbar();
          snackbar.timeout = {
            pop_out: $timeout(snackbarPopOut, POP_OUT_TIMEOUT),
            remove: $timeout(removeSnackbar, REMOVE_TIMEOUT)
          };
        }

        function insertSnackbar() {
          $animate.enter(snackbar, body, null, snackbarPopIn);
          stack.push(snackbar);
        }

        function removeSnackbar() {
          $animate.leave(snackbar);
          stack.shift();
        }

        function snackbarPopIn() {
          $timeout(function snackbarPopInTimeout() {
            snackbar.addClass(POP_UP);
          }, 0);
        }

        function snackbarPopOut() {
          snackbar
            .addClass(POP_OUT)
            .removeClass(POP_UP);
        }

        function clearSnackbar(item, index) {
          $timeout.cancel(item.timeout.pop_out);
          $timeout.cancel(item.timeout.remove);
          $animate.leave(item);
          stack.splice(index, 1);
        }

        function getStyles() {
          return {
            wrapper: {
              'background-color': config['background-color'] || colors.notice,
            },
            message: {
              'color': config.color || '#FFF'
            }
          };
        }

        function getPosition() {
          var
            position = POSITIONS[pos];

          return position ? POSITION_CLASSES[position] : POSITION_CLASSES.BOTTOM_LEFT;
        }
      }
    }
  }



})(angular);