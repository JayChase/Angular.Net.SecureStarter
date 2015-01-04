(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skLoginProvider', [skLoginProvider]);
    
    function skLoginProvider() {
        var directive = {            
            restrict: 'AE',
            replace: true,
            scope: {
                provider: '=',
                action: '&'
            },
            templateUrl: 'app/security/skLoginProvider.html'
        };

        return directive;        
    }

})();