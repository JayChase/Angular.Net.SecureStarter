(function () {
    'use strict';

    var security = angular.module('app.security', []);

    security.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
        $httpProvider.interceptors.push('secureHttpInterceptor');

        $routeProvider.when('/register', {
            templateUrl: 'app/security/register.html',
            controller: 'registerCtrl',
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/signIn', {
            templateUrl: 'app/security/signIn.html',
            controller: 'signInCtrl',
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/manage', {
            templateUrl: 'app/security/manage.html',
            controller: 'manageCtrl',
            resolve: {
                guard: ['guardSvc', function (guardSvc) {
                    return guardSvc.guardRoute();
                }]
            },
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/externalregister', {
            templateUrl: 'app/security/externalRegister.html',
            controller: 'externalRegisterCtrl',
            resolve: {
                appReady: ['appStatusSvc', function (appStatusSvc) {
                    return appStatusSvc.whenReady();
                }]
            },
            caseInsensitiveMatch: true
        });
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