(function() {
    'use strict';

    angular.module('app.core')
        .directive('skDisableWhenBusy', ['$rootScope', skDisableWhenBusy]);
    
    function skDisableWhenBusy($rootScope) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var target = element;
            $rootScope.$on("appActivitySvc:isBusyChanged", function (event, args) {
                angular.element(target).prop('disabled', args.busy);
            });
        }
    }

})();