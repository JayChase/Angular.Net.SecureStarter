(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute','app.core','app.session','app.security']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'app/content/welcome/welcome.html',
            controller: 'welcomeCtrl',
            showNav: 'welcome'
        });
        $routeProvider.when('/features', {
            templateUrl: 'app/content/features/features.html',
            controller: 'featuresCtrl',
            showNav: 'features',
            requireRoles: ['administrator', 'testers']
        });
        $routeProvider.when('/register', {
            templateUrl: 'app/security/register.html',
            controller: 'registerCtrl'
        });
        $routeProvider.when('/signIn', {
            templateUrl: 'app/security/signIn.html',
            controller: 'signInCtrl'
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
    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);
})();