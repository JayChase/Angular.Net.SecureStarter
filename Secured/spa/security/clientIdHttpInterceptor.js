(function () {
    'use strict';

    var id = 'clientIdHttpInterceptor';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(id, ['appSettingsService', clientIdHttpInterceptor]);

    function clientIdHttpInterceptor(appSettingsService) {
        var interceptor = {
            request: request
        };

        return interceptor;

        function request(config) {
            var clientId = appSettingsService.clientId;

            if (clientId) {
                config.headers['client_authorization'] = clientId;
            }

            return config;
        }
    }
})();