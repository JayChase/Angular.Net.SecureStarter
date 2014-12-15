(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skUserLogin', [skUserLogin]);
    
    function skUserLogin() {
        var directive = {
            restrict: 'AE',
            replace: true,
            scope: {
                login: '=',
                action: '&'
            },        
            templateUrl: 'app/security/skUserLogin.html'
        };

        return directive;
    }

})();