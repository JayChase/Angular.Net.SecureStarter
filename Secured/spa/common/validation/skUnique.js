(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('skUnique', skUnique);

    skUnique.$inject = [];

    function skUnique() {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
            scope: {
                skUnique: '&'
            }
        };

        return directive;

        function link(scope, element, attrs, ngModel) {
            var wrappedValidator = function (mv, vv) {
                ngModel.$setValidity('checking', false);

                return scope.skUnique({ value: mv || vv })
                                    .finally(function () {
                                        ngModel.$setValidity('checking', true);
                                    });
            };

            ngModel.$asyncValidators.unique = wrappedValidator;
        }
    }
})();