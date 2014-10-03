(function () {
    'use strict';

    var controllerId = 'welcomeCtrl';

    // TODO: replace app with your module name
    angular.module('app')
        .controller(controllerId, ['$scope', weclomeCtrl]);

    function weclomeCtrl($scope) {
        $scope.title = 'Angular secure starter kit';
      
        activate();

        function activate() { }
    }
})();
