(function () {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skRequiredRoles', skRequiredRoles);

    skRequiredRoles.$inject = ['guardSvc'];

    function skRequiredRoles(guardSvc) {
        var directive = {
            restrict: 'A',            
            link: link       
        };

        return directive;

        function link(scope, element, attr) {
            scope.$watch(attr.skRequiredRoles, function (value) {
                
            });            
        }
    }

})();