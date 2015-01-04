(function () {
    'use strict';

    angular
        .module('app')
        .directive('skUnique', skUnique);

    function skUnique() {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attrs, ngModel) {
            var fnName = attrs["skUnique"], validator, wrappedValidator;

            if (fnName) {
                //if the function name has been set with ending () remove them. 
                if (fnName.slice(-2) === '()') {
                    fnName = fnName.substring(0, fnName.length - 2);
                }

                //wrap the validator function to set a 'checking' error
                validator = scope.$eval(fnName);

                if (validator) {
                    wrappedValidator = function (modelValue, viewValue) {
                        ngModel.$setValidity('checking', false);

                        return validator(modelValue, viewValue)
                                            .finally(function () {
                                                ngModel.$setValidity('checking', true);
                                            });
                    };

                    ngModel.$asyncValidators.unique = wrappedValidator;
                }
            }
        }
    }
})();