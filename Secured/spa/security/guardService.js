(function () {
    'use strict';

    angular
        .module('app.security')
        .provider('guardService', function guardServiceProvider() {
            var siginInUrl = "/signIn", siginInUrlIsExternal = false;

            //options {url, urlIsExternal}
            this.setSiginInUrl = function (options) {
                siginInUrlIsExternal = options.urlIsExternal;
                siginInUrl = options.url;

                if (siginInUrl.length > 0 && siginInUrl.substring(siginInUrl.length - 1) === '/') {
                    siginInUrl = siginInUrl.substring(0, siginInUrl.length - 1);
                }
            };

            this.$get = ['$location', '$window', '$q', 'utilityService', 'userService', 'notifierService', 'appStatusService',
            function accountResourceFactory($location, $window, $q, utilityService, userService, notifierService, appStatusService) {
                    var service = {
                        guardRoute: guardRoute,
                        authorized: authorized,
                        redirectToSignIn: redirectToSignIn
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
                                                        redirectToSignIn();
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
                                if (utilityService.arrayIntersect(requiredRoles, userService.roles).length > 0) {
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

                    function redirectToSignIn() {
                        if (siginInUrlIsExternal) {
                            $window.location.href = siginInUrl;
                        } else {
                            $location.path(siginInUrl);
                        }
                    }
                }];
        });
})();