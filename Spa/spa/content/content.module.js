(function () {
    'use strict';

    var content = angular.module('app.content', []);

    content.config(['$routeProvider', 'baseUrl', function ($routeProvider, baseUrl) {
        $routeProvider.when('/', {
            templateUrl: baseUrl + 'content/welcome/welcome.html',
            controller: 'WelcomeController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true
        })
        .when('/welcome', {
            templateUrl: baseUrl + 'content/welcome/welcome.html',
            controller: 'WelcomeController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true,
            showNav: 'welcome'
        })
        .when('/features', {
            templateUrl: baseUrl +'content/features/features.html',
            controller: 'FeaturesController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true,
            showNav: 'features'
        })
        .otherwise('/');
    }]);

})();