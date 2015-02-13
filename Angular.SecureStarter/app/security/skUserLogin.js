(function() {
    'use strict';

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