(function () {
    'use strict';

    var controllerId = 'registerCtrl';

    angular.module('app.security')
        .controller(controllerId, ['$scope', '$location', 'notifierSvc', 'userSvc', registerCtrl]);

    function registerCtrl($scope, $location, notifierSvc,userSvc) {
        $scope.title = 'Register';
        $scope.registration = {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""            
        };
        $scope.register = register;
        $scope.checkUsernameAvailable = userSvc.checkUsernameAvailable;
        $scope.checkEmailAvailable = userSvc.checkEmailAvailable;

        function register() {            
            userSvc.register($scope.registration)
                .then(
                    function (result) {
				        //success		
				        notifierSvc.show({ message: "sucessfully registered", type: "info" });				    
				        signIn();
				    },
				    function (result) {
				        notifierSvc.show({ message: result.error, type: "error" });
				    }
			    );           
        }

        function signIn() {                
            notifierSvc.show({ message: "signing in", type: "warning" });

            var user = {
                id: $scope.registration.email,
                password: $scope.registration.password
            };

            userSvc.signIn(user)
                .then(
                    function (result) {                      
                        notifierSvc.show({ message: "signed in as " + userSvc.info.username, type: "info" });
                        $location.path("/");
                    },
                    function (result) {                        
                        notifierSvc.show({ message: result.error, type: "error" });                        
                    }
                );
        }
    }
})();
