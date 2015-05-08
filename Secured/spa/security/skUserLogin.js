(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app.security')
        .directive('skUserLogin', ['baseUrl', skUserLogin]);
    
    function skUserLogin(baseUrl) {
        var directive = {
            restrict: 'AE',
            replace: true,
            scope: {
                login: '=',
                action: '&'
            },        
            templateUrl: baseUrl + 'security/skUserLogin.html'
        };

        return directive;
    }

})();