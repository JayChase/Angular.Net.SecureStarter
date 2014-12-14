(function () {
    'use strict';

    angular.module('app.security')
            .controller('externalSignInController',  externalSignInController);

    externalSignInController.$inject = ['$window', 'userService', 'notifierService', 'appActivityService'];

    function externalSignInController($window, userService, notifierService, appActivityService) {
        /* jshint validthis:true */
        var vm = this;

        vm.title = "external auth providers"
        vm.authProviders = undefined;
        vm.login = login;

        activate();

        function activate() {
            getAuthProviders();
        }

        function login(url){            
            $window.location.href = url;
        }

        function getAuthProviders() {            
            userService.getExternalLogins({returnUrl: "/externalauth/signin"})
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
