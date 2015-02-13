(function() {
    'use strict';

    angular.module('app.security')
        .directive('skChangePassword', ['userManagementSvc', skChangePassword]);
    
    function skChangePassword(userManagementSvc) {
        
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: 'app/security/skChangePassword.html'
        };

        return directive;

        function link(scope, element, attrs) {
            scope.password = "";
            scope.newPassword = "";
            scope.newPasswordConfirm = "";
            scope.change = function () {
                var data = {
                    oldPassword: scope.password,
                    newPassword: scope.newPassword,
                    confirmPassword: scope.newPasswordConfirm
                };

                userManagementSvc.changePassword(data)['finally'](function() {
                    scope.password = "";
                    scope.newPassword = "";
                    scope.newPasswordConfirm = "";
                });
            };
        }
    }

})();