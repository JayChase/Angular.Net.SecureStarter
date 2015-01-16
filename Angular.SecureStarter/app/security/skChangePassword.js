(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skChangePassword', ['userManagementService', skChangePassword]);
    
    function skChangePassword(userManagementService) {
        
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

                userManagementService.changePassword(data)
                                        .then(
                                            null,
                                            function (result) {
                                                reset();
                                            })
                                        .finally(
                                            function () {
                                                reset();
                                            });
            };

            function reset() {
                scope.password = "";
                scope.newPassword = "";
                scope.newPasswordConfirm = "";
                scope.passwordForm.$setPristine();
                scope.passwordForm.$setUntouched();
            }

        }
    }

})();