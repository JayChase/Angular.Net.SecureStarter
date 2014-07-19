(function () {
    'use strict';
        
    var serviceId = 'appActivitySvc';

    angular.module('app.core')
        .factory(serviceId, ['$rootScope', appActivitySvc]);

    function appActivitySvc($rootScope) {
        var service = {
            busy: busy,            
            idle: idle,
            isBusy: false,
            reset: reset         
        };

        var activities = [];        

        return service;

        function busy(name) {
            if (!name) {
                throw new Error('A valid activity name must be provided.');
            }

            if (!activities[name]) {
                activities.push(name);
            }

            updateStatus()
        }

        function idle(name) {
            if (!name) {
                throw new Error('A valid activity name must be provided.');
            }

            if (!activities[name]) {
                activities.pop(name);
            }

            updateStatus()
        }        

        function updateStatus() {

            var newStatus = activities.length > 0;

            if(service.isBusy !== newStatus){
                service.isBusy = newStatus;
                $rootScope.$broadcast("appActivitySvc:isBusyChanged", { busy: service.isBusy });
            }
        }

        function reset() {
            activities = [];            
            updateStatus();
        }
    }
})();