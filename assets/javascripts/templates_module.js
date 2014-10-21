angular.module('ch.Snackbar.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('snackbar.html',
    "<div class=\"snackbar\" role=\"alert\" ng-style=\"styles.wrapper\" ng-class=\"position\"><button type=\"button\" class=\"dismiss\" ng-click=\"dismiss()\"><span aria-hidden=\"true\">&times;</span> <span class=\"sr-only\">Close</span></button><p class=\"snackbar-message\" ng-style=\"styles.message\">{{message}}</p></div>"
  );

}]);
