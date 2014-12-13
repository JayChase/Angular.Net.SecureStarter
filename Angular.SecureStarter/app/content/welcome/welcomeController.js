(function () {
    'use strict';

    var controllerId = 'welcomeController';

    // TODO: replace app with your module name
    angular.module('app.content')
        .controller(controllerId, ['$scope', welcomeController]);

    function welcomeController($scope) {
        $scope.title = 'Angular secure starter kit';
      
        activate();

        function activate() { }
    }
})();
