(function () {
    'use strict';

    var security = angular.module('app.security', []);

    security.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('secureHttpInterceptor');
    }]);
    
})();