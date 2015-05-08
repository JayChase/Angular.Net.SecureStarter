(function () {
    'use strict';

    var serviceId = 'userManagementService';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(serviceId, ['$q','$window', 'siteUrl', 'userService','utilityService', 'appActivityService','notifierService', userManagementService]);

    function userManagementService($q, $window, siteUrl, userService, utilityService, appActivityService, notifierService) {
        var loaded = false;

        var service = {
            load: load,
            loginProviders: [],
            userLogins: [],
            localLoginProvider: "",
            info:{
                hasLocalLogin: false,
                moreLoginsAvailable: false
            },
            addLogin: addLogin,
            removeLogin: removeLogin,
            changePassword: changePassword,
            addLocalLogin: addLocalLogin
        };

        return service;

        function load() {
            appActivityService.busy("userManagementService");

            return userService.getManageInfo(siteUrl + "/externalauth/association", false)
                .then(
                    function (result) {
                        service.userLogins.length = 0;
                        service.loginProviders.length = 0;

                        if (result) {
                            service.localLoginProvider = result.localLoginProvider;
                        }

                        result.logins.forEach(function (l) {
                            service.userLogins.push(l)
                        });

                        result.externalLoginProviders.forEach(function (lp) {
                            service.loginProviders.push(lp);
                        });

                        return result;
                    },
                    function (result) {
                        notifierService.show({ message: result.error, type: "error" });
                        $q.reject(result);
                })
                .finally(
                    function () {
                        updateInfo();
                        appActivityService.idle("userManagementService");
                    });

            return deferred.promise;
        }

        //returns a promise
        function changePassword(args) {
            return userService.changePassword(args);
        }

        //returns a promise
        function addLocalLogin(externalLogin) {            
            return userService.addLocalLogin(externalLogin)
                .then(
                    function (result) {
                        notifierService.show({ message: "your password has been set" });
                        service.userLogins.push({ loginProvider: service.localLoginProvider, providerKey: userService.info.username })
                        service.info.hasLocalLogin = true;

                        return result;
                    },
                    function (result) {
                        service.info.hasLocalLogin = false;

                        return $q.reject(result);
                    }
                );
        }

        function addLogin(provider) {
            $window.location.href = userService.authServer + provider.url;
        }

        function removeLogin(userLogin) {
            appActivityService.busy("userManagementService");

            return userService.removeLogin(userLogin)
                .then(
                    function (result) {
                        var i = utilityService.arrayIndexOf(service.userLogins, function (ul) {
                            return ul.loginProvider === userLogin.loginProvider;
                        });

                        if (i !== -1) {
                            service.userLogins.splice(i, 1);
                        }

                        if (userLogin.loginProvider === service.localLoginProvider) {
                            service.info.hasLocalLogin = false;
                        }

                        notifierService.show({ message: userLogin.loginProvider + " login removed.", type: "info" });
                        
                        return result;
                    },
                    function (result) {
                        notifierService.show({ message: result.error, type: "error" });
                        
                        return $q.reject(result);
                    }
                )
                .finally(
                    function () {                        
                        appActivityService.idle("userManagementService");
                    });
        }

        function updateInfo() {
            service.info.hasLocalLogin = utilityService.arrayContains(service.userLogins, function (lp) {
                return lp.loginProvider === service.localLoginProvider;
            });

            service.info.moreLoginsAvailable = service.userLogins.length < service.loginProviders.length;
        }
    }
})();