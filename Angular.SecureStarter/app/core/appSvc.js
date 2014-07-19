(function () {
    'use strict';

    var serviceId = 'appSvc';

    // TODO: replace app with your module name
    angular.module('app')
        .factory(serviceId, ['appStatusSvc','appActivitySvc','notifierSvc',appSvc]);

    function appSvc(appStatusSvc, appActivitySvc, notifierSvc) {
        var service = {
            status: appStatusSvc,
            activity: appActivitySvc,
            notify: notifierSvc
        };

        return service;
    }
})();