(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngAnimate', 'app.core', 'app.shell', 'app.content', 'app.security']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode().enabled = true;
                
        $routeProvider.otherwise({
            redirectTo: 'welcome'
        });
    }]);

    app.value('appSettingsSvc', {
        base: '',
        brand: 'StarterKit',
        title: 'Angular StarterKit',
        siteUrl: ''
    });
    
    app.run(['$route','$window', 'appSettingsSvc', function ($route, $window, appSettingsSvc) {
        appSettingsSvc.siteUrl = $window.location.origin;
    }]);
})();