(function () {
    'use strict';

    var content = angular.module('app.content', ['ngResource']);

    content.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'app/content/welcome/welcome.html',
            controller: 'welcomeController',
            caseInsensitiveMatch: true,
            showNav: 'welcome'
        });
        $routeProvider.when('/features', {
            templateUrl: 'app/content/features/features.html',
            controller: 'featuresController',
            caseInsensitiveMatch: true,
            showNav: 'features'
        });
        $routeProvider.when('/securedWebapiDemo', {
            templateUrl: 'app/content/securedWebapiDemo/securedWebapiDemo.html',
            controller: 'securedWebApiDemoController',
            caseInsensitiveMatch: true,
            showNav: 'Secured Web API demo'
        });
    }]);

})();