(function () {
    'use strict';
    var core = angular.module('app.core', ['app.common']);

    core.config(['$provide', function ($provide) {
        $provide.constant("baseUrl", ""); //url to the server location of the spa (requires trailing slash)
        $provide.constant("siteUrl", angular.element('base')[0].href); //will have trailing slash
    }]);

    //if a client_id header is required add the clientId property to the appSettingsService
    core.value('appSettingsService', {
        brand: 'AngulerStarterKit',
        title: 'Angular Starter Kit'
    });
})();