(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngResource', 'app.core', 'app.shell', 'app.content', 'app.security']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode().enabled = true;
                
        $routeProvider.otherwise({
            redirectTo: 'welcome'
        });
    }]);

    app.value('appSettingsService', {
        base: '',
        brand: 'StarterKit',
        title: 'Angular StarterKit',
        siteUrl: ''
    });
    
    app.run(['$route','$window', 'appSettingsService', function ($route, $window, appSettingsService) {
        appSettingsService.siteUrl = $window.location.origin;
    }]);
})();