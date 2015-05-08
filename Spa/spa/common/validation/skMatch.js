(function () {
    'use strict';

    angular.module('app.common')
        .directive('skMatch', [skMatch]);

    function skMatch() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            scope.$watchGroup([
              attrs.ngModel,
              attrs.skMatch
            ], function (newValues) {
                ctrl.$setValidity('match', newValues[0] === newValues[1]);
            });
        }
    }    
})();