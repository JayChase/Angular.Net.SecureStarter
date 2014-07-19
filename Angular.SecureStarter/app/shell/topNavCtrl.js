(function () {
    'use strict';

    var controllerId = 'topNavCtrl';

    // TODO: replace app with your module name
    angular.module('app.shell')
        .controller(controllerId, ['$scope','appSettingsSvc','navigationSvc', topNavCtrl]);

    function topNavCtrl($scope, appSettingsSvc,navigationSvc) {
        $scope.title = appSettingsSvc.title;
        $scope.brand = appSettingsSvc.brand;
        $scope.links = [];

        activate();

        function activate() {
            $scope.links = navigationSvc.getLinks();
        }
    }
})();
