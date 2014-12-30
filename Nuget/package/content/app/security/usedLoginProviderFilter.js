(function () {
    'use strict';   

    angular.module('app.security')
        .filter('usedLoginProviderFilter', function () {
            return function (loginProviders, userLogins) {
                var filtered = [];

                loginProviders.forEach(function (lp) {
                    if($.arrayContains(userLogins,function (ul){ return lp.name === ul.loginProvider;}) !== true){
                        filtered.push(lp);
                    }
                });

                return filtered;
            }
        });
})();
