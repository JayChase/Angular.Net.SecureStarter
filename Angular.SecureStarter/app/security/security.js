(function () {
    'use strict';

    var security = angular.module('app.security', ['ngRoute','app.core']);

    security.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('secureHttpInterceptor');
    }]);
   
    // Handle routing errors and success events
    security.run(['externalAuthSvc', 'restoreUserSvc', 'appStatusSvc', function (externalAuthSvc, restoreUserSvc, appStatusSvc) {
        externalAuthSvc.handleAuthResponse().then(
            null,
            function () {
                return restoreUserSvc.restore();
            })
            ['finally'](
            function () {
                appStatusSvc.isReady(true);
            });
    }]);

})();