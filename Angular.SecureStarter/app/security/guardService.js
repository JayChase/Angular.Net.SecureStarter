﻿(function () {
    'use strict';

    var serviceId = 'guardService';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(serviceId, ['$route', '$location', '$q', 'userService', 'notifierService', 'appStatusService', guardService]);

    function guardService($route, $location, $q, userService, notifierService, appStatusService) {
        var service = {
            guardRoute: guardRoute,
            authorized: authorized
        };

        return service;

        function guardRoute(requiredRoles) {
            return appStatusService
                            .whenReady()
                            .finally(
                                function (requiredRoles) {
                                    var authResult = authorize(requiredRoles);

                                    return $q(function (resolve, reject) {
                                        if (authResult.authorized) {
                                            resolve(authResult.authorized);
                                        } else {
                                            notifierService.show({ message: authResult.message, info: 'error' });
                                            $location.path("/signIn");
                                            reject(authResult.authorized);
                                        }
                                    });
                                });
        }

        function authorized(requiredRoles) {
            return authorize(requiredRoles).authorized;
        }

        function authorize(requiredRoles) {
            if (userService.info.signedIn) {
                if (requiredRoles && requiredRoles.length > 0) {
                    if ($.arrayIntersect(requiredRoles, userService.info.roles).length > 0) {
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