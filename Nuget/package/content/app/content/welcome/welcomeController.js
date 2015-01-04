(function () {
    'use strict';

    var controllerId = 'welcomeController';

    // TODO: replace app with your module name
    angular.module('app.content')
        .controller(controllerId,welcomeController);

    function welcomeController() {
        /* jshint validthis:true */
        var vm = this;

        vm.title = 'Angular secure starter kit';
      
        activate();

        function activate() { }
    }
})();
