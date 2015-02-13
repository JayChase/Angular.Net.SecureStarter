(function() {
    'use strict';

    angular.module('app.security')
        .directive('skLoginProvider', [skLoginProvider]);
    
    function skLoginProvider() {
        var directive = {            
            restrict: 'A',
            replace: true,
            scope: {
                provider: '=skLoginProvider',
                action: '&'
            },
            templateUrl: 'app/security/skLoginProvider.html'
        };

        return directive;        
    }

})();