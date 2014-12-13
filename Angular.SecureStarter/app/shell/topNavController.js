(function () {
    'use strict';

    var controllerId = 'topNavController';

    // TODO: replace app with your module name
    angular.module('app.shell')
        .controller(controllerId, ['$scope','appSettingsService','navigationService', topNavController]);

    function topNavController($scope, appSettingsService,navigationService) {
        $scope.title = appSettingsService.title;
        $scope.brand = appSettingsService.brand;
        $scope.links = [];

        activate();

        function activate() {
            $scope.links = navigationService.getLinks();
        }
    }
})();
