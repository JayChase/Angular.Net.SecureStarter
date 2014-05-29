(function () {
    'use strict';

    var serviceId = 'guardRouteSvc';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(serviceId, ['$route','$location','userSvc','accountClientSvc','notifierSvc', guardRouteSvc]);

    function guardRouteSvc($route, $location, userSvc, accountClientSvc, notifierSvc) {
        var service = {
            guard: guard
        };

        return service;

        function guard(event, url) {

            var path = getOriginalPathFromUrl(url);

            var targetRoute = $route.routes[path];

            if (targetRoute && targetRoute.requireRoles) {
                if (userSvc.signedIn) {
                    //var res = allowNavigation(targetRoute.requireRoles);
                    var res = false;

                    if (targetRoute.requireRoles.length === 0) {
                        res = true;
                    } else if ($.arrayIntersect(targetRoute.requireRoles,userSvc.roles).length > 0){
                        res = true;
                    }

                    if (res !== true) {
                        notifierSvc.show({ message: "you do not have the required permissions to few this page." });
                        event.preventDefault();
                    }
                } else {
                    notifierSvc.show({ message: "You need to sign in first." });
                    //TODO reidrect to login
                }
            }
        }
        
        //function allowNavigation(roles) {            
        //    accountClientSvc.authorize(roles)
        //        .then(
		//		    function (result) {
		//		        return true;
		//		    },
		//		    function (result) {
		//		        return false;
		//		    }
		//	    );            
        //}

        function getOriginalPathFromUrl(url) {
            var splitUrl = url.split('/');

            return "/" + splitUrl[splitUrl.length - 1];
        }
    }
})();