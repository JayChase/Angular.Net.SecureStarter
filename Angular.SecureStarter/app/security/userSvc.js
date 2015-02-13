(function () {
    'use strict';

    var serviceId = 'userSvc';

    angular.module('app.security')
        .factory(serviceId, ['$rootScope','$q','$window', 'storageSvc', 'accountClientSvc','appActivitySvc','notifierSvc', userSvc]);
    
    function userSvc($rootScope, $q, $window, storageSvc, accountClientSvc, appActivitySvc, notifierSvc) {
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

        function signIn(user,remember) {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.login(user)
                .then(
                    function (result) {                        
                        setUser(result.data);
                        storageSvc.store("accessToken", result.data.access_token, remember);

                        return result;
                    })
                ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function signOut() {
            appActivitySvc.busy("userSvc");

            accountClientSvc.logout()
                ['finally'](
                    function () {
                        storageSvc.remove("accessToken");
                        setUser();
                        appActivitySvc.idle("userSvc");
                    });
        }
     
        function setPassword(args) {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.setPassword(args)
                .then(
                    function (result) {                      
                        notifierSvc.show({ message: "your password has been set" });
                        return result;
                    },
                    function (result) {                        
                        notifierSvc.show({ message: result.error, type: "error" });
                        return $q.reject(result);
                    })
                ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function changePassword(args) {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.changePassword(args)
                .then(
                    function (result) {
                        notifierSvc.show({ message: "your password has been changed" });
                        return result;
                    },
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });
                        return $q.reject(result);
                    })
                ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function removeLogin(data) {
            appActivitySvc.busy("userSvc");
     
            return accountClientSvc.removeLogin(data)
                .then(
                    null,
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });                        
                        return $q.reject(result);
                    })
                ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function getManageInfo() {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.getManageInfo("/externalauth/association")
                    .then(
                        null,
                        function (result) {
                            notifierSvc.show({ message: result.error, type: "error" });
                            return $q.reject(result);
                        }
                    )
                    ['finally'](function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function getUserInfo() {
            appActivitySvc.busy("userSvc");
            
            return accountClientSvc.getUserInfo()
                .then(
                    null,
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });
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

            return accountClientSvc.registerExternal(registration)
                    ['finally'](function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function register(registration,remember) {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.register(registration)
                .then(
                    function (result) {
                        setUser(result.data);
                        storageSvc.store("accessToken", result.data.access_token, remember);

                        return result;
                    })
                ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function signInExternal(provider) {
            appActivitySvc.busy("userSvc");
                        
            return accountClientSvc.getExternalLogin("/externalauth/signin", provider)
                ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });            
        }

        function addExternalLogin(externalLogin) {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.addExternalLogin(externalLogin)
                .then(
                    function (result) {
                        $window.location.href = result.data.url;
                    })
                  ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function checkEmailAvailable(modelValue, viewValue) {
            var dfd = $q.defer(), email = modelValue || viewValue;

            if (email) {
                dfd.promise = accountClientSvc.checkEmailAvailable(email);
            } else {
                dfd.resolve();
            }

            return dfd.promise;
        }

        function checkUsernameAvailable(modelValue, viewValue) {
            var dfd = $q.defer(), username = modelValue || viewValue;

            if (username) {
                dfd.promise = accountClientSvc.checkUsernameAvailable(username);
            } else {
                dfd.resolve();
            }

            return dfd.promise;
        }

        function raiseEvent() {
            $rootScope.$broadcast("userSvc:signedInChanged", { signedIn: service.info.signedIn });
        }
    }
})();