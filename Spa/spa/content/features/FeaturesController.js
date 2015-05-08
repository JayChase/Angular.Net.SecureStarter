(function () {
    'use strict';

    angular.module('app.content')
        .controller('FeaturesController', FeaturesController);

    FeaturesController.$inject = ['notifierService', 'appActivityService'];

    function FeaturesController(notifierService, appActivityService) {
        /* jshint validthis:true */
        var vm = this;

        vm.title = 'features';
        vm.features = [];
        
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

            vm.features.push(notifierFeature);            

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

            vm.features.push(appActivityFeature);

            navigationFeature = {
                name: "Dynamic navbar links",
                description: "Add the property showNav to a route to show it as a link in the navbar. eg showNav: 'linkText'"
            };

            vm.features.push(navigationFeature);
        }
    }
})();
