(function () {
    'use strict';

    var serviceId = 'restoreUserSvc';

    // TODO: replace app with your module name
    angular.module('app.security')
        .factory(serviceId, ['$location','$q', 'storageSvc', 'appActivitySvc', 'userSvc', restoreUserSvc]);

    function restoreUserSvc($location, $q, storageSvc, appActivitySvc, userSvc) {        

        var service = {
            restore: restore
        };

        return service;

        function restore() {
            appActivitySvc.busy("restoreUserSvc");

            if (storageSvc.retrieve("accessToken")) {
                return userSvc.getUserInfo().then(
                      function (result) {
                          if (result.hasRegistered) {
                              userSvc.setUser(result);
                              appActivitySvc.idle("restoreUserSvc");                                                    
                          } else {
                              appActivitySvc.idle("restoreUserSvc");
                              $location.path("/signIn");
                          }                       
                      },
                      function (result) {
                          //error	                     
                          appActivitySvc.idle("restoreUserSvc");
                          $location.path("/signIn");                          
                      });
            } else {
                var deferred = $q.defer();
                deferred.resolve(false);

                appActivitySvc.idle("restoreUserSvc");

                return deferred.promise;
            }
            
        }
    }
})();