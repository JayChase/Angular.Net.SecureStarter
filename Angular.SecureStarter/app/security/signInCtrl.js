(function () {
    'use strict';

    var controllerId = 'signInCtrl';

    // TODO: replace app with your module name
    angular.module('app.security')
        .controller(controllerId, ['$scope', 'accountClientSvc','userSvc','notifierSvc', 'appActivitySvc', signInCtrl]);

    function signInCtrl($scope, accountClientSvc, userSvc,notifierSvc, appActivitySvc) {
        $scope.title = 'Sign in';
        $scope.user = {
            id: "",
            password: ""
        };
        $scope.signIn = signIn;
        $scope.result = "";
      
        activate();

        function activate() {
            
        }
                
        function signIn() {

            appActivitySvc.busy("signInCtrl");    
                        
            accountClientSvc.login($scope.user)
                .then(
                    function (result) {
                        //good
                        userSvc.set({
                            username: result.userName,
                            accessToken: result.access_token,
                            roles: result.userRoles.split(",")
                        });

                        notifierSvc.show({ message: "signed in as " + userSvc.username, type: "info" });
                        always(result);
                    },
                    function (result) {
                        //bad
                        var errors = "error signing in. ";

                        if (result.data && result.data.ModelState) {
                            errors += $.PropertyValuesToString(result.data.ModelState);
                        } else if (result.error){
                            errors += " " + result.error;
                        }

                        notifierSvc.show({ message: errors, type: "error" });
                        always(result);
                    }
                );

            function always(result){
                appActivitySvc.idle("signInCtrl");
            }
        }
    }
})();
