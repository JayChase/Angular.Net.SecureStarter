(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('skAsyncValidators', skAsyncValidators);

    skAsyncValidators.$inject = ['$parse'];

    function skAsyncValidators($parse) {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attrs, ngModel) { 
            var asyncValidators = scope.$eval(attrs["skAsyncValidators"]);

            if (asyncValidators) {
                angular.extend(ngModel.$asyncValidators, asyncValidators);
            }
        }
    }
})();