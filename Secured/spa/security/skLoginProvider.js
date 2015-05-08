(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skLoginProvider', ['baseUrl', skLoginProvider]);
    
    function skLoginProvider(baseUrl) {
        var directive = {            
            restrict: 'AE',
            replace: true,
            scope: {
                provider: '=',
                action: '&'
            },
            templateUrl: baseUrl + 'security/skLoginProvider.html'
        };

        return directive;        
    }

})();