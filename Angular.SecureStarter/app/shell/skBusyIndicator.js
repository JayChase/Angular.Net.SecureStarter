﻿(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app')
        .directive('skBusyIndicator', [skBusyIndicator]);
    
    function skBusyIndicator () {        
        var directive = {
            controller: controller,
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