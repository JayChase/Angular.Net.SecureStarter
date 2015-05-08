(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('skFocusOnSetPristine', skFocusOnSetPristine);

    
    function skFocusOnSetPristine () {
        
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            //get the parent form element and form on the scope
            var formElement = element.parents('form'),
              form = scope[formElement.attr('name')],
              focusElement = element;

            scope.$watch(function () {
                return form.$pristine;

            },
              function (newValue, oldValue) {
                  if (newValue && !oldValue) {
                      element.focus();
                  }
              });
        }
    }

})();