(function () {
    'use strict';

    var serviceId = 'userManagementSvc';

    // TODO: replace app with your module name
    angular.module('app')
        .factory(serviceId, ['$q','$window','userSvc','accountClientSvc','appActivitySvc','notifierSvc', userManagementSvc]);

    function userManagementSvc($q, $window, userSvc, accountClientSvc, appActivitySvc, notifierSvc) {
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

            var deferred = $q.defer();

            return accountClientSvc.getManageInfo("/externalauth/association", false)
                .then(
                function (result) {
                    service.userLogins.length = 0;
                    service.loginProviders.length = 0;

                    service.localLoginProvider = result.localLoginProvider;

                    result.logins.forEach(function (l) {
                        service.userLogins.push(l)
                    });

                    result.externalLoginProviders.forEach(function (lp) {
                        service.loginProviders.push(lp);
                    });

                    deferred.resolve(result);
                },
                function (result) {
                    notifierSvc.show({ message: result.error, type: "error" });
                    always(result);
                    deferred.reject(result);
                })
                ['finally'](function () {
                    updateInfo();
                    appActivitySvc.idle("userManagementSvc");
                });

            return deferred.promise;
        }

        //returns a promise
        function changePassword(args) {
            appActivitySvc.busy("userManagementSvc");

            var deferred = $q.defer();

            accountClientSvc.setPassword(args)
                .then(
                    function (result) {
                        notifierSvc.show({ message: "your password has been changed" });
                        always(result);
                        deferred.resolve();
                    },
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });
                        always(result);
                        deferred.reject();
                    }
                );

            return deferred.promise;

            function always(result) {
                appActivitySvc.idle("userManagementSvc");
            }
        }

        //returns a promise
        function addLocalLogin(externalLogin) {   
            return userSvc.addLocalLogin(externalLogin)
                .then(
                    function (result) {
                        notifierSvc.show({ message: "your password has been set" });
                        service.userLogins.push({ loginProvider: service.localLoginProvider, providerKey: userSvc.username })
                        service.info.hasLocalLogin = true;                        
                        return result;
                    },
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });
                        service.info.hasLocalLogin = false;
                        always(result);
                        return $q.reject();
                    }
                );            
        }

        function addLogin(provider) {
            $window.location.href = provider.url;
        }

        function removeLogin(userLogin) {
            appActivitySvc.busy("userManagementSvc");

            var deferred = $q.defer();

            accountClientSvc.removeLogin(userLogin)
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
                        always(result);
                        deferred.resolve();
                    },
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });
                        always(result);
                        deferred.reject();
                    }
                );

            return deferred.promise;

            function always(result) {
                appActivitySvc.idle("userManagementSvc");
            }
        }

        function updateInfo() {
            service.info.hasLocalLogin = $.arrayContains(service.userLogins, function (lp) {
                return lp.loginProvider === service.localLoginProvider;
            });

            service.moreLoginsAvailable = service.userLogins.length < service.loginProviders.length;
        }
    }
})();