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
            var deferred = $q.defer();

            if (service.info.ready) {
                deferred.resolve();
            } else {
                deferreds.push(deferred);
            }

            return deferred.promise;
        }

        function resolvePromises() {
            deferreds.forEach(function (deferred) {
                deferred.resolve();
            });

            deferreds.length = 0;
        }
    }
})();