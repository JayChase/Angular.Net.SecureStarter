(function () {
    'use strict';


    //create the securedService resource.
    angular.module('app.content')
        .factory('securedService',['$resource',function ($resource) {
            return $resource(
                '/api/secured/:Id',
                { Id: '@Id' },
                { 'update': { method: 'PUT' } }
            );
        }]);

    angular.module('app.content')
        .controller('SecuredWebapiDemoController', SecuredWebapiDemoController);

    SecuredWebapiDemoController.$inject = ['notifierService', 'appActivityService', 'securedService'];

    function SecuredWebapiDemoController(notifierService, appActivityService, securedService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Secured WebAPI Demo';
        vm.keyPoints = ["The SecuredController requires an authenticated user.",
            "If an access token is available the $http interceptor secureHttpInterceptor will add an authorization header to all requests.",
            "In this demonstration if a user is logged on GetValues will succeed and return a result.",
            "If not the call will fail with a 401 error response."];
        vm.getValues = getValues;
        vm.result = "";

        function getValues() {
            appActivityService.busy("securedWebapiDemo");

            vm.result = "";

            notifierService.show({ message: "Calling SecuredController Get (authentication required)." });

            securedService.query().$promise
                .then(
                    function (result) {
                        notifierService.show({ message: "Call succeeded." });
                        vm.result = result;
                    },
                    function (result) {
                        if (result.status && result.status === 401) {
                            notifierService.show({ message: "Call failed with a 401 error.", type: "error"});
                        } else {
                            notifierService.show({ message: "Call failed unexpectedly." });
                        }

                        vm.result = result;
                    })
                ['finally'](
                    function () {
                        appActivityService.idle("securedWebapiDemo");
                    });
        }

    }
})();
