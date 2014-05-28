(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app')
        .directive('skUserInfo', [skBusyIndicator]);
    
    function skBusyIndicator () {        
        var directive = {
            controller: controller,
            restrict: 'E',
            replace: true,
            templateUrl: 'app/shell/skUserInfo.html'

        };

        return directive;

        function controller($rootScope, $scope, userSvc, accountClientSvc) {
            $scope.username = "";
            $scope.signedIn = false;
            $scope.signOut = signOut;

            $rootScope.$on("userSvc:signedInChanged", function (event, args) {
                $scope.signedIn = args.signedIn;
                $scope.username = userSvc.username;                
            });

            function signOut() {
                accountClientSvc.logout();                
                userSvc.clear();
            }
        }
    }

})();