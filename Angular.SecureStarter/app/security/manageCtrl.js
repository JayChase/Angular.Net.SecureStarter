(function () {
    'use strict';

    var controllerId = 'manageCtrl';
    
    angular.module('app.security')
        .controller(controllerId, ['$scope','userManagementSvc', manageCtrl]);

    function manageCtrl($scope, userManagementSvc) {        
        $scope.title = 'Manage';
        $scope.loginProviders = userManagementSvc.loginProviders;
        $scope.userLogins = userManagementSvc.userLogins;
        $scope.manageInfo = userManagementSvc.info;
        $scope.addLogin = userManagementSvc.addLogin;
        $scope.removeLogin = userManagementSvc.removeLogin;

        activate();

        function activate() {
            userManagementSvc.load();
        }
        
    }
})();
