(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skUserInfo', ['$rootScope','userSvc','appStatusSvc',skUserInfo]);
    
    function skUserInfo($rootScope, userSvc, appStatusSvc) {
        var directive = {
            //controller: controller,
            restrict: 'E',
            replace: true,
            templateUrl: 'app/security/skUserInfo.html',
            link: function ($scope, $element, attrs, ctrl) {
                $scope.username = "";
                $scope.signedIn = false;
                $scope.signOut = signOut;

                $rootScope.$on("userSvc:signedInChanged", function (event, args) {
                    $scope.signedIn = args.signedIn;
                    $scope.username = userSvc.username;
                });

                //appStatusSvc.isReady(true);
            }

        };

        function signOut() {
            userSvc.signOut();
        }

        return directive;

        function controller($rootScope, $scope, userSvc, accountClientSvc) {
            $scope.username = "";
            $scope.signedIn = false;
            $scope.signOut = signOut;

            $rootScope.$on("userSvc:signedInChanged", function (event, args) {
                $scope.signedIn = args.signedIn;
                $scope.username = userSvc.username;                
            });
        }
    }

})();