(function () {
    'use strict';

    var serviceId = 'guardRouteSvc';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(serviceId, ['$route','$location','$q', 'userSvc','notifierSvc','appStatusSvc', guardRouteSvc]);

    function guardRouteSvc($route, $location, $q, userSvc, notifierSvc, appStatusSvc) {
        var service = {
            guard: guard,
            authorize: authorize
        };

        return service;

        function guard(requiredRoles) {
            return appStatusSvc.whenReady().finally(function (requiredRoles) {
                return authorize(requiredRoles);
            });
        }

        function authorize(requiredRoles) {
            var deferred = $q.defer(), path = $location.path();

            if (userSvc.signedIn) {
                if (requiredRoles && requiredRoles.length > 0) {
                    if ($.arrayIntersect(requireRoles, userSvc.roles).length > 0) {
                        deferred.resolve(true);
                    } else {
                        notifierSvc.show({ message: "you do not have the required permissions to few this page." });
                        $location.path("/");
                        deferred.reject(false);
                    }
                } else {
                    deferred.resolve(true);
                }                
            } else {
                notifierSvc.show({ message: "You need to sign in first."});                
                $location.path("/signIn");
                deferred.reject(false);
            }

            return deferred.promise;            
        }

        function guardOld(event) {

            var path = $location.path();

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
    }
})();