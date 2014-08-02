(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skCreateLocalLogin', ['userManagementSvc', skCreateLocalLogin]);
    
    function skCreateLocalLogin(userManagementSvc) {
        
        var directive = {
            restrict: 'E',
            replace: true,
            controller: controller,
            templateUrl: 'app/security/skCreateLocalLogin.html'
        };

        return directive;

        function controller($scope, userManagementSvc) {                                     
            $scope.newPassword = "";            
            $scope.newPasswordConfirm = "";

            $scope.create = function () {
                var data = {
                    newPassword: $scope.newPassword,
                    confirmPassword: $scope.newPasswordConfirm
                };

                userManagementSvc.addLocalLogin(data)['finally'](function() {
                    $scope.newPassword = "";
                    $scope.newPasswordConfirm = "";
                });
            };            
        };
    }

})();