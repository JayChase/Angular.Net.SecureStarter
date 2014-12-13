(function () {
    'use strict';

    var controllerId = 'signInCtrl';

    // TODO: replace app with your module name
    angular.module('app.security')
        .controller(controllerId, ['$scope','$location', 'userService','notifierService', signInCtrl]);

    function signInCtrl($scope, $location, userService, notifierService) {
        $scope.title = 'Sign in';
        $scope.user = {
            id: "",
            password: "",
            remember: false
        };
        $scope.signIn = signIn;
        $scope.result = "";
              
        activate();

        function activate() {
            
        }
                
        function signIn() {

            userService.signIn($scope.user)
                .then(
                    function (result) {                       
                        $location.path('/');
                    },
                    function (result) {                        
                        //TODO: set focus back here
                        $scope.user.id = ""; 
                        $scope.user.password = "";
                        $scope.user.remember = false;
                    }
                );
        }
    }
})();
