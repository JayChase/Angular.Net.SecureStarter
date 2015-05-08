(function () {
    'use strict';

    var serviceId = 'userService';

    angular.module('app.security')
        .factory(serviceId, ['$rootScope','$q','$window', 'siteUrl', 'utilityService','storageService','appActivityService','notifierService','accountResource', userService]);

    //TODO: these user details need to go onto an object
    function userService($rootScope, $q, $window, siteUrl, utilityService, storageService, appActivityService, notifierService, accountResource) {
        var service = {                                   
            signIn: signIn,            
            signOut: signOut,            
            setUser: setUser,            
            addLocalLogin: addLocalLogin,
            removeLogin: removeLogin,
            setPassword: setPassword,
            changePassword: changePassword,
            getManageInfo: getManageInfo,
            getUserInfo: getUserInfo,
            getExternalLogins: getExternalLogins,
            getExternalLogin: getExternalLogin,            
            addExternalLogin: addExternalLogin,
            registerExternal: registerExternal,
            signInExternal: signInExternal,
            register: register,
            checkUsernameAvailable: checkUsernameAvailable,
            checkEmailAvailable: checkEmailAvailable,
            authServer: accountResource.authServer,
            info: {
                username: "",
                email: "",
                accessToken: "",
                roles: [],
                signedIn: false
            }
        };
                
        return service;

        function setUser(user) {
            if (user) {
                service.info.username = user.userName;
                service.info.email = user.email;
                service.info.signedIn = true;

                if (user.userRoles) {
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

        //args: user {id: (email or username), password, remember}
        function signIn(user) {
            appActivityService.busy("userService");

            user = angular.extend(user, { grant_type: "password" });
            user.userName = user.id;

            var xsrf = $.param(user);

            return accountResource.login(xsrf)
                                    .$promise
                                        .then(
                                            function (result) {                                       
                                                setUser(result);
                                                storageService.store("accessToken", result.access_token, user.remember);
                                                notifierService.show({ message: "signed in as " + service.info.username, type: "info" });
                                                return result;
                                            },
                                            function(result) {                                               
                                                notifierService.show({
                                                    message: createErrorString(result),
                                                    type: "error"
                                                });

                                                return $q.reject(result);
                                            })
                                            .finally(
                                                function() {
                                                    appActivityService.idle("userService");
                                                });
        }

        function signOut() {
            appActivityService.busy("userService");

            return accountResource.logout()
                                    .$promise
                                    .finally(
                                        function () {
                                            storageService.remove("accessToken");
                                            setUser();
                                            appActivityService.idle("userService");
                                        });
        }
     
        //args: {newPassword, confirmPassword}
        function setPassword(args) {
            appActivityService.busy("userService");

            return accountResource.setPassword(args)
                                    .$promise
                                    .then(
                                        function(result) {                      
                                            notifierService.show({ message: "your password has been set" });
                                            return result;
                                        },
                                        function(result) {                        
                                            notifierService.show({
                                                message: createErrorString(result),
                                                type: "error"
                                            });

                                            return $q.reject(result);
                                        })
                                    .finally(
                                        function() {
                                            appActivityService.idle("userService");
                                        });
        }

        //args: {oldPassword, newPassword, confirmPassword}
        function changePassword(args) {
            appActivityService.busy("userService");

            return accountResource.changePassword(args)
                                        .$promise
                                        .then(
                                            function(result) {
                                                notifierService.show({ message: "your password has been changed" });
                                                return result;
                                            },
                                            function(result) {
                                                notifierService.show({ message: createErrorString(result), type: "error" });
                                                return $q.reject(result);
                                            })
                                        .finally(
                                            function() {
                                                appActivityService.idle("userService");
                                            });
        }

        function removeLogin(data) {
            appActivityService.busy("userService");
     
            return accountResource.removeLogin(data)
                                    .$promise
                                    .then(
                                        null,
                                        function(result) {
                                            notifierService.show({
                                                message: createErrorString(result),
                                                type: "error"
                                            });
                                            return $q.reject(result);
                                        })
                                    .finally(
                                        function() {
                                            appActivityService.idle("userService");
                                        });
        }

        function getManageInfo(returnUrl, generateState) {
            appActivityService.busy("userService");
                        
            return accountResource.getManageInfo({returnUrl: returnUrl, generateState: generateState})
                                        .$promise
                                        .then(
                                            null,
                                            function (result) {
                                                notifierService.show({
                                                    message: createErrorString(result),
                                                    type: "error"
                                                });
                                                return $q.reject(result);
                                            }
                                        )
                                        .finally(
                                            function () {
                                                appActivityService.idle("userService");
                                            });
        }

        function getUserInfo() {
            appActivityService.busy("userService");
            
            return accountResource.getUserInfo()
                                    .$promise
                                    .then(
                                        null,
                                        function (result) {
                                            notifierService.show({
                                                message: createErrorString(result),
                                                type: "error"
                                            });
                                            return $q.reject(result);
                                        }
                                    )
                                    .finally(
                                        function () {
                                            appActivityService.idle("userService");
                                        });
        }

        function addLocalLogin(data) {            
            return setPassword(data);
        }
        
        function registerExternal(registration) {
            appActivityService.busy("userService");

            return accountResource.registerExternal(registration)
                                        .$promise
                                        .then(function(result) {
                                            notifierService.show({ message: "registered successfully as " + result.username, type: "info" });
                                            return result;
                                        },
                                        function(result) {                                               
                                            notifierService.show({
                                                message: createErrorString(result),
                                                type: "error"
                                            });

                                            return $q.reject(result);
                                        })
                                        .finally(function() {
                                            appActivityService.idle("userService");
                                        });
        }

        function register(registration,remember) {
            appActivityService.busy("userService");

            return accountResource.register(registration)
                                    .$promise
                                    .then(
                                        function(result) {
                                            setUser(result);
                                            storageService.store("accessToken", result.access_token, remember);

                                            return result;
                                        },
                                            function(result) {
                                                notifierService.show({
                                                    message: createErrorString(result),
                                                    type: "error"
                                                });

                                                return $q.reject(result);
                                            })
                                        .finally(
                                            function() {
                                                appActivityService.idle("userService");
                                        });
        }

        function signInExternal(provider) {
            appActivityService.busy("userService");

            return service.getExternalLogin({
                provider: provider,
                returnUrl: siteUrl + "externalauth/signin"
                })
                .finally(
                    function() {
                        appActivityService.idle("userService");
                    });
        }

        function addExternalLogin(externalLogin) {
            appActivityService.busy("userService");

            return accountResource.addExternalLogin(externalLogin)
                                    .$promise
                                    .then(
                                        function(result) {
                                            $window.location.href = result.url;
                                        })
                                      .finally(
                                        function() {
                                            appActivityService.idle("userService");
                                        });
        }

        function getExternalLogin(options) {
            appActivityService.busy("userService");

            var args = {
                returnUrl: options.returnUrl ? options.returnUrl : "",
                generateState: (options.generateState ? "true" : "false"),
                provider:options.provider
            };
            
            return accountResource.getExternalLogin(args)
                                            .$promise
                                            .then(null,
                                                function(result) {
                                                    notifierService.show({
                                                        message: "error retrieving external logins. " + createErrorString(result),
                                                        type: "error"
                                                    });

                                                    return $q.reject(result);
                                                })
                                                .finally(
                                                    function () {
                                                        appActivityService.idle("userService");
                                                    });
        }

        function getExternalLogins(options) {
            appActivityService.busy("userService");
                        
            var args = {
                returnUrl: options.returnUrl ? options.returnUrl : "",
                generateState: (options.generateState ? "true" : "false")
            };

            if (options.provider) {
                args.provider = options.provider;
            }

            return accountResource.getExternalLogins(args)
                                            .$promise
                                            .then(null,
                                                function(result) {
                                                    notifierService.show({
                                                        message: "error retrieving external logins. " + createErrorString(result),
                                                        type: "error"
                                                    });

                                                    return $q.reject(result);
                                                })
                                                .finally(
                                                    function() {
                                                        appActivityService.idle("userService");
                                                    });
        }

        function checkEmailAvailable(email) {            
            if (email) {
                return $q(function (resolve, reject) {
                    accountResource.checkEmailAvailable({ email: email })
                                            .$promise
                                            .then(function (result) {
                                                if (result.available) {
                                                    resolve(result);
                                                } else {
                                                    reject(result);
                                                }
                                            },
                                            function (result) {
                                                resolve("unexpected error");
                                            });
                });                
            } else {
                return $q(function (resolve, reject) {             
                    resolve();
                });
            }
        }

        function checkUsernameAvailable(username) {            
            if (username) {
                return $q(function (resolve, reject) {
                    accountResource.checkUsernameAvailable({ username: username })
                                            .$promise
                                            .then(function (result) {
                                                if (result.available) {
                                                    resolve(result);
                                                } else {
                                                    reject(result);
                                                }
                                            },
                                            function (result) {
                                                resolve("unexpected error");
                                            });
                });                
            } else {
                return $q(function (resolve, reject) {
                    resolve();
                });
            }
        }

        function raiseEvent() {
            $rootScope.$broadcast("userService:signedInChanged", { signedIn: service.info.signedIn });
        }

        function createErrorString(result) {
            if (typeof result === "string") {
                return result;
            } else {
                var errors = "";

                if (result.data && result.data.modelState) {
                    errors += utilityService.PropertyValuesToString(result.data.modelState);
                } else if (result.data && result.data.error_description) {
                    errors += result.data.error_description;
                } else if (result.data && result.data.message) {
                    errors += result.data.message;
                } else if (result.error) {
                    errors += " " + result.error;
                } else if (result.statusText) {
                    errors += " " + result.statusText;
                }

                if (!errors) {
                    errors = "something went wrong";
                }

                return errors;
            }
        }
     
        function encodeUrlWithReturnUrl(url, returnUrl, generateState) {
            return url + (encodeURIComponent(returnUrl)) +
                "&generateState=" + (generateState ? "true" : "false");
        }
    }
})();