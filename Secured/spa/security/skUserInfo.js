(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skUserInfo', ['$rootScope','$location','userService','appStatusService', 'guardService', 'baseUrl', skUserInfo]);
    
    function skUserInfo($rootScope, $location, userService, appStatusService, guardService, baseUrl) {
        var directive = {            
            restrict: 'E',
            replace: true,
            templateUrl: baseUrl + 'security/skUserInfo.html',
            link: link

        };

        //TODO: evaluate whether it is best just to watch the sigedIn and user properties
        function link($scope, $element, attrs, ctrl) {
            $scope.username = userService.info.username;
            $scope.signedIn = userService.info.signedIn;

            $scope.signOut = function () {
                userService.signOut();
                $location.path('/');
            };

            $scope.signIn = function () {
                guardService.redirectToSignIn();
            };


            $rootScope.$on("userService:signedInChanged", function (event, args) {
                $scope.signedIn = userService.info.signedIn;
                $scope.username = userService.info.username;
            });                
        }
        
        return directive;
    }

})();