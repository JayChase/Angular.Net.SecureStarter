(function () {
    'use strict';   

    angular.module('app.security')
        .filter('usedLoginProviderFilter',['utilityService', function(utilityService) {
            return function (loginProviders, userLogins) {
                var filtered = [];

                loginProviders.forEach(function (lp) {
                    if (utilityService.arrayContains(userLogins, function (ul) { return lp.name === ul.loginProvider; }) !== true) {
                        filtered.push(lp);
                    }
                });

                return filtered;
            }
        }]);
})();
