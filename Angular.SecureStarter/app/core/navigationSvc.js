(function () {
    'use strict';

    var serviceId = 'navigationSvc';
    
    angular.module('app.core')
        .factory(serviceId, ['$route',navigationSvc]);

    function navigationSvc($route) {
        var links = [];

        var service = {
            getLinks: getLinks
        };

        activate();

        function activate() {
            angular.forEach($route.routes, function (route) {
                if (route.showNav) {
                    links.push({
                        name: route.showNav,
                        url: (removeStartSlash(route.navPath) || removeStartSlash(route.originalPath)),
                        showForRoles: route.showForRoles
                    });
                }
            });
        }

        function getLinks() {
            return links;
        }

        return service;

        function removeStartSlash(path) {
            if (path && path.charAt(0) === '/') {
                path = path.substring(1);
            }

            return path;
        }
    }
})();