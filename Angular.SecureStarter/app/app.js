(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute','ngAnimate','app.shell', 'app.core', 'app.security']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/welcome', {
            templateUrl: 'app/content/welcome/welcome.html',
            controller: 'welcomeCtrl',
            caseInsensitiveMatch: true,
            showNav: 'welcome'
        });
        $routeProvider.when('/features', {
            templateUrl: 'app/content/features/features.html',
            controller: 'featuresCtrl',
            caseInsensitiveMatch: true,
            showNav: 'features'
        });
        $routeProvider.when('/register', {
            templateUrl: 'app/security/register.html',
            controller: 'registerCtrl',
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/signIn', {
            templateUrl: 'app/security/signIn.html',
            controller: 'signInCtrl',
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/manage', {
            templateUrl: 'app/security/manage.html',
            controller: 'manageCtrl',
            resolve: {             
                guard: function (guardRouteSvc) {
                    return guardRouteSvc.guard();
                }
            },
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/externalregister', {
            templateUrl: 'app/security/externalRegister.html',
            controller: 'externalRegisterCtrl',
            resolve: {
                appReady: function (appStatusSvc)
                {
                    return appStatusSvc.whenReady();
                }
            },
            caseInsensitiveMatch: true
        });
        $routeProvider.otherwise({
            redirectTo: '/welcome'
        });
    }]);

    app.value('appSettingsSvc', {
        brand: "StarterKit",
        title: "Angular StarterKit"
    });

    // Handle routing errors and success events
    app.run(['$route', function ($route) {
        
        //externalAuthSvc.handleAuthResponse().then(afterExternal, afterExternal);
        
        ////TODO: this nested promise thing needs to be sorted hate this format
        //function afterExternal(handled){
        //    if (!handled) {
        //        restoreUserSvc.restore().then(afterRestore, afterRestore);
        //    } else{
        //        appStatusSvc.isReady(true);
        //    }
        //}

        //function afterRestore(){
        //    appStatusSvc.isReady(true);
        //}
    }]);
})();