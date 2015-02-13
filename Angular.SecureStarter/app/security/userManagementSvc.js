(function () {
    'use strict';

    var serviceId = 'userManagementSvc';

    angular.module('app.security')
        .factory(serviceId, ['$q','$window','userSvc','appActivitySvc','notifierSvc', userManagementSvc]);

    function userManagementSvc($q, $window, userSvc, appActivitySvc, notifierSvc) {
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
            appActivitySvc.busy("userManagementSvc");

            return userSvc.getManageInfo("/externalauth/association", false)
                .then(
                    function (result) {
                        service.userLogins.length = 0;
                        service.loginProviders.length = 0;

                        if (result.data) {
                            service.localLoginProvider = result.data.localLoginProvider;
                        }

                        result.data.logins.forEach(function (l) {
                            service.userLogins.push(l)
                        });

                        result.data.externalLoginProviders.forEach(function (lp) {
                            service.loginProviders.push(lp);
                        });

                        return result;
                    },
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });
                        $q.reject(result);
                })
                ['finally'](
                    function () {
                        updateInfo();
                        appActivitySvc.idle("userManagementSvc");
                    });

            return deferred.promise;
        }

        //returns a promise
        function changePassword(args) {
            return userSvc.changePassword(args);
        }

        //returns a promise
        function addLocalLogin(externalLogin) {            
            return userSvc.addLocalLogin(externalLogin)
                .then(
                    function (result) {
                        notifierSvc.show({ message: "your password has been set" });
                        service.userLogins.push({ loginProvider: service.localLoginProvider, providerKey: userSvc.info.username })
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
            $window.location.href = provider.url;
        }

        function removeLogin(userLogin) {
            appActivitySvc.busy("userManagementSvc");

            return userSvc.removeLogin(userLogin)
                .then(
                    function (result) {
                        var i = $.arrayIndexOf(service.userLogins, function (ul) {
                            return ul.loginProvider === userLogin.loginProvider;
                        });

                        if (i !== -1) {
                            service.userLogins.splice(i, 1);
                        }

                        if (userLogin.loginProvider === service.localLoginProvider) {
                            service.info.hasLocalLogin = false;
                        }

                        notifierSvc.show({ message: userLogin.loginProvider + " login removed.", type: "info" });
                        
                        return result;
                    },
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });
                        
                        return $q.reject(result);
                    }
                )
                ['finally'](
                    function () {                        
                        appActivitySvc.idle("userManagementSvc");
                    });
        }

        function updateInfo() {
            service.info.hasLocalLogin = $.arrayContains(service.userLogins, function (lp) {
                return lp.loginProvider === service.localLoginProvider;
            });

            service.info.moreLoginsAvailable = service.userLogins.length < service.loginProviders.length;
        }
    }
})();