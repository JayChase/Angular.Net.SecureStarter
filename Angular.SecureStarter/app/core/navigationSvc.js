(function () {
    'use strict';

    var serviceId = 'navigationSvc';

    // TODO: replace app with your module name
    angular.module('app.core')
        .factory(serviceId, ['$route',navigationSvc]);

    function navigationSvc($route) {
        var service = {
            getLinks: getLinks
        };

        function getLinks() {
            var links = [];

            for (var route in $route.routes) {
                if ($route.routes.hasOwnProperty(route) && $route.routes[route].showNav) {
                    links.push({ name: $route.routes[route].showNav, url: "#" + ($route.routes[route].navPath || route) });
                }
            }

            return links;
        }

        return service;
        
    }
})();