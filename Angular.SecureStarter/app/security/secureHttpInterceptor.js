(function () {
    'use strict';

    var id = 'secureHttpInterceptor';

    angular.module('app.security')
        .factory(id, ['storageSvc', secureHttpInterceptor]);

    function secureHttpInterceptor(storageSvc) {
        var interceptor = {
            request: request
        };

        return interceptor;

        function request(config) {
            var token = storageSvc.retrieve("accessToken");

            if (token) {
                config.headers['Authorization'] = "Bearer " + token;
            }

            return config;
        }
    }
})();