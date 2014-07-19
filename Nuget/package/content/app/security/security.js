(function () {
    'use strict';

    var security = angular.module('app.security', ['ngRoute','app.core']);

    security.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('secureHttpInterceptor');
    }]);
    
    security.run(['$rootScope', 'guardRouteSvc', function ($rootScope, guardRouteSvc) {
        // Include $route to kick start the router.
        $rootScope.$on('$locationChangeStart', function (event, newUrl) {
            guardRouteSvc.guard(event, newUrl);
        });
    }]);

})();