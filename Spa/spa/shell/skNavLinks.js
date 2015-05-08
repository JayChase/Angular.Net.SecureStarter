(function () {
    'use strict';

    angular
      .module('app.shell')
      .directive('skNavLinks', skNavLinks);

    skNavLinks.$inject = ['$rootScope', '$location', 'baseUrl'];

    function skNavLinks($rootScope, $location, baseUrl) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                navLinks: '='
            },
            replace: true,
            templateUrl: baseUrl + 'shell/skNavLinks.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.isTopLevel = function (link) {
                return !link.parent;
            };

            setInitialActive();

            function setInitialActive() {
                if (scope.navLinks && $location.path()) {
                    var activePath = $location.path().substring(1);
                    scope.navLinks.forEach(function (navLink) {
                        navLink.isActive = navLink.url === activePath;
                    });
                }
            }
        }
    }
})();