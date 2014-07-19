(function () {
    'use strict';

    var security = angular.module('app.security', ['ngRoute','app.core']);

    security.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('secureHttpInterceptor');
    }]);
   
    // Handle routing errors and success events
    security.run(['externalAuthSvc', 'restoreUserSvc', 'appStatusSvc', function (externalAuthSvc, restoreUserSvc, appStatusSvc) {
        externalAuthSvc.handleAuthResponse()
            .success(function () {
                appStatusSvc.isReady(true);
            })
            .error(function () {
                restoreUserSvc.restore()
                        .finally(function () {
                            appStatusSvc.isReady(true);
                        });
            });
    }]);

})();