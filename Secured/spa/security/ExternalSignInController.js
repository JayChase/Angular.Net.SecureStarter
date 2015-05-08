(function () {
    'use strict';

    angular.module('app.security')
            .controller('ExternalSignInController',  ExternalSignInController);

    ExternalSignInController.$inject = ['$window','siteUrl', 'userService', 'notifierService'];

    function ExternalSignInController($window, siteUrl, userService, notifierService) {
        /* jshint validthis:true */
        var vm = this;

        vm.title = "external auth providers"
        vm.authProviders = undefined;
        vm.login = login;

        activate();

        function activate() {
            getAuthProviders();
        }

        function login(url) {            
            $window.location.href = userService.authServer + url;
        }

        function getAuthProviders() {            
            userService.getExternalLogins({returnUrl: siteUrl + "externalauth/signin"})
                                    .then(
				                        function (result) {
				                            vm.authProviders = result;
				                        },
				                        function (result) {
				                            notifierService.show({ message: "error retrieving external logins", type: "error" });
				                        });
        }
    }
})();
