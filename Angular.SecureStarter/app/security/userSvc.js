(function () {
    'use strict';

    var serviceId = 'userSvc';

    angular.module('app.security')
        .factory(serviceId, ['$rootScope','$q','$window', 'storageSvc', 'accountClientSvc','appActivitySvc','notifierSvc','accountResource', userSvc]);

    //TODO: these user details need to go onto an object
    function userSvc($rootScope, $q, $window, storageSvc, accountClientSvc, appActivitySvc, notifierSvc, accountResource) {
        var service = {                                   
            signIn: signIn,
            signInExternal: signInExternal,
            signOut: signOut,            
            setUser: setUser,            
            addLocalLogin: addLocalLogin,
            removeLogin: removeLogin,
            setPassword: setPassword,
            changePassword: changePassword,
            getManageInfo: getManageInfo,
            getUserInfo: getUserInfo,
            getExternalLogin: getExternalLogin,
            getExternalLogins: getExternalLogins,
            addExternalLogin: addExternalLogin,
            registerExternal: registerExternal,
            register: register,
            checkUsernameAvailable: checkUsernameAvailable,
            checkEmailAvailable: checkEmailAvailable,
            info: {
                username: "",
                email: "",
                accessToken: "",
                roles: [],
                signedIn: false
            }
        };

        var activities = [];

        return service;

        function setUser(user) {
            if (user) {
                service.info.username = user.userName;
                service.info.email = user.email;
                service.info.signedIn = true;

                if (user.userRoles && angular.isArray(user.userRoles)) {
                    service.info.roles = user.userRoles.split(",");
                } else {
                    service.info.roles = [];
                }
            } else {
                service.info.username = "";                
                service.info.signedIn = false;
                service.info.roles = [];
            }

            raiseEvent();
        }

        function signIn(user,remember) {
            appActivitySvc.busy("userSvc");

            var args = {
                username: user.id,
                password: user.password,
                grant_type: "password"
            };

            args = $.param(args);

            return accountResource.login(args)
                                    .$promise
                                        .then(
                                            function (result) {                        
                                                setUser(result);
                                                storageSvc.store("accessToken", result.access_token, remember);

                                                return result;
                                            },
                                            function (result) {                                               
                                                notifierSvc.show({
                                                    message: createErrorString(result),
                                                    type: "error"
                                                });

                                                return $q.reject(result);
                                            })
                                            ['finally'](
                                                function () {
                                                    appActivitySvc.idle("userSvc");
                                                });
        }

        function signOut() {
            appActivitySvc.busy("userSvc");

            return accountResource.logout()
                                    .$promise
                                        ['finally'](
                                            function () {
                                                storageSvc.remove("accessToken");
                                                setUser();
                                                appActivitySvc.idle("userSvc");
                                            });
        }
     
        function setPassword(args) {
            appActivitySvc.busy("userSvc");

            return accountResource.setPassword(args)
                                    .$promise
                                    .then(
                                        function (result) {                      
                                            notifierSvc.show({ message: "your password has been set" });
                                            return result;
                                        },
                                        function (result) {                        
                                            notifierSvc.show({
                                                message: createErrorString(result),
                                                type: "error"
                                            });

                                            return $q.reject(result);
                                        })
                                    ['finally'](
                                        function () {
                                            appActivitySvc.idle("userSvc");
                                        });
        }

        function changePassword(args) {
            appActivitySvc.busy("userSvc");

            return accountResource.changePassword(args)
                                        .$promise
                                        .then(
                                            function (result) {
                                                notifierSvc.show({ message: "your password has been changed" });
                                                return result;
                                            },
                                            function (result) {
                                                notifierSvc.show({ message: createErrorString(result), type: "error" });
                                                return $q.reject(result);
                                            })
                                        ['finally'](
                                            function () {
                                                appActivitySvc.idle("userSvc");
                                            });
        }

        function removeLogin(data) {
            appActivitySvc.busy("userSvc");
     
            return accountResource.removeLogin(data)
                                    .$promise
                                    .then(
                                        null,
                                        function (result) {
                                            notifierSvc.show({
                                                message: createErrorString(result),
                                                type: "error"
                                            });
                                            return $q.reject(result);
                                        })
                                    ['finally'](
                                        function () {
                                            appActivitySvc.idle("userSvc");
                                        });
        }

        function getManageInfo(returnUrl, generateState) {
            appActivitySvc.busy("userSvc");

            if (!returnUrl) {
                returnUrl = "";
            }

            var returnUrl = encodeURIComponent(returnUrl);

            return accountResource.getManageInfo({returnUrl: "/externalauth/association", generateState: generateState})
                                        .$promise
                                        .then(
                                            null,
                                            function (result) {
                                                notifierSvc.show({
                                                    message: createErrorString(result),
                                                    type: "error"
                                                });
                                                return $q.reject(result);
                                            }
                                        )
                                        ['finally'](function () {
                                            appActivitySvc.idle("userSvc");
                                        });
        }

        function getUserInfo() {
            appActivitySvc.busy("userSvc");
            
            return accountResource.getUserInfo()
                                    .$promise
                                    .then(
                                        null,
                                        function (result) {
                                            notifierSvc.show({
                                                message: createErrorString(result),
                                                type: "error"
                                            });
                                            return $q.reject(result);
                                        }
                                    )['finally'](function () {
                                        appActivitySvc.idle("userSvc");
                                    });
        }

        function addLocalLogin(data) {            
            return setPassword(data);
        }

        //register a new user and if the registration is successful signIn
        function registerExternal(registration) {
            appActivitySvc.busy("userSvc");

            return accountResource.registerExternal(registration)
                                        .$promise
                                        ['finally'](function () {
                                            appActivitySvc.idle("userSvc");
                                        });
        }

        function register(registration,remember) {
            appActivitySvc.busy("userSvc");

            return accountResource.register(registration)
                                    .$promise
                                    .then(
                                        function (result) {
                                            setUser(result);
                                            storageSvc.store("accessToken", result.access_token, remember);

                                            return result;
                                        },
                                            function (result) {
                                                notifierSvc.show({
                                                    message: createErrorString(result),
                                                    type: "error"
                                                });

                                                return $q.reject(result);
                                            })
                                        ['finally'](
                                            function () {
                                                appActivitySvc.idle("userSvc");
                                        });
        }

        function signInExternal(provider) {
            appActivitySvc.busy("userSvc");
                      
            return accountResource.externalLogin({
                provider: provider,
                error: error
            }).$promise
                ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });            
        }

        function addExternalLogin(externalLogin) {
            appActivitySvc.busy("userSvc");

            return accountResource.addExternalLogin(externalLogin)
                                    .$promise
                                    .then(
                                        function (result) {
                                            $window.location.href = result.url;
                                        })
                                      ['finally'](
                                        function () {
                                            appActivitySvc.idle("userSvc");
                                        });
        }

        function checkEmailAvailable(modelValue, viewValue) {
            var dfd = $q.defer(), email = modelValue || viewValue;

            if (email) {
                dfd.promise = accountResource.checkEmailAvailable(email);
            } else {
                dfd.resolve();
            }

            return dfd.promise;
        }

        function checkUsernameAvailable(modelValue, viewValue) {
            var dfd = $q.defer(), username = modelValue || viewValue;

            if (username) {
                dfd.promise = accountResource.checkUsernameAvailable(username);
            } else {
                dfd.resolve();
            }

            return dfd.promise;
        }

        function raiseEvent() {
            $rootScope.$broadcast("userSvc:signedInChanged", { signedIn: service.info.signedIn });
        }

        function createErrorString(result) {
            if (typeof result === "string") {
                return result;
            } else {
                var errors = "";

                if (result.data && result.data.modelState) {
                    errors += $.PropertyValuesToString(result.data.modelState);
                } else if (result.data && result.data.error_description) {
                    errors += result.data.error_description;
                } else if (result.data && result.data.message) {
                    errors += result.data.message;
                } else if (result.error) {
                    errors += " " + result.error_description;
                }

                return errors;
            }
        }

        function getExternalLogin(provider, error) {
            return accountResource.externalLogin({                
                provider: provider,
                error: error
            }).$promise;
        }

        function getExternalLogins(returnUrl, provider, generateState) {
            var args = {
                returnUrl: returnUrl ? returnUrl : "",                
                generateState: generateState ? "true" : "false"
            };

            if (provider) {
                args.provider = provider;
            }

            return accountResource.externalLogins(args).$promise;
        }        

        function encodeUrlWithReturnUrl(url, returnUrl, generateState) {
            return url + (encodeURIComponent(returnUrl)) +
                "&generateState=" + (generateState ? "true" : "false");
        }
    }
})();