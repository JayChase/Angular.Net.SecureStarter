(function () {
    'use strict';

    angular.module('app.security')
            .controller('signInController', signInController);

    signInController.$inject = ['$location', 'userService', 'notifierService'];

    function signInController($location, userService, notifierService) {
        /* jshint validthis:true */
        var vm = this;

        vm.title = 'Sign in';
        vm.user = {
            id: "",
            password: "",
            remember: false
        };
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
                        //TODO: set focus back here
                        vm.user.id = ""; 
                        vm.user.password = "";
                        vm.user.remember = false;
                    }
                );
        }
    }
})();
