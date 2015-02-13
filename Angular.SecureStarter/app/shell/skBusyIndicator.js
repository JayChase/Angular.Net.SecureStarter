(function() {
    'use strict';

    angular.module('app.shell')
        .directive('skBusyIndicator', [skBusyIndicator]);
    
    function skBusyIndicator () {        
        var directive = {
            controller: ['$rootScope', '$scope', controller],
            restrict: 'E',
            replace: true,
            templateUrl: 'app/shell/skBusyIndicator.html'

        };

        return directive;

        function controller($rootScope, $scope) {
            $scope.isBusy = false;

            $rootScope.$on("appActivitySvc:isBusyChanged", function (event, args) {
                $scope.isBusy = args.busy;
            });
        }
    }

})();