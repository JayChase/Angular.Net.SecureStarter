/// <reference path="../../scripts/sinon-1.9.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery-2.1.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery.utilities.js" />
/// <reference path="../../../angular.securestarter/scripts/angular.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-animate.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-mocks.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-route.js" />
/// <reference path="../../../angular.securestarter/scripts/toastr.js" />
/// <reference path="../../../angular.securestarter/app/app.js" />
/// <reference path="../../../angular.securestarter/app/core/core.js" />
/// <reference path="../../../angular.securestarter/app/core/notifiersvc.js" />
/// <reference path="../../../angular.securestarter/app/core/navigationsvc.js" />

'use strict';

//Test suite
describe('Core navigationSvc', function () {

    //Setup
    beforeEach(function () {
        module('app.core');

        var route, location, routes = JSON.parse('{"/welcome":{"reloadOnSearch":true,"templateUrl":"app/content/welcome/welcome.html","controller":"welcomeCtrl","showNav":"welcome","originalPath":"/welcome","regexp":{},"keys":[]},"/welcome/":{"redirectTo":"/welcome","originalPath":"/welcome/","regexp":{},"keys":[]},"/features":{"reloadOnSearch":true,"templateUrl":"app/content/features/features.html","controller":"featuresCtrl","showNav":"features","originalPath":"/features","regexp":{},"keys":[]},"/features/":{"redirectTo":"/features","originalPath":"/features/","regexp":{},"keys":[]},"/register":{"reloadOnSearch":true,"templateUrl":"app/security/register.html","controller":"registerCtrl","originalPath":"/register","regexp":{},"keys":[]},"/register/":{"redirectTo":"/register","originalPath":"/register/","regexp":{},"keys":[]},"/signIn":{"reloadOnSearch":true,"templateUrl":"app/security/signIn.html","controller":"signInCtrl","originalPath":"/signIn","regexp":{},"keys":[]},"/signIn/":{"redirectTo":"/signIn","originalPath":"/signIn/","regexp":{},"keys":[]},"null":{"reloadOnSearch":true,"redirectTo":"/welcome"}}');

        inject(function ($route, $location) {
            route = $route;
            route.routes = routes;
            location = $location;
        });
    });

    //Spec - 1
    it('only links with showNav properties are returned.', inject(function (navigationSvc) {        
        expect(navigationSvc.getLinks().length).toBe(2);
    }));

    //Teardown
    afterEach(function () {
       
    });
});