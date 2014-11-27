(function () {
    'use strict';

    angular
        .module('app.security')
        .factory('accountResource', accountResource);

    accountResource.$inject = ['$resource', '$http', 'appSettingsSvc'];

    function accountResource($resource, $http, appSettingsSvc) {
        var baseUrl = 'api/account/', service, externalLogin, externalLogins;

        service = $resource(baseUrl,
                null,
                {
                    //match up urls
                    'getUserInfo': { method: 'GET', url: baseUrl + 'userinfo' },
                    'login': { method: 'POST', url: 'token', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
                    'logout': { method: 'POST', url: baseUrl + 'logout' },
                    'getManageInfo': { method: 'GET', url: baseUrl + 'manageinfo', params: { returnUrl: '@returnUrl', generateState: '@generateState' } },
                    'changePassword': { method: 'POST', url: baseUrl + 'changepassword' },
                    'setPassword': { method: 'POST', url: baseUrl + 'setpassword' },                    
                    'registerExternal': { method: 'POST', url: baseUrl + 'registerexternal' },
                    'removeLogin': { method: 'POST', url: baseUrl + 'removelogin' },
                    'externalLogin': { method: 'GET', url: baseUrl + 'externallogin' },
                    'externalLogins': { method: 'GET', url: baseUrl + 'externallogins', isArray: true },
                    'checkEmailAvailable': { method: 'POST', url: baseUrl + 'checkEmailAvailable' },
                    'checkUsernameAvailable': { method: 'GET', url: baseUrl + 'checkUsernameAvailable' }
                }, {
                    stripTrailingSlashes: true
                });

        return service;

        //function externalLogin(returnUrl, generateState) {
        //    if (!returnUrl) {
        //        returnUrl = "";
        //    }

        //    var url = baseUrl + "externallogin?returnUrl=" + (encodeURIComponent(appSettingsSvc.siteUrl + returnUrl)) +
        //        "&generateState=" + (generateState ? "true" : "false");

        //    return $http({
        //        method: 'GET',
        //        url: url
        //    })
        //};

        //function externalLogins(returnUrl, generateState) {
        //    if (!returnUrl) {
        //        returnUrl = "";
        //    }

        //    var url = baseUrl + "externallogin?returnUrl=" + (encodeURIComponent(returnUrl)) +
        //        "&generateState=" + (generateState ? "true" : "false");

        //    return $http({
        //        method: 'GET',
        //        url: url
        //    });
        //}

        //function encodeUrlWithReturnUrl(url, returnUrl, generateState) {
        //    return url + (encodeURIComponent(returnUrl)) +
        //        "&generateState=" + (generateState ? "true" : "false");
        //}
        
    }

})();