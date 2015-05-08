(function() {
    'use strict';

    angular
        .module('app.shell')
        .directive('skLoadingScreen', skLoadingScreen);

    skLoadingScreen.$inject = ['baseUrl', 'appStatusService', 'appSettingsService'];
    
    function skLoadingScreen(baseUrl, appStatusService, appSettingsService) {
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: baseUrl + 'shell/skLoadingScreen.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.title = appSettingsService.title;
            scope.hide = false;

            scope.$watch(function () {
                return appStatusService.info.loading;
            }, function (value) {
                scope.hide = !value;
            });

        }
    }

})();