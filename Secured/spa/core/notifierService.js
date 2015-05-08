(function () {
    'use strict';

    var serviceId = 'notifierService';

    toastr.options.closeButton = true;
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.options.backgroundpositionClass = 'toast-bottom-right';
    toastr.options.timeOut = 800;
    toastr.options.fadeOut = 50;
    toastr.options.fadeIn = 50;

    var defaults = {
        source: "app",
        title: "",
        message: "no message provided",
        detail: "",
        type: "info"
    };
    
    angular.module('app.core')
        .factory(serviceId, [notifierService]);

    function notifierService() {
        var service = {
            show: show,
            verbose: true
        };

        return service;

        function show(options) {
            var opns = angular.copy(defaults);

            if (typeof options === "string") {                
                opns.message = options;
            } else {
                opns = angular.extend(opns, options);
            }
            
            if (service.verbose && opns.detail.length > 0) {
                opns.message += " " + opns.detail;
            }

            toastr[opns.type](opns.message, opns.title);
        }
    }
})();