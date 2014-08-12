(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute','ngAnimate','app.shell', 'app.core', 'app.security']);

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
                appReady: ['appStatusSvc', function (appStatusSvc)
                {
                    return appStatusSvc.whenReady();
                }]
            },
            caseInsensitiveMatch: true
        });
        $routeProvider.otherwise({
            redirectTo: '/welcome'
        });
    }]);

    app.value('appSettingsSvc', {
        brand: 'StarterKit',
        title: 'Angular StarterKit',
        siteUrl: ''
    });
    
    app.run(['$route','$window', 'appSettingsSvc', function ($route, $window, appSettingsSvc) {
        appSettingsSvc.siteUrl = $window.location.origin;
    }]);
})();