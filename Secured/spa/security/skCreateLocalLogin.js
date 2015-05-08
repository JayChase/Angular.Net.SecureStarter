(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skCreateLocalLogin', ['userManagementService', 'baseUrl', skCreateLocalLogin]);
    
    function skCreateLocalLogin(userManagementService, baseUrl) {
        
        var directive = {
            restrict: 'E',
            replace: true,
            controller: ['$scope', 'userManagementService', controller],
            templateUrl: baseUrl + 'security/skCreateLocalLogin.html'
        };

        return directive;

        function controller($scope, userManagementService) {                                     
            $scope.newPassword = "";            
            $scope.newPasswordConfirm = "";

            $scope.create = function () {
                var data = {
                    newPassword: $scope.newPassword,
                    confirmPassword: $scope.newPasswordConfirm
                };

                userManagementService.addLocalLogin(data)
                                        .finally(function () {
                                                    $scope.newPassword = "";
                                                    $scope.newPasswordConfirm = "";
                                                });
            };            
        };
    }

})();