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
/// <reference path="../../../angular.securestarter/app/core/storagesvc.js" />
/// <reference path="../../../angular.securestarter/app/security/security.js" />
/// <reference path="../../../angular.securestarter/app/security/securehttpinterceptor.js" />
/// <reference path="../../../angular.securestarter/app/security/usersvc.js" />
/// <reference path="../../../angular.securestarter/app/security/accountclientsvc.js" />
/// <reference path="../../../angular.securestarter/app/security/guardroutesvc.js" />

'use strict';

//Test suite
describe('security guardRouteSvc', function () {
    //mocks
    var route, routeProvider, location, routes, mockNotifierSvc, mockUserSvc, mockStorageSvc, mockEvent;

    //Setup
    beforeEach(function () {
        module('app.security');

        mockEvent = sinon.stub({ preventDefault: function () { } });

        mockNotifierSvc = sinon.stub({ show: function (args) { } });

        mockUserSvc = sinon.stub({
            signedIn: true,
            roles: []
        });


        mockStorageSvc = sinon.stub({
            retrieve: function (args) {
                return args;
            }
        });        
        
        module(function ($provide) {
            $provide.value('notifierSvc', mockNotifierSvc);
            $provide.value('userSvc', mockUserSvc);
        });
        
        var rs =  '{"/welcome":{"reloadOnSearch":true,"templateUrl":"app/content/welcome/welcome.html","controller":"welcomeCtrl","showNav":"welcome","originalPath":"/welcome","regexp":{},"keys":[]},' +
            '"/welcome/":{"redirectTo":"/welcome","originalPath":"/welcome/","regexp":{},"keys":[]},' +
            '"/features":{"reloadOnSearch":true,"requireRoles":["administrator","test"],"templateUrl":"app/content/features/features.html","controller":"featuresCtrl","showNav":"features","originalPath":"/features","regexp":{},"keys":[]},"/features/":{"redirectTo":"/features","originalPath":"/features/","regexp":{},"keys":[]},' +
            '"/register":{"reloadOnSearch":true,"requireRoles":[], "templateUrl":"app/security/register.html","controller":"registerCtrl","originalPath":"/register","regexp":{},"keys":[]},"/register/":{"redirectTo":"/register","originalPath":"/register/","regexp":{},"keys":[]},' +
            '"/signIn":{"reloadOnSearch":true,"templateUrl":"app/security/signIn.html","controller":"signInCtrl","originalPath":"/signIn","regexp":{},"keys":[]},"/signIn/":{"redirectTo":"/signIn","originalPath":"/signIn/","regexp":{},"keys":[]},"null":{"reloadOnSearch":true,"redirectTo":"/welcome"}}';

        routes = JSON.parse(rs);

        inject(function ($route, $location) {
            route = $route;
            route.routes = routes;
            location = $location;

            spyOn(location, "path");            
        });
    });

    //Spec - 1
    it('if path does not match any routes does not re-route', inject(function (guardRouteSvc) {
        sinon.stub(location, "path", function () { return "/fakeUnknownRoute"; });

        guardRouteSvc.guard(mockEvent);

        expect(location.path).not.toHaveBeenCalledWith("/signIn");;
    }));

    it('if path does not match any routes does not prevent navigation', inject(function (guardRouteSvc) {
        sinon.stub(location, "path", function () { return "/fakeUnknownRoute"; });

        guardRouteSvc.guard(mockEvent);

        expect(mockEvent.preventDefault.called).toEqual(false);
    }));

    it('if path route does not have requiredRoles does not re-route', inject(function (guardRouteSvc) {
        sinon.stub(location, "path", function () { return "/welcome"; });

        guardRouteSvc.guard(mockEvent);

        expect(location.path).not.toHaveBeenCalledWith("/signIn");;
    }));

    it('if path route does not have requiredRoles does not prevent navigation', inject(function (guardRouteSvc) {
        sinon.stub(location, "path", function () { return "/welcome"; });

        guardRouteSvc.guard(mockEvent);

        expect(mockEvent.preventDefault.called).toEqual(false);
    }));

    it('if path route has empty requiredRoles and user signed in does not re-route', inject(function (guardRouteSvc) {
        sinon.stub(location, "path", function () { return "/register"; });

        guardRouteSvc.guard(mockEvent);

        expect(location.path).not.toHaveBeenCalledWith("/signIn");;
    }));

    it('if path route has empty requiredRoles and user signed in does not prevent navigation', inject(function (guardRouteSvc) {
        sinon.stub(location, "path", function (newPath) { return "/register"; });

        guardRouteSvc.guard(mockEvent);

        expect(mockEvent.preventDefault.called).toEqual(false);
    }));

    it('if path route has empty requiredRoles and user NOT signed in re-route', inject(function (guardRouteSvc) {        
        mockUserSvc.signedIn = false;
        sinon.stub(location, "path", function (newPath) { return "/register"; });

        guardRouteSvc.guard(mockEvent);

        expect(location.path.calledWith("/signIn")).toEqual(true);;
    }));

    //Teardown
    afterEach(function () {

    });
});