(function () {
    'use strict';

    var controllerId = 'externalSignInController';

    angular.module('app.security')
        .controller(controllerId, ['$scope', '$window', 'userService', 'notifierService', 'appActivityService', externalSignInController]);

    function externalSignInController($scope, $window, userService, notifierService, appActivityService) {
        $scope.title = "external auth providers"
        $scope.authProviders = undefined;
        $scope.login = login;

        activate();

        function activate() {
            getAuthProviders();
        }

        function login(url){            
            $window.location.href = url;
        }

        function getAuthProviders() {            
            userService.getExternalLogins("/externalauth/signin")
                                    .then(
				                        function (result) {
				                            $scope.authProviders = result;
				                        },
				                        function (result) {
				                            notifierService.show({ message: "error retrieving external logins", type: "error" });
				                        });
        }
    }
})();
