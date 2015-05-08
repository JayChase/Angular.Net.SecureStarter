(function () {
    'use strict';

    angular.module('app.security')
            .controller('SignInController', SignInController);

    SignInController.$inject = ['$scope', '$location', 'userService', 'notifierService'];

    function SignInController($scope, $location, userService, notifierService) {
        /* jshint validthis:true */
        var vm = this,
            user = {
                id: "",
                password: "",
                remember: false
            };

        vm.title = 'sign in';
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
                        $scope.signInForm.$setPristine();
                        $scope.signInForm.$setUntouched();
                    }
                );
        }
    }
})();
