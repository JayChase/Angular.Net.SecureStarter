(function () {
    'use strict';

    var controllerId = 'shell';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', shell]);

    function shell($scope) {
           
    }
})();
