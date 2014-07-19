(function () {
    'use strict';

    var serviceId = 'accountClientSvc';

    // TODO: replace app with your module name
    angular.module('app')
        .factory(serviceId, ['$http','$q','$window', accountClientSvc]);

    function accountClientSvc($http,$q,$window) {
        // Routes
        //TODO: the base url is NOT working. it needs to get a base url only id there is one and not add the current page name as the base. This is happpening because fo the change away from #
        //TODO move this stuff to constants on the app.security module
        var baseUrl = "/",
        addExternalLoginUrl = baseUrl + "api/Account/AddExternalLogin",
        changePasswordUrl = baseUrl + "api/Account/changePassword",
        loginUrl = baseUrl + "token",
        logoutUrl = baseUrl + "api/Account/Logout",
        registerUrl = baseUrl + "api/Account/Register",
        registerExternalUrl = baseUrl + "api/Account/RegisterExternal",
        removeLoginUrl = baseUrl + "api/Account/RemoveLogin",
        setPasswordUrl = baseUrl + "api/Account/setPassword",
        authorizeUrl = baseUrl + "api/Account/Authorize",
        siteUrl = $window.location.origin,
        manageInfoUrl = baseUrl + "api/Account/ManageInfo?returnUrl=",
        userInfoUrl = baseUrl + "api/Account/UserInfo";

        function createErrorString(result) {

            if (typeof result === "string") {
                return result;
            } else {
                var errors = "";

                if (result.data && result.data.modelState) {
                    errors += $.PropertyValuesToString(result.data.modelState);
                } else if (result.error) {
                    errors += " " + result.error_description;
                }

                return errors;
            }
        }

        function encodeUrlWithReturnUrl(url, returnUrl, generateState) {
            return baseUrl + "api/Account/ManageInfo?returnUrl=" + (encodeURIComponent(returnUrl)) +
                "&generateState=" + (generateState ? "true" : "false");
        }

        var service = {
            register: register,
            login: login,
            logout: logout,
            setPassword: setPassword,
            changePassword: changePassword,
            authorize: authorize,
            getExternalLogins: getExternalLogins,
            getExternalLogin: getExternalLogin,
            addExternalLogin: addExternalLogin,
            getUserInfo: getUserInfo,
            registerExternal: registerExternal,
            getManageInfo: getManageInfo,
            removeLogin: removeLogin            
        };

        return service;

        function addExternalLogin(data) {            
            return $http({
                method: 'POST',
                url: addExternalLoginUrl,
                data: data
            }).then(
				function (result) {
				    return { result: "success" };
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "Add external login failed. " + createErrorString(result)
				    });
				}
			);       
        }

        function removeLogin(data) {            
            return $http({
                method: 'POST',
                url: removeLoginUrl,
                data: data
            }).then(
				function (result) {
				    return { result: "success" };
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "Remove login failed. " + createErrorString(result)
				    });
				}
			);             
        }
        
        //user{userName, password, confirmPassword, email}
        function register(user) {   
            user.grant_type = "password";

            return $http({
                method: 'POST',
                url: registerUrl,
                data: user
            }).then(
				function (result) {
				    return { result: "success" };
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "registration failed with the error(s): " + createErrorString(result)
				    });
				}
			);            
        }

        //user{userName, password, confirmPassword, email}
        function registerExternal(user) {            
            user.grant_type = "password";

            return $http({
                method: 'POST',
                url: registerExternalUrl,
                data: user
            }).then(
				function (result) {
				    return { result: "success" };
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "registration failed with the error(s): " + createErrorString(result)
				    });
				}
			);                           
        }

        //user{id,password, rememberMe}
        function login(user) {            
            var args = {
                username: user.id,
                password: user.password,
                grant_type: "password"
            };

            var xsrf = $.param(args);

            return $http({
                method: 'POST',
                url: loginUrl,
                data: xsrf,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(
				function (result) {
				    return result.data;
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "login failed. " + createErrorString(result)
				    });
				}
			);               
        }        

        function logout() {
            return $http({
                method: 'POST',
                url: logoutUrl
            }).then(
				function (result) {
				    return { result: "success" };
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "logout failed. " + createErrorString(result)
				    });
				}
			);                          
        }

        //roles ["rolename"] roles required.        
        function authorize(roles) {     
            return $http({
                method: 'GET',
                url: authorizeUrl,
                params: { roles: roles }                
            }).then(
				function (result) {
				    return { result: "success" };
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "authorization failed. " + createErrorString(result)
				    });
				}
			);                      
        }

        function setPassword(args) {            
            return $http({
                method: 'POST',
                url: setPasswordUrl,
                data: args
            }).then(
				function (result) {
				    return { result: "success" };
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "Set password failed. " + createErrorString(result)
				    });
				}
			);                
        }

        //{oldPassword, newPassword, confirmPassword}
        function changePassword(args) {            
            return $http({
                method: 'POST',
                url: changePasswordUrl,
                data: args
            }).then(
				function (result) {
				    return {result: "success"};				
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "Change password failed. " + createErrorString(result)
				    });										
				}                
			);                         
        }
        //TODO: need to combine these two methods right?
        function getExternalLogins(returnUrl, generateState) {            
            if (!returnUrl) {
                returnUrl = "";
            }

            var externalLoginUrl = baseUrl + "api/Account/ExternalLogins?returnUrl=" + (encodeURIComponent(siteUrl + returnUrl)) +
                "&generateState=" + (generateState ? "true" : "false");

            return $http({
                method: 'GET',
                url: externalLoginUrl
            }).then(
				function (result) {
				    return result.data;
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "failed to get external logins. " + createErrorString(result)
				    });
				}
			);
        }

        function getExternalLogin(returnUrl,provider, generateState) {  
            if (!returnUrl) {
                returnUrl = "";
            }

            var externalLoginUrl = baseUrl + "api/Account/ExternalLogins?returnUrl=" + (encodeURIComponent(siteUrl + returnUrl)) +
                "&provider=" + provider +
                "&generateState=" + (generateState ? "true" : "false");

            return $http({
                method: 'GET',
                url: externalLoginUrl
            }).then(
				function (result) {
				    return result.data;
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "failed to get external login. " + createErrorString(result)
				    });
				}
			);                
        }

        //accessToken (at this point the user is not signed in so need to manually set the auth header
        function getUserInfo() {            
            return $http({
                method: 'GET',
                url: userInfoUrl
            }).then(
				function (result) {
				    return result.data;
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "failed to load data. " + createErrorString(result)
				    });
				}
			);                  
        }

        function getManageInfo(returnUrl, generateState) {            
            return $http({
                method: 'GET',
                url: encodeUrlWithReturnUrl(manageInfoUrl, returnUrl, generateState)
            }).then(
				function (result) {
				    return result.data;
				},
				function (result) {
				    return $q.reject({
				        result: "failure",
				        error: "failed to load data. " + createErrorString(result)
				    });
				}
			);
        }
    }
})();