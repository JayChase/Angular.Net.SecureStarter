(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.shell')
        .directive('skBusyIndicator', ['baseUrl', skBusyIndicator]);
    
    function skBusyIndicator(baseUrl) {
        var directive = {
            controller: ['$rootScope', '$scope', controller],
            restrict: 'E',
            replace: true,
            templateUrl: baseUrl + 'shell/skBusyIndicator.html'

        };

        return directive;

        function controller($rootScope, $scope) {
            $scope.isBusy = false;

            $rootScope.$on("appActivityService:isBusyChanged", function (event, args) {
                $scope.isBusy = args.busy;
            });
        }
    }

})();