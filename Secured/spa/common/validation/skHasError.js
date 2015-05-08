(function() {
    'use strict';

    angular
        .module('app.common')
        .directive('skHasError', skHasError);

    function skHasError() {
        var directive = {
            restrict: 'A',
            require: 'ngMessages',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ngMessages) {
            var renderMessages = ngMessages.renderMessages,
              hasErrorTarget;

            if (!hasErrorTarget) {
                if (attrs.skHasError) {
                    hasErrorTarget = element.parents('#' + attrs.skHasError);
                } else {
                    hasErrorTarget = element.parent('.form-group');
                }
            }

            ngMessages.renderMessages = function (values, multiple, element) {
                renderMessages.apply(this, arguments);

                if ($.isEmptyObject(values)) {
                    hasErrorTarget.removeClass('has-error');
                } else {
                    hasErrorTarget.addClass('has-error');
                }
            };
        }
    }
})();