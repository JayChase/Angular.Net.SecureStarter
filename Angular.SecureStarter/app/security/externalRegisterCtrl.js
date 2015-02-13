(function () {
    'use strict';

    var controllerId = 'externalRegisterCtrl';

    angular.module('app.security')
        .controller(controllerId, ['$scope','$location', '$window', 'externalAuthSvc','appActivitySvc','notifierSvc','userSvc', externalRegisterCtrl]);

    function externalRegisterCtrl($scope, $location, $window, externalAuthSvc, appActivitySvc, notifierSvc, userSvc) {
        $scope.title = 'externalRegister';
        $scope.registration = {
            username: "",
            email: "",
            loginProvider: ""
        };
        $scope.register = register;

        activate();

        function activate() {
            appActivitySvc.busy("externalRegisterCtrl");

            var info = externalAuthSvc.getRegistrationInfo();

            if (info) {
                $scope.registration.username = info.username;
                $scope.registration.email = info.email;
                $scope.registration.loginProvider = info.loginProvider;
                appActivitySvc.idle("externalRegisterCtrl");
            } else {
                appActivitySvc.idle("externalRegisterCtrl");
                notifierSvc.show({ message: "something went wrong", type: "error" });
                $location.path("/register");
            }
        }

        function register() {
            userSvc.registerExternal($scope.registration).then(
				function (result) {
				    notifierSvc.show({ message: "registered successfully as " + userSvc.info.username, type: "info" });
				    userSvc.signInExternal($scope.registration.loginProvider).then(
				            function (result) {
				                $window.location.href = result.data.url;
				            },
				            function (result) {
				                //error
				                notifierSvc.show({ message: "something went wrong signing in. Error" + result.error, type: "error" });
				            }
			            );
				},
				function (result) {
				    notifierSvc.show({ message: result.error, type: "error" });				 
				});
        }
    }
})();
