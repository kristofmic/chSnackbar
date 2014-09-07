angular.module('ch.Snackbar.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('snackbar.html',
    "<div class=\"snackbar\" role=\"alert\" ng-style=\"styles.wrapper\" ng-class=\"position\"><div class=\"spinner\" ng-if=\"loading\"><div class=\"bounce1\" ng-style=\"{'background-color':styles.message.color}\"></div><div class=\"bounce2\" ng-style=\"{'background-color':styles.message.color}\"></div><div class=\"bounce3\" ng-style=\"{'background-color':styles.message.color}\"></div></div><p class=\"snackbar-message\" ng-style=\"styles.message\">{{message}}</p></div>"
  );

}]);
