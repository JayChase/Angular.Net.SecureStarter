(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'app.core', 'app.shell', 'app.security']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/welcome', {
            templateUrl: 'app/content/welcome/welcome.html',
            controller: 'welcomeCtrl',
            caseInsensitiveMatch: true,
            showNav: 'welcome'
        });
        $routeProvider.when('/features', {
            templateUrl: 'app/content/features/features.html',
            controller: 'featuresCtrl',
            caseInsensitiveMatch: true,
            showNav: 'features'
        });
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
        $routeProvider.when('/externalregister', {
            templateUrl: 'app/security/externalRegister.html',
            controller: 'externalRegisterCtrl',
            resolve: {
                appReady: function (appStatusSvc)
                {
                    return appStatusSvc.whenReady();
                }
            },
            caseInsensitiveMatch: true,
        });
        $routeProvider.otherwise({
            redirectTo: '/welcome'
        });
    }]);

    app.value('appSettingsSvc', {
        brand: "StarterKit",
        title: "Angular StarterKit"
    });

    // Handle routing errors and success events
    app.run(['externalAuthSvc', 'appStatusSvc', function (externalAuthSvc, appStatusSvc) {        
        externalAuthSvc.handleAuthResponse();        
    }]);
})();