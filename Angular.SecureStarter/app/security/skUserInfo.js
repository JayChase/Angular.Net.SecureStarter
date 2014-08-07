(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skUserInfo', ['$rootScope','$location','userSvc','appStatusSvc',skUserInfo]);
    
    function skUserInfo($rootScope,$location, userSvc, appStatusSvc) {
        var directive = {
            //controller: controller,
            restrict: 'E',
            replace: true,
            templateUrl: 'app/security/skUserInfo.html',
            link: link

        };

        //TODO: evaluate whether it is best just to watch the sigedIn and user properties
        function link($scope, $element, attrs, ctrl) {
            $scope.username = userSvc.info.username;
            $scope.signedIn = userSvc.info.signedIn;
            $scope.signOut = function () {
                userSvc.signOut();
                $location.path('/');
            };

            $rootScope.$on("userSvc:signedInChanged", function (event, args) {
                $scope.signedIn = userSvc.info.signedIn;
                $scope.username = userSvc.info.username;
            });                
        }
        
        return directive;
    }

})();