(function () {
    'use strict';

    angular.module('app.shell')
            .controller('topNavController', topNavController);

    topNavController.$inject = ['appSettingsService', 'navigationService'];

    function topNavController(appSettingsService, navigationService) {
        /* jshint validthis:true */
        var vm = this;

        vm.title = appSettingsService.title;
        vm.brand = appSettingsService.brand;
        vm.links = [];

        activate();

        function activate() {
            vm.links = navigationService.getLinks();
        }
    }
})();
