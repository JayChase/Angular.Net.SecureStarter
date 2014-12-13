(function () {
    'use strict';

    var controllerId = 'externalRegisterController';

    angular.module('app.security')
        .controller(controllerId, ['$scope','$location','$window', 'externalAuthService','appActivityService','notifierService','userService', externalRegisterController]);

    function externalRegisterController($scope, $location, $window, externalAuthService, appActivityService, notifierService, userService) {
        $scope.title = 'externalRegister';
        $scope.registration = {
            username: "",
            email: "",
            loginProvider: ""
        };
        $scope.register = register;

        activate();

        function activate() {
            appActivityService.busy("externalRegisterController");

            var info = externalAuthService.getRegistrationInfo();

            if (info) {
                $scope.registration.username = info.username;
                $scope.registration.email = info.email;
                $scope.registration.loginProvider = info.loginProvider;
                appActivityService.idle("externalRegisterController");
            } else {
                appActivityService.idle("externalRegisterController");
                notifierService.show({ message: "something went wrong", type: "error" });
                $location.path("/register");
            }
        }

        function register() {
            userService.registerExternal($scope.registration).then(
				function (result) {				    
				    userService.getExternalLogin("/externalauth/signin", $scope.registration.loginProvider)
				                .then(function (result) {
				                    $window.location.href = result.url;
				                });
				});
        }
    }
})();
