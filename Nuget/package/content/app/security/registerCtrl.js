(function () {
    'use strict';

    var controllerId = 'registerCtrl';

    // TODO: replace app with your module name
    angular.module('app.security')
        .controller(controllerId, ['$scope','appActivitySvc','notifierSvc','accountClientSvc','userSvc', registerCtrl]);

    function registerCtrl($scope, appActivitySvc, notifierSvc, accountClientSvc,userSvc) {
        $scope.title = 'Register';
        $scope.registration = {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""            
        };
        $scope.register = register;

        activate();

        function activate() { }

        function register() {
            appActivitySvc.busy("registerCtrl");

            accountClientSvc.register($scope.registration).then(
				function (result) {
				    //success		
				    notifierSvc.show({ message: "sucessfully registered", type: "info" });
				    always();
				    signIn();
				},
				function (result) {
				    //error
				    var errors = "error registering. ";

				    if (result.data && result.data.ModelState) {
				        errors += $.PropertyValuesToString(result.data.ModelState);
				    }

				    notifierSvc.show({ message: errors, type: "error" });
				    always();
				}
			);

            function always(result) {
                appActivitySvc.idle("signInCtrl");
            }
        }

        function signIn() {      
            appActivitySvc.busy("registerCtrl");
            notifierSvc.show({ message: "signing in", type: "warning" });

            var user = {
                id: $scope.registration.email,
                password: $scope.registration.password
            };

            accountClientSvc.login(user)
                .then(
                    function (result) {
                        //good

                        userSvc.set({
                            username: result.userName,
                            accessToken: result.accessToken
                        });

                        notifierSvc.show({ message: "signed in as " + userSvc.username, type: "info" });
                    },
                    function (result) {
                        //bad
                        var errors = "error signing in. ";

                        if (result.data && result.data.ModelState) {
                            errors += $.PropertyValuesToString(result.data.ModelState);
                        } else if (result.error) {
                            errors += " " + result.error;
                        }

                        notifierSvc.show({ message: errors, type: "error" });

                        //TODO: redirect to login here
                    },
                    function (result) {
                        //always
                        appActivitySvc.idle("registerCtrl");
                    }
                );
        }
    }
})();
