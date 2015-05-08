(function () {
    'use strict';

    angular.module('app.content')
        .controller('WelcomeController',WelcomeController);

    function WelcomeController() {
        /* jshint validthis:true */
        var vm = this;

        vm.title = 'Angular starter kit';
      
        activate();

        function activate() { }
    }
})();
