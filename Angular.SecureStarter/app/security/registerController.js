(function () {
    'use strict';

    var controllerId = 'registerController';

    angular.module('app.security')
        .controller(controllerId, ['$scope', '$location', 'notifierService', 'userService', registerController]);

    function registerController($scope, $location, notifierService,userService) {
        $scope.title = 'Register';
        $scope.registration = {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""            
        };
        $scope.register = register;
        $scope.checkUsernameAvailable = userService.checkUsernameAvailable;
        $scope.checkEmailAvailable = userService.checkEmailAvailable;

        function register() {            
            userService.register($scope.registration)
                .then(
                    function (result) {
				        //success		
				        notifierService.show({ message: "sucessfully registered", type: "info" });				    
				        signIn();
				    },
				    function (result) {
				        notifierService.show({ message: result.error, type: "error" });
				    }
			    );           
        }

        function signIn() {                
            notifierService.show({ message: "signing in", type: "warning" });

            var user = {
                id: $scope.registration.email,
                password: $scope.registration.password
            };

            userService.signIn(user)
                .then(
                    function (result) {                      
                        notifierService.show({ message: "signed in as " + userService.info.username, type: "info" });
                        $location.path("/");
                    },
                    function (result) {                        
                        notifierService.show({ message: result.error, type: "error" });                        
                    }
                );
        }
    }
})();
