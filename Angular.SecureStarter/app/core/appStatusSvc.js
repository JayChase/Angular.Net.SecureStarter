(function () {
    'use strict';

    var serviceId = 'appStatusSvc';

    // TODO: replace app with your module name
    angular.module('app.core')
        .factory(serviceId, ['$q', appStatusSvc]);

    function appStatusSvc($q) {
        var deferreds = [];

        var service = {
            whenReady:whenReady,
            ready: false,
            isReady: isReady
        };

        return service;

        function isReady(value) {
            if (service.ready != value) {
                service.ready = value;

                if (service.ready) {
                    resolvePromises();
                }
            }
        }

        function whenReady() {
            var deferred = $q.defer();
             
            if (service.ready) {
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