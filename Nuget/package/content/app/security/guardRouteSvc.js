(function () {
    'use strict';

    var serviceId = 'guardRouteSvc';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(serviceId, ['$route','$location','userSvc','notifierSvc', guardRouteSvc]);

    function guardRouteSvc($route, $location, userSvc, notifierSvc) {
        var service = {
            guard: guard
        };

        return service;

        function guard(event, url) {

            var path = getOriginalPathFromUrl(url);

            var targetRoute = $route.routes[path];

            if (targetRoute && targetRoute.requireRoles) {
                if (userSvc.signedIn) {
                    //var res = allowNavigation(targetRoute.requireRoles);
                    var res = false;

                    if (targetRoute.requireRoles.length === 0) {
                        res = true;
                    } else if ($.arrayIntersect(targetRoute.requireRoles,userSvc.roles).length > 0){
                        res = true;
                    }

                    if (res !== true) {
                        notifierSvc.show({ message: "you do not have the required permissions to few this page." });
                        event.preventDefault();
                    }
                } else {
                    notifierSvc.show({ message: "You need to sign in first." });
                    //TODO this will load up a fresh sign in every time (annoying) cannot use $browser so get window.location and check is sign in already loaded
                    $location.path("/signIn");
                }
            }
        }
        
        function getOriginalPathFromUrl(url) {
            var splitUrl = url.split('/');

            return "/" + splitUrl[splitUrl.length - 1];
        }
    }
})();