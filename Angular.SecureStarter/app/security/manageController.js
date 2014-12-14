(function () {
    'use strict';

    angular.module('app.security')
        .controller('manageController', manageController);

    manageController.$inject = ['userManagementService'];

    function manageController(userManagementService) {
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
