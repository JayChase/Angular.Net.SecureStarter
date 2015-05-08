(function() {
    'use strict';

    angular
        .module('app.shell')
        .directive('skTopNav', skTopNav);

    skTopNav.$inject = ['appSettingsService', 'navigationService', 'baseUrl'];
    
    function skTopNav(appSettingsService, navigationService, baseUrl) {
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: baseUrl + 'shell/skTopNav.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.title = appSettingsService.title;
            scope.brand = appSettingsService.brand;
            scope.links = navigationService.getLinks();
        }
    }

})();