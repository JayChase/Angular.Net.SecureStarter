(function () {
    'use strict';

    var controllerId = 'featuresController';

    // TODO: replace app with your module name
    angular.module('app.content')
        .controller(controllerId, ['$scope', 'notifierService', 'appActivityService', 'guardService', featuresController]);

    function featuresController($scope, notifierService, appActivityService, guardService) {
        $scope.title = 'features:';
        $scope.features = [];
        $scope.guardService = guardService;

        activate();

        function activate() {
            var busy = false, notifierFeature, appActivityFeature, navigationFeature, authorizationFeature;

            notifierFeature = {
                name: "notifier service (notifierService)",
                description: "Wraps toastr to make creating user info popups from anywhere in your app easy. Click the demo button to send a message.",
                demo: function () {
                    notifierService.show({message: "A message from the notifierService"});
                }
            };

            $scope.features.push(notifierFeature);            

            appActivityFeature = {
                name: "application activity service (appActivityService)",
                description: "Allows the app to track whether it is busy or not. Use the busy/idle methods let the app know. Also use the sk-disable-when-busy directive to disable elements whilst the app is busy.",
                demo: function () {
                    if (busy) {
                        appActivityService.idle("demo");
                        busy = false;                        
                    } else {
                        appActivityService.busy("demo");
                        busy = true;
                    }
                }
            };

            $scope.features.push(appActivityFeature);

            navigationFeature = {
                name: "Dynamic navbar links",
                description: "Add the property showNav to a route to show it as a link in the navbar. eg showNav: 'linkText'"
            };

            $scope.features.push(navigationFeature);

            authorizationFeature = {
                name: "Render content based on authentication and authorization",
                description: "Render content dependent on whether a user has been authenticated and is a member of one or more required roles. Use the guardService.authorize function with ngIf to control whether content is rendered. If no arguments are passed to the function authorize will return true for any authenticated user. To specify roles pass in an array of all role names ['user','administrator']." 
                    + " For example: "
                    + "<p ng-if='guardService.authorize()'>This paragraph will only show if you are currently signed in.</p>"                    
            };

            $scope.features.push(authorizationFeature);
        }
    }
})();
