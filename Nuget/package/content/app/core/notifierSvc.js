(function () {
    'use strict';

    var serviceId = 'notifierSvc';

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
        .factory(serviceId, [notifierSvc]);

    function notifierSvc() {
        var service = {
            show: show,
            verbose: true
        };

        return service;

        function show(options) {
            var opns;

            if (typeof options === "string") {
                opns = defaults;
                opns.message = options;
            } else {
                opns = angular.extend(defaults, options);
            }
            
            if (service.verbose && opns.detail.length > 0) {
                opns.message += " " + opns.detail;
            }

            toastr[opns.type](opns.message, opns.title);
        }
    }
})();