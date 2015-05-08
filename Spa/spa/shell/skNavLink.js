(function () {
    'use strict';

    angular
      .module('app.shell')
      .directive('skNavLink', skNavLink);

    skNavLink.$inject = ['$filter', '$templateRequest', '$compile', '$rootScope', 'baseUrl'];

    function skNavLink($filter, $templateRequest, $compile, $rootScope, baseUrl) {
        var directive = {
            restrict: 'E',
            scope: {
                navLink: '='
            },
            replace: true,
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            $templateRequest(baseUrl + 'shell/skNavLink.html').then(function (result) {
                scope.navLinks = scope.$parent.navLinks || scope.$parent.$parent.navLinks;
                scope.hasChildren = $filter('filter')(scope.navLinks, {
                    parent: scope.navLink.name
                }).length > 0;

                var template = angular.element(result);

                if (!scope.hasChildren) {
                    template.children(".child-nav-links").remove();
                }

                var el = $compile(template)(scope);
                element.replaceWith(el);
            });

            $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
                if (!scope.navLink.parent && next.$$route) {
                    scope.navLink.isActive = scope.navLink.name === next.$$route.showNav
                                            || scope.navLink.name === next.$$route.parent;
                }
            });
        }
    }
})();