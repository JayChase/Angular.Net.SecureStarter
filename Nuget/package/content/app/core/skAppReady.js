(function() {
    'use strict';

    angular.module('app')
        .directive('skAppReady', ['appStatusService', skAppReady]);
    
    function skAppReady(appStatusService) {
        
        var directive = {
            link: link,
            restrict: 'A',
            scope: {

            }
        };
        return directive;

        function link(scope, element, attr) {
            appStatusService.isReady(attr.skAppReady);
        }
    }

})();