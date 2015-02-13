(function () {
    'use strict';

    var controllerId = 'welcomeCtrl';
    
    angular.module('app.content')
        .controller(controllerId, ['$scope', weclomeCtrl]);

    function weclomeCtrl($scope) {
        $scope.title = 'Angular secure starter kit';
      
        activate();

        function activate() { }
    }
})();
