(function () {
    'use strict';

    var serviceId = 'appStatusSvc';
   
    angular.module('app.core')
        .factory(serviceId, ['$q', appStatusSvc]);

    function appStatusSvc($q) {
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