(function () {
    'use strict';

    var serviceId = 'externalAuthService';

    angular.module('app.security')
        .factory(serviceId, ['$location', '$q', 'storageService', 'appActivityService', 'notifierService','userService', externalAuthService]);

    function externalAuthService($location, $q, storageService, appActivityService, notifierService, userService) {
        var registrationInfo, associationInfo;

        var service = {
            handleAuthResponse: handleAuthResponse,
            getRegistrationInfo: getRegistrationInfo,
            getAssociationInfo: getAssociationInfo
        };

        return service;

        function handleAuthResponse() {
            appActivityService.busy("externalAuthService");

            var locationPath = $location.path(), redirectPath = "/", deferred = $q.defer();

            if (locationPath && locationPath.indexOf("/externalauth") === 0) {
               
                var externalActionResult = parseResponse($location.hash());

                cleanUp();

                if (!externalActionResult || !externalActionResult.access_token) {
                    notifierService.show({ message: "something went wrong. Error: rereiving access token", type: "error" });
                    appActivityService.idle("externalAuthService");                    
                    $location.path("/signIn").hash('');
                    deferred.resolve(true);

                } else if (externalActionResult.error) {
                    notifierService.show({ message: "something went wrong. Error: " + externalActionResult.error, type: "error" });
                    appActivityService.idle("externalAuthService");
                    $location.path("/signIn").hash('');
                    deferred.resolve(true);
                } else {

                    if (locationPath === "/externalauth/signin") {
                        storageService.store("accessToken", externalActionResult.access_token, true);
                    } else if (locationPath === "/externalauth/register") {
                        storageService.store("accessToken", externalActionResult.access_token, true);
                        registrationInfo = externalActionResult;
                    } else if (locationPath === "/externalauth/association") {
                        associationInfo = { externalAccessToken: externalActionResult.access_token };
                        redirectPath = "/manage";
                    }

                    userService.getUserInfo()
                        .then(
				            function (result) {
				                if (result.hasRegistered) {
				                    userService.setUser(result);

				                    if (associationInfo) {
				                        associateLogin();
				                    } else {				                        
				                        $location.path(redirectPath).hash('');
				                    }
				                } else {
				                    registrationInfo = {
				                        email: result.email,
				                        loginProvider: result.loginProvider,
				                        username: result.userName
				                    };
				                    
				                    $location.path("/externalRegister").hash('');
				                }

				                deferred.resolve(true);
				            },
				            function (result) {
				                //error	
				                notifierService.show({ message: "something went wrong. " + result.error, type: "error" });
				                
				                $location.path("/signIn").hash('');

				                deferred.reject(true);
				            })
                        .finally(
                            function () {
                                appActivityService.idle("externalAuthService");
                            });
                }
            } else {
                deferred.reject(false);
                appActivityService.idle("externalAuthService");
            }
            
            return deferred.promise;
        }

        function associateLogin() {
            userService.addExternalLogin(associationInfo)
                .then(
				    function (result) {
				        //success
				        notifierService.show({ message: "login added successfully", type: "info" });
				        return result;
				    },
				    function (result) {
				        //error
				        notifierService.show({ message: "something went wrong associating login", type: "error" });
				        return $q.reject(result);
				    })
                .finally(
                    function always() {
                        appActivityService.idle("externalAuthService");
                        $location.path("/manage");
                    });
        }

        function cleanUp() {            
            storageService.remove("registrationInfo");            
        }

        function getRegistrationInfo() {  
            return registrationInfo;
        }

        function getAssociationInfo() {
            return associationInfo;
        }

        function parseResponse(response){            
            var result = {};

            var urlParts = response.split("&");                       

            urlParts.forEach(function (item) {
                var splitItem = item.split("=");
                result[splitItem[0]] = decodeURIComponent(splitItem[1]);
            });
            
            return result;
        }
    }
})();