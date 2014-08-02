(function() {
    'use strict';

    angular.module('app')
        .directive('skAppReady', ['appStatusSvc', skAppReady]);
    
    function skAppReady(appStatusSvc) {
        
        var directive = {
            link: link,
            restrict: 'A',
            scope: {

            }
        };
        return directive;

        function link(scope, element, attr) {
            appStatusSvc.isReady(attr.skAppReady);
        }
    }

})();