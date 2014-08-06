(function () {
    'use strict';

    var serviceId = 'userSvc';

    angular.module('app.security')
        .factory(serviceId, ['$rootScope','$q','$window', 'storageSvc', 'accountClientSvc','appActivitySvc','notifierSvc', userSvc]);

    //TODO: these user details need to go onto an object
    function userSvc($rootScope, $q, $window, storageSvc, accountClientSvc, appActivitySvc, notifierSvc) {
        var service = {                       
            signedIn: false,
            signIn: signIn,
            signInExternal: signInExternal,
            signOut: signOut,
            username: "",
            email: "",
            accessToken: "",
            roles: [],
            setUser: setUser,
            addLogin: addLogin,
            addLocalLogin: addLocalLogin,
            removeLogin: removeLogin,
            changePassword: changePassword,
            setPassword: setPassword,
            getManageInfo: getManageInfo,
            getUserInfo: getUserInfo,
            addExternalLogin: addExternalLogin,
            registerExternal: registerExternal,
            register: register
        };

        var activities = [];

        return service;

        function setUser(user) {
            if (user) {
                service.username = user.userName;
                service.email = user.email;
                service.signedIn = true;
                service.roles = user.userRoles.split(",");
            } else {
                service.username = "";                
                service.signedIn = false;
                service.roles = [];
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
            accountClientSvc.logout().then(
				function (result) {
				    //success
				    always(result);
				},
				function (result) {
				    //error										
				    always(result);
				});

            function always(result) {
                storageSvc.remove("accessToken");
                setUser();
            };
            
        }

        //returns a promise
        function changePassword(args) {
            appActivitySvc.busy("userSvc");

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
                appActivitySvc.idle("userSvc");
            }
        }

        //returns a promise
        function setPassword(args) {
            appActivitySvc.busy("userSvc");

            var deferred = $q.defer();

            accountClientSvc.setPassword(args)
                .then(
                    function (result) {
                        notifierSvc.show({ message: "your password has been set" });
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
                appActivitySvc.idle("userSvc");
            }
        }

        function addLogin() {

        }

        function removeLogin(data) {
            appActivitySvc.busy("userSvc");
     
            return accountClientSvc.removeLogin(data)
                .then(
                    null,
                    function (result) {
                        notifierSvc.show({ message: result.error, type: "error" });                        
                        return $q.reject(result);
                    }
                );
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
            appActivitySvc.busy("userSvc");

            return accountClientSvc.setPassword(data)
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

        //register a new user and if the registration is successful signIn
        function registerExternal(registration) {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.registerExternal(registration)
                    ['finally'](function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function register(registration) {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.register(registration)
                .then(
                    function (result) {
                        setUser(result);
                        storageSvc.store("accessToken", result.access_token, remember);

                        return result;
                    })
                ['finally'](
                    function () {
                        appActivitySvc.idle("userSvc");
                    });
        }

        function signInExternal(provider) {
            appActivitySvc.busy("userSvc");
            
            //TODO: return url needs to be a constant somewhere too
            return accountClientSvc.getExternalLogin("/externalauth",provider).then(
				function (result) {
				    //success
				    $window.location.href = result.url;
				},
				function (result) {
				    //error
				    appActivitySvc.idle("userSvc");
				    return result;
				}
			);
            
        }

        function addExternalLogin(externalLogin) {
            appActivitySvc.busy("userSvc");

            return accountClientSvc.addExternalLogin(externalLogin)
              .then(
                  function (result) {                  
                      always(result);
                      return result;
                  },
                  function (result) {                      
                      always(result);
                      return $q.reject();
                  }
              );
            
            function always(result) {
                appActivitySvc.idle("userSvc");
            }
        }

        function raiseEvent() {
            $rootScope.$broadcast("userSvc:signedInChanged", { signedIn: service.signedIn });
        }
    }
})();