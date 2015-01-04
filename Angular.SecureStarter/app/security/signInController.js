(function () {
    'use strict';

    angular.module('app.security')
            .controller('signInController', signInController);

    signInController.$inject = ['$scope', '$location', 'userService', 'notifierService'];

    function signInController($scope, $location, userService, notifierService) {
        /* jshint validthis:true */
        var vm = this,
            user = {
                id: "",
                password: "",
                remember: false
            };

        vm.title = 'Sign in';
        vm.user = angular.copy(user);
        vm.signIn = signIn;
        vm.result = "";
              
        activate();

        function activate() {
            
        }
                
        function signIn() {

            userService.signIn(vm.user)
                .then(
                    function (result) {                       
                        $location.path('/');
                    },
                    function (result) {                        
                        vm.user = angular.copy(user);
                        $scope.signInForm.$setUntouched();
                        $scope.signInForm.$setPristine();
                    }
                );
        }
    }
})();
