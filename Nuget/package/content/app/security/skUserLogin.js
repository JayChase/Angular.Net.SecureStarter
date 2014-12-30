(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skUserLogin', [skUserLogin]);
    
    function skUserLogin() {
        var directive = {
            restrict: 'A',
            replace: true,
            scope: {
                login: '=skUserLogin',
                action: '&'
            },        
            templateUrl: 'app/security/skUserLogin.html'
        };

        return directive;
    }

})();