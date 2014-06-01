(function () {
    'use strict';

    var controllerId = 'featuresCtrl';

    // TODO: replace app with your module name
    angular.module('app')
        .controller(controllerId, ['$scope', 'notifierSvc', 'appActivitySvc', featuresCtrl]);

    function featuresCtrl($scope, notifierSvc, appActivitySvc) {
        $scope.title = 'features:';
        $scope.features = [];

        activate();

        function activate() {

            var notifierFeature = {
                name: "notifier service (notifierSvc)",
                description: "wraps toastr to make creating user info popups from anywhere in your app easy. Click the demo button to send a message.",
                demo: function () {
                    notifierSvc.show({title: "demo", message: "A message from the notifierSvc", type: "info"});
                }
            };

            $scope.features.push(notifierFeature);

            var busy = false;

            var appActivityFeature = {
                name: "application activity service (appActivitySvc)",
                description: "Allows the app to track whether it is busy or not. use the busy/idle methods let the app know. Also use the sk-disable-when-busy directive to disable elements whilst the app is busy.",
                demo: function () {
                    if (busy) {
                        appActivitySvc.idle("demo");
                        busy = false;                        
                    } else {
                        appActivitySvc.busy("demo");
                        busy = true;
                    }
                }
            };

            $scope.features.push(appActivityFeature);

            var navigationFeature = {
                name: "Dynamic navbar links",
                description: "Add the property showNav to a route to show it as a link in the navbar. eg showNav: 'linkText'"
            };

            $scope.features.push(navigationFeature);
        }
    }
})();
