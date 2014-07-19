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

        //TODO maybe a bit broken had to change to single array instance as creating a new array everytime is bad for bindings
        function activate() {
            for (var route in $route.routes) {
                if ($route.routes.hasOwnProperty(route) && $route.routes[route].showNav) {
                    links.push({ name: $route.routes[route].showNav, url: ($route.routes[route].navPath || route) });
                }
            }
        }

        function getLinks() {
            return links;
        }

        return service;
        
    }
})();