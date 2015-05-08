(function () {
    'use strict';
        
    var serviceId = 'appActivityService';

    angular.module('app.core')
        .factory(serviceId, ['$rootScope', appActivityService]);

    function appActivityService($rootScope) {
        var service = {
            busy: busy,            
            idle: idle,
            info:{
                isBusy: false
            },
            reset: reset         
        };

        var activities = [];        

        return service;

        function busy(name) {
            if (!name) {
                throw {name:'Error', message:'A valid activity name must be provided.'};
            }

            if (!activities[name]) {
                activities.push(name);
            }

            updateStatus();
        }

        function idle(name) {
            if (!name) {
                throw { name: 'Error', message: 'A valid activity name must be provided.' };
            }

            if (!activities[name]) {
                activities.pop(name);
            }

            updateStatus();
        }        

        function updateStatus() {

            var newStatus = activities.length > 0;

            if(service.info.isBusy !== newStatus){
                service.info.isBusy = newStatus;
                $rootScope.$broadcast("appActivityService:isBusyChanged", { busy: service.info.isBusy });
            }
        }

        function reset() {
            activities = [];            
            updateStatus();
        }
    }
})();