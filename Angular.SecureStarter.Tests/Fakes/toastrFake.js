; (function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                error: error,
                info: info,
                options: {},
                success: success,
                version: '2.0.3',
                warning: warning,
                args: {}
            };

            return toastr;

            function fakingIt(funcCalled, message, title, optionsOverride) {
                toastr.args = {
                    type: funcCalled,
                    message: message,
                    title: title
                };
            }

            //#region Accessible Methods
            function error(message, title, optionsOverride) {
                fakingIt("error", message, title, optionsOverride);
            }

            function info(message, title, optionsOverride) {
                fakingIt("info", message, title, optionsOverride);
            }

            function success(message, title, optionsOverride) {
                fakingIt("success", message, title, optionsOverride);
            }

            function warning(message, title, optionsOverride) {
                fakingIt("warning", message, title, optionsOverride);
            }

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window['toastr'] = factory(window['jQuery']);
    }
}));