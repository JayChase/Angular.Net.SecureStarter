(function () {
    'use strict';

    //create the securedSvc resource.
    angular.module('app.content')
        .factory('securedSvc', function ($resource) {
            return $resource(
                '/api/secured/:Id',
                { Id: '@Id' },
                { 'update': { method: 'PUT' } }
            );
        });

    var controllerId = 'securedWebApiDemoController';

    angular.module('app')
        .controller(controllerId, ['$scope', 'notifierService', 'appActivityService', 'securedSvc', securedWebApiDemoController]);
    
    function securedWebApiDemoController($scope,notifierService, appActivityService, securedSvc) {
        $scope.title = 'Secured WebAPI Demo';
        $scope.keyPoints = ["The SecuredController requires an authenticated user.",
            "If an access token is available the $http interceptor secureHttpInterceptor will add an authorization header to all requests.",
            "In this demonstration if a user is logged on GetValues will succeed and return a result.",
            "If not the call will fail with a 401 error response."];
        $scope.getValues = getValues;
        $scope.result = "";

        function getValues() {
            appActivityService.busy("securedWebapiDemo");

            $scope.result = "";

            notifierService.show({ message: "Calling SecuredController Get (authentication required)." });

            securedSvc.query().$promise
                .then(
                    function (result) {
                        notifierService.show({ message: "Call succeeded." });
                        $scope.result = result;
                    },
                    function (result) {
                        if(result.status && result.status === "401"){
                            notifierService.show({ message: "Call failed with a 401 error." });                            
                        } else{
                            notifierService.show({ message: "Call failed unexpectedly." });                            
                        }

                        $scope.result = result;
                    })
                ['finally'](
                    function () {
                        appActivityService.idle("securedWebapiDemo");
                    });
        }
    }
})();
