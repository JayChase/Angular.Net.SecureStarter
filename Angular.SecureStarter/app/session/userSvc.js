(function () {
    'use strict';

    var serviceId = 'userSvc';

    angular.module('app.session')
        .factory(serviceId, ['$rootScope', userSvc]);

    function userSvc($rootScope) {
        var service = {
            set: set,
            clear: clear,
            signedIn: false,
            username: "",
            accessToken: "",
            roles: []
        };

        var activities = [];

        return service;

        function set(user) {            
            service.username = user.username;
            service.accessToken = user.accessToken;
            service.signedIn = true;
            service.roles = user.roles;
            raiseEvent();
        }

        function clear() {
            service.username = "";
            service.accessToken = "";
            service.signedIn = false;
            raiseEvent();
        }

        function raiseEvent() {
            $rootScope.$broadcast("userSvc:signedInChanged", { signedIn: service.signedIn });
        }
    }
})();