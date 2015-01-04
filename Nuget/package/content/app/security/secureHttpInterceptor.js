(function () {
    'use strict';

    var id = 'secureHttpInterceptor';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(id, ['storageService', secureHttpInterceptor]);

    function secureHttpInterceptor(storageService) {
        var interceptor = {
            request: request
        };

        return interceptor;

        function request(config) {
            var token = storageService.retrieve("accessToken");

            if (token) {
                config.headers['Authorization'] = "Bearer " + token;
            }

            return config;
        }
    }
})();