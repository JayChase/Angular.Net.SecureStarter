(function () {
    'use strict';

    angular
        .module('app.security')
        .provider('accountResource', function accountResourceProvider() {

            var authServer = '', authUrl = 'api/account/', roleAttributeName;

            this.setAuthServer = function (url) {
                authServer = url;
                if (authServer.length > 0 && authServer.substring(authServer.length - 1) === '/') {
                    authServer = authServer.substring(0, authServer.length - 1);
                }
            };

            this.$get = ['$resource', function accountResourceFactory($resource) {                
                var fullUrl = authServer + "/" + authUrl,
                    service = $resource(fullUrl,
                        null,
                        {
                            //match up urls
                            'getUserInfo': { method: 'GET', url: fullUrl + 'userinfo' },
                            'login': { method: 'POST', url: authServer + '/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }},
                            'logout': { method: 'POST', url: fullUrl + 'logout' },
                            'getManageInfo': { method: 'GET', url: fullUrl + 'manageinfo', params: { returnUrl: '@returnUrl', generateState: '@generateState' } },
                            'changePassword': { method: 'POST', url: fullUrl + 'changepassword' },
                            'register': { method: 'POST', url: fullUrl + 'register' },
                            'setPassword': { method: 'POST', url: fullUrl + 'setpassword' },                    
                            'registerExternal': { method: 'POST', url: fullUrl + 'registerexternal' },
                            'removeLogin': { method: 'POST', url: fullUrl + 'removelogin' },
                            'addExternalLogin': { method: 'POST', url: fullUrl + 'addexternallogin' },
                            'getExternalLogin': { method: 'GET', url: fullUrl + 'externallogins' },
                            'getExternalLogins': { method: 'GET', url: fullUrl + 'externallogins', isArray: true },
                            'checkEmailAvailable': { method: 'POST', url: fullUrl + 'checkEmailAvailable' },
                            'checkUsernameAvailable': { method: 'POST', url: fullUrl + 'checkUsernameAvailable' }
                        }, {
                            stripTrailingSlashes: true
                        });

                service.authServer = authServer;

                return service;
            }];

            function createfullUrl() {
                if (authServer.length > 0 && authServer.substr(authServer.length - 1 === '/')) {
                    return authServer + authUrl;
                } else {
                    return authServer + '/' + authUrl;
                }                
            }
    });
})();