(function () {
    'use strict';

    var security = angular.module('app.security', ['ngRoute','ngResource','ngMessages', 'app.core']);

    security.config(['$httpProvider', '$routeProvider', 'accountResourceProvider', 'guardServiceProvider', 'baseUrl', function ($httpProvider, $routeProvider, accountResourceProvider, guardServiceProvider, baseUrl) {
        $httpProvider.interceptors.push('secureHttpInterceptor');

        //accountResourceProvider.setAuthServer('https://externalauthserver/');

        guardServiceProvider.setSiginInUrl({ url: '/signIn', urlIsExternal: false });

        $routeProvider.when('/register', {
            templateUrl: baseUrl + 'security/register.html',            
            controller: 'RegisterController',
            controllerAs : 'vm',
            caseInsensitiveMatch: true
        })
        .when('/signIn', {
            templateUrl: baseUrl + 'security/signIn.html',
            controller: 'SignInController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true
        })
        .when('/manage', {
            templateUrl: baseUrl + 'security/manage.html',
            controller: 'ManageController',
            controllerAs: 'vm',
            resolve: {
                guard: ['guardService', function (guardService) {
                    return guardService.guardRoute();
                }]
            },
            caseInsensitiveMatch: true
        })
        .when('/externalregister', {
            templateUrl: baseUrl + 'security/externalRegister.html',
            controller: 'ExternalRegisterController',
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
        externalAuthService.handleAuthResponse()
                            .then(
                                null,
                                function () {
                                    return restoreUserService.restore();
                                })
                            .finally(
                                function () {
                                    appStatusService.isReady(true);
                                });
    }]);

})();