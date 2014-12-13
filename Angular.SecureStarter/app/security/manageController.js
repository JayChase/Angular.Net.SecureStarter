(function () {
    'use strict';

    var controllerId = 'manageController';

    // TODO: replace app with your module name
    angular.module('app.security')
        .controller(controllerId, ['$scope','userManagementService', manageController]);

    function manageController($scope, userManagementService) {        
        $scope.title = 'Manage';
        $scope.loginProviders = userManagementService.loginProviders;
        $scope.userLogins = userManagementService.userLogins;
        $scope.manageInfo = userManagementService.info;
        $scope.addLogin = userManagementService.addLogin;
        $scope.removeLogin = userManagementService.removeLogin;

        activate();

        function activate() {
            userManagementService.load();
        }
        
    }
})();
