(function () {
    'use strict';

    var controllerId = 'welcomeCtrl';

    // TODO: replace app with your module name
    angular.module('app')
        .controller(controllerId, ['$scope', weclomeCtrl]);

    function weclomeCtrl($scope) {
        $scope.title = 'Get started';
        $scope.intro = 'The Angular starter kit is a base Angular project with some added bits to make life a bit easier.';
        $scope.features = [
            "user notifications",
            "error logging",
            "easily configurable app branding",
            "global app busy indicator"
        ];

        activate();

        function activate() { }
    }
})();
