(function () {
    'use strict';

    angular
        .module('app.security')
        .provider('accountResource', function accountResourceProvider() {

            var authUrl = 'api/account/', roleAttributeName;

            this.setAuthUrl = function (url) {
                authUrl = url;
            };

            this.$get = ['$resource', function accountResourceFactory($resource) {
                var service = $resource(authUrl,
                        null,
                        {
                            //match up urls
                            'getUserInfo': { method: 'GET', url: authUrl + 'userinfo' },
                            'login': { method: 'POST', url: 'token', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }},
                            'logout': { method: 'POST', url: authUrl + 'logout' },
                            'getManageInfo': { method: 'GET', url: authUrl + 'manageinfo', params: { returnUrl: '@returnUrl', generateState: '@generateState' } },
                            'changePassword': { method: 'POST', url: authUrl + 'changepassword' },
                            'setPassword': { method: 'POST', url: authUrl + 'setpassword' },                    
                            'registerExternal': { method: 'POST', url: authUrl + 'registerexternal' },
                            'removeLogin': { method: 'POST', url: authUrl + 'removelogin' },
                            'addExternalLogin': { method: 'POST', url: authUrl + 'addexternallogin' },
                            'getExternalLogin': { method: 'GET', url: authUrl + 'externallogins' },
                            'getExternalLogins': { method: 'GET', url: authUrl + 'externallogins', isArray: true },
                            'checkEmailAvailable': { method: 'POST', url: authUrl + 'checkEmailAvailable' },
                            'checkUsernameAvailable': { method: 'GET', url: authUrl + 'checkUsernameAvailable' }
                        }, {
                            stripTrailingSlashes: true
                        });

                return service;
            }];
    });
})();