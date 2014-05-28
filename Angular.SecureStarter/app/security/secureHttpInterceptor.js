(function () {
    'use strict';

    var id = 'secureHttpInterceptor';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(id, ['userSvc', secureHttpInterceptor]);

    function secureHttpInterceptor(userSvc) {
        var interceptor = {
            request: request
        };

        return interceptor;

        function request(config) {
            if (userSvc.signedIn) {
                config.headers['Authorization'] = "Bearer " + userSvc.accessToken;        
            }

            return config;
        }
    }
})();