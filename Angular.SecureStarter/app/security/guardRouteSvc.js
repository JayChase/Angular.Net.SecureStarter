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
            return appStatusSvc.whenReady()
                ['finally'](function (requiredRoles) {
                    return authorize(requiredRoles);
                });
        }

        function authorize(requiredRoles) {
            var deferred = $q.defer(), path = $location.path();

            if (userSvc.info.signedIn) {
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
                notifierSvc.show({ message: "you need to sign in first"});                
                $location.path("/signIn");
                deferred.reject(false);
            }

            return deferred.promise;            
        }      
    }
})();