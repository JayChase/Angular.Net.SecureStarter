﻿(function () {
    'use strict';

    var serviceId = 'guardSvc';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(serviceId, ['$route', '$location', '$q', 'userSvc', 'notifierSvc', 'appStatusSvc', guardSvc]);

    function guardSvc($route, $location, $q, userSvc, notifierSvc, appStatusSvc) {
        var service = {
            guardRoute: guardRoute,
            authorized: authorized
        };

        return service;

        function guardRoute(requiredRoles) {
            return appStatusSvc.whenReady()
                ['finally'](function (requiredRoles) {
                    var deferred = $q.defer(), authResult = authorize(requiredRoles);

                    if (authResult.authorized) {
                        return deferred.resolve(authResult.authorized);
                    } else {
                        notifierSvc.show({ message: authResult.message, info: 'error' });
                        $location.path("/signIn");
                        return $q.reject(authResult.authorized);
                    }
                });
        }

        function authorized(requiredRoles) {
            return authorize(requiredRoles).authorized;
        }

        function authorize(requiredRoles) {
            if (userSvc.info.signedIn) {
                if (requiredRoles && requiredRoles.length > 0) {
                    if ($.arrayIntersect(requiredRoles, userSvc.roles).length > 0) {
                        return {
                            authorized: true,
                            message: ""
                        };
                    } else {
                        return {
                            authorized: false,
                            message: "you do not have the required permissions to view this page."
                        };
                    }
                } else {
                    return {
                        authorized: true,
                        message: ""
                    };
                }
            } else {
                return {
                    authorized: false,
                    message: "you need to sign in first."
                };
            }
        }
    }
})();