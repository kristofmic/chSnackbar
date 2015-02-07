angular.module('ch.Snackbar.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('snackbar.html',
    "<div class=\"snackbar\" role=\"alert\" ng-style=\"styles.wrapper\" ng-class=\"position\"><button type=\"button\" class=\"dismiss\" ng-click=\"dismiss()\"><i ng-if=\"!styles.closeIcon.className\" aria-hidden=\"true\">&times;</i> <i ng-if=\"styles.closeIcon.className\" class=\"{{styles.closeIcon.className}}\"></i> <span class=\"sr-only\">Close</span></button><p class=\"snackbar-message\" ng-style=\"styles.message\">{{message}}</p></div>"
  );

}]);
