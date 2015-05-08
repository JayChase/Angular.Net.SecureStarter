(function () {
    'use strict';
    
    angular.module('app.security')
            .controller('ExternalRegisterController', ExternalRegisterController);

    ExternalRegisterController.$inject = ['$location', '$window', 'externalAuthService', 'appActivityService', 'notifierService', 'userService']

    function ExternalRegisterController($location, $window, externalAuthService, appActivityService, notifierService, userService) {
        /* jshint validthis:true */
        var vm = this;

        vm.title = 'externalRegister';
        vm.registration = {
            username: "",
            email: "",
            loginProvider: ""
        };
        vm.register = register;
        vm.checkUsernameAvailable = userService.checkUsernameAvailable;
        vm.checkEmailAvailable = userService.checkEmailAvailable;

        activate();

        function activate() {
            appActivityService.busy("ExternalRegisterController");

            var info = externalAuthService.getRegistrationInfo();

            if (info) {
                vm.registration.username = info.username;
                vm.registration.email = info.email;
                vm.registration.loginProvider = info.loginProvider;
                appActivityService.idle("ExternalRegisterController");
            } else {
                appActivityService.idle("ExternalRegisterController");
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
