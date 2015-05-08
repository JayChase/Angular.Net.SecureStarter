(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngAnimate', 'app.core', 'app.shell', 'app.content', 'app.security']);

    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);                
    }]);
    
    app.run(['$route', function ($route) {                
    }]);
})();