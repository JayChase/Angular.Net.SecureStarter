(function () {
    'use strict';

    var controllerId = 'signInCtrl';

    angular.module('app.security')
        .controller(controllerId, ['$scope','$location', 'userSvc','notifierSvc', signInCtrl]);

    function signInCtrl($scope, $location, userSvc, notifierSvc) {
        $scope.title = 'Sign in';
        $scope.user = {
            id: "",
            password: ""
        };
        $scope.signIn = signIn;
        $scope.result = "";
        $scope.remember = false;
      
        activate();

        function activate() {
            
        }
                
        function signIn() {
            userSvc.signIn($scope.user,$scope.remember)
                .then(
                    function (result) {
                        notifierSvc.show({ message: "signed in as " + userSvc.info.username, type: "info" });
                        $location.path('/');
                    },
                    function (result) {                        
                        //TODO: set focus back here
                        $scope.user.id = ""; 
                        $scope.user.password = "";

                        notifierSvc.show({ message: result.error, type: "error" });
                    }
                );
        }
    }
})();
