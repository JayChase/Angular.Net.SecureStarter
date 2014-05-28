(function () {
    'use strict';

    var serviceId = 'accountClientSvc';

    // TODO: replace app with your module name
    angular.module('app')
        .factory(serviceId, ['$http','$q', accountClientSvc]);

    function accountClientSvc($http,$q) {
        // Routes
        var baseUrl = $.getBasePath(),
        addExternalLoginUrl = baseUrl + "api/Account/AddExternalLogin",
        changePasswordUrl = baseUrl + "api/Account/changePassword",
        loginUrl = baseUrl + "token",
        logoutUrl = baseUrl + "api/Account/Logout",
        registerUrl = baseUrl + "api/Account/Register",
        registerExternalUrl = baseUrl + "api/Account/RegisterExternal",
        removeLoginUrl = baseUrl + "api/Account/RemoveLogin",
        setPasswordUrl = baseUrl + "api/Account/setPassword",
        siteUrl = baseUrl,
        userInfoUrl = "api/Account/UserInfo";

        var service = {
            register: register,
            login: login,
            logout: logout,
            setPassword: setPassword,
            changePassword: changePassword
        };

        return service;

        
        //user{userName, password, confirmPassword, email}
        function register(user) {
            var deferred = $q.defer();

            user.grant_type = "password";

            $http({
                method: 'POST',
                url: registerUrl,
                data: user
            }).then(
				function (result) {
				    //success

				    deferred.resolve(result);
				},
				function (result) {
				    //error

				    deferred.reject(result);
				}
			);

            return deferred.promise;
        }

        //user{id,password, rememberMe}
        function login(user) {
            var deferred = $q.defer();

            var args = {
                username: user.id,
                password: user.password,
                grant_type: "password"
            };

            var xsrf = $.param(args);

            $http({
                method: 'POST',
                url: loginUrl,
                data: xsrf,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status) {
                //TODO: check out data returned and return only good user data from here
                deferred.resolve(data);
            }).error(function (data, status) {
                //TODO: check out data returned and return only useful safe errors
                deferred.reject(data);
            });

            return deferred.promise;
        }        

        function logout() {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: logoutUrl
            }).success(function (data, status) {
                //TODO: check out data returned and return only good user data from here
                deferred.resolve(data);
            }).error(function (data, status) {
                //TODO: check out data returned and return only useful safe errors
                deferred.reject(data);
            });

            return deferred.promise;
        }

        function setPassword() { }

        function changePassword() { }
    }
})();