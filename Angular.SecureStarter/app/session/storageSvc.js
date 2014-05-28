(function () {
    'use strict';

    var serviceId = 'storageSvc';

    // TODO: replace app with your module name
    angular.module('app.session')
        .factory(serviceId, [storageSvc]);

    function storageSvc() {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();