(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skLoginProvider', ['userManagementSvc', skLoginProvider]);
    
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