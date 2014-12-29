(function () {
    'use strict';

    var security = angular.module('app.security', ['ngRoute','ngResource','ngMessages', 'app.core']);

    security.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
        $httpProvider.interceptors.push('secureHttpInterceptor');

        $routeProvider.when('/register', {
            templateUrl: 'app/security/register.html',            
            controller: 'registerController',
            controllerAs : 'vm',
            caseInsensitiveMatch: true
        })
        .when('/signIn', {
            templateUrl: 'app/security/signIn.html',
            controller: 'signInController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true
        })
        .when('/manage', {
            templateUrl: 'app/security/manage.html',
            controller: 'manageController',
            controllerAs: 'vm',
            resolve: {
                guard: ['guardService', function (guardService) {
                    return guardService.guardRoute();
                }]
            },
            caseInsensitiveMatch: true
        })
        .when('/externalregister', {
            templateUrl: 'app/security/externalRegister.html',
            controller: 'externalRegisterController',
            controllerAs: 'vm',
            resolve: {
                appReady: ['appStatusService', function (appStatusService) {
                    return appStatusService.whenReady();
                }]
            },
            caseInsensitiveMatch: true
        });
    }]);
   
    // Handle routing errors and success events
    security.run(['externalAuthService', 'restoreUserService', 'appStatusService', function (externalAuthService, restoreUserService, appStatusService) {
        externalAuthService.handleAuthResponse().then(
            null,
            function () {
                return restoreUserService.restore();
            })
            ['finally'](
            function () {
                appStatusService.isReady(true);
            });
    }]);

})();