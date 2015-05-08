(function () {
    'use strict';

    var serviceId = 'storageService';
    
    angular.module('app.core')
        .factory(serviceId, ['utilityService', storageService]);

    function storageService(utilityService) {
        var service = {
            store: store,
            retrieve: retrieve,
            remove: remove,
            clear: clear,
            saveSession: saveSession
        };

        return service;

        //key value json (if true: stringify then store)
        function store(key, value, persist) {
            if (utilityService.exists(value) && utilityService.isObject(value)) {
                value = "!!stringified!!" + JSON.stringify(value);
            }

            if (persist) {                
                localStorage.setItem(key,value);
            } else {
                sessionStorage.setItem(key, value);

                if (utilityService.exists(localStorage.getItem(key))) {
                    localStorage.removeItem(key);
                }
            }
        }

        //key value json (if true: parse)
        function retrieve(key) {
            //if key exists in session storage return that if not try to return local
            var value;
            
            value = localStorage.getItem(key);

            if (!value) {
                value = sessionStorage.getItem(key);                
            }

            if (utilityService.exists(value) && value.indexOf("!!stringified!!") > -1) {
                value = value.replace("!!stringified!!", "");
                value = JSON.parse(value);
            }

            return value;
        }

        function remove(key) {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        }

        //sessionOnly only clear the local (persisted) storage
        function clear(sessionOnly) {
            if (!sessionOnly) {
                localStorage.clear();
            }

            sessionStorage.clear();
        }

        function saveSession() {
            angular.extend(localStorage, sessionStorage);
        }
    }
})();