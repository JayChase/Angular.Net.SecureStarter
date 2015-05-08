(function () {
    'use strict';

    angular.module('app.security')
        .controller('ManageController', ManageController);

    ManageController.$inject = ['userManagementService'];

    function ManageController(userManagementService) {
        /* jshint validthis:true */
        var vm = this;

        vm.title = 'Manage';
        vm.loginProviders = userManagementService.loginProviders;
        vm.userLogins = userManagementService.userLogins;
        vm.manageInfo = userManagementService.info;
        vm.addLogin = userManagementService.addLogin;
        vm.removeLogin = userManagementService.removeLogin;

        activate();

        function activate() {
            userManagementService.load();
        }
        
    }
})();
