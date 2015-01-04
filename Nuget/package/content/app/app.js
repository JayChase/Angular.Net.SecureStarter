(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngResource', 'app.core', 'app.shell', 'app.content', 'app.security']);

    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode().enabled = true;                
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