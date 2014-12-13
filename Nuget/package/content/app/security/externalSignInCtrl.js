(function () {
    'use strict';

    var controllerId = 'externalSignInCtrl';

    angular.module('app.security')
        .controller(controllerId, ['$scope', '$window', 'accountClientSvc', 'notifierSvc', 'appActivitySvc', externalSignInCtrl]);

    function externalSignInCtrl($scope, $window, accountClientSvc, notifierSvc, appActivitySvc) {
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
            appActivitySvc.busy("externalSignInCtrl");

            accountClientSvc.getExternalLogins("/externalauth/signin").then(
				function (result) {
				    $scope.authProviders = result.data;
				},
				function (result) {
				    notifierSvc.show({ message: "error retrieving external logins", type: "error" });
				}
			)
            ['finally'](
            function () {
                appActivitySvc.idle("externalSignInCtrl");
            });
        }
    }
})();
