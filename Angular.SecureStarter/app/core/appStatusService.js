(function () {
    'use strict';

    var serviceId = 'appStatusService';

    // TODO: replace app with your module name
    angular.module('app.core')
        .factory(serviceId, ['$q', appStatusService]);

    function appStatusService($q) {
        var deferreds = [];

        var service = {
            whenReady: whenReady,
            info:{
                ready: false
            },            
            isReady: isReady
        };

        return service;

        function isReady(value) {
            if (service.info.ready !== value) {
                service.info.ready = value;

                if (service.info.ready) {
                    resolvePromises();
                }
            }
        }

        function whenReady() {
            return $q(function (resolve, reject) {
                if (service.info.ready) {
                    resolve();
                } else {
                    deferreds.push(deferred);
                }
            });
        }

        function resolvePromises() {
            deferreds.forEach(function (deferred) {
                deferred.resolve();
            });

            deferreds.length = 0;
        }
    }
})();