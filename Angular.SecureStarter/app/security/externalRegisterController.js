(function () {
    'use strict';
    
    angular.module('app.security')
            .controller('externalRegisterController', externalRegisterController);

    externalRegisterController.$inject = ['$location', '$window', 'externalAuthService', 'appActivityService', 'notifierService', 'userService']

    function externalRegisterController($location, $window, externalAuthService, appActivityService, notifierService, userService) {
        /* jshint validthis:true */
        var vm = this;

        vm.title = 'externalRegister';
        vm.registration = {
            username: "",
            email: "",
            loginProvider: ""
        };
        vm.register = register;

        activate();

        function activate() {
            appActivityService.busy("externalRegisterController");

            var info = externalAuthService.getRegistrationInfo();

            if (info) {
                vm.registration.username = info.username;
                vm.registration.email = info.email;
                vm.registration.loginProvider = info.loginProvider;
                appActivityService.idle("externalRegisterController");
            } else {
                appActivityService.idle("externalRegisterController");
                notifierService.show({ message: "something went wrong", type: "error" });
                $location.path("/register");
            }
        }

        function register() {
            userService.registerExternal(vm.registration).then(
                function (result) {
                    notifierService.show({ message: "registered successfully as " + userService.info.username, type: "info" });                    
                    userService.signInExternal(vm.registration.loginProvider)
                        .then(
                            function (result) {
                                //point to auth server
                                $window.location.href = userService.authServer + result.url;                                
                            },
				            function (result) {				                
				                //notifierService.show({ message: "something went wrong signing in. Error" + result.error, type: "error" });
				            });
                },
				function (result) {
				    notifierService.show({ message: result.error, type: "error" });
				});
        }
    }
})();
