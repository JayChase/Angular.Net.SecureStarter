/// <reference path="../../scripts/sinon-1.9.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery-2.1.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery.utilities.js" />
/// <reference path="../../../angular.securestarter/scripts/angular.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-animate.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-mocks.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-route.js" />
/// <reference path="../../../angular.securestarter/app/app.js" />
/// <reference path="../../../angular.securestarter/app/core/core.js" />
/// <reference path="../../../angular.securestarter/app/core/appActivitySvc.js" />
'use strict';

//references


//Test suite
describe('Core appActivitySvc', function () {
    var rootScope, rootScopeSpy;

    //Setup
    beforeEach(function () {
        module('app.core');

        inject(function ($rootScope) {
            rootScope = $rootScope;
            rootScopeSpy = spyOn(rootScope, '$broadcast');//.andCallThrough();
        });
    });
    
    it('Initially isBusy is false', inject(function (appActivitySvc) {        
        expect(appActivitySvc.info.isBusy).toBe(false);
    }));

    it('After calling busy(value) isBusy is true', inject(function (appActivitySvc) {
        appActivitySvc.busy("test");
        expect(appActivitySvc.info.isBusy).toBe(true);
    }));

    it('busy(undefined or null) throws error', inject(function (appActivitySvc) {        
        expect(appActivitySvc.busy).toThrow({ name: 'Error', message: 'A valid activity name must be provided.' });
    }));

    it('idel(undefined or null) throws error', inject(function (appActivitySvc) {
        expect(appActivitySvc.idle).toThrow({ name: 'Error', message: 'A valid activity name must be provided.' });
    }));

    it('isBusy false to true raises appActivitySvc:isBusyChanged', inject(function (appActivitySvc) {                      
        appActivitySvc.busy("test");
        expect(rootScope.$broadcast).toHaveBeenCalledWith('appActivitySvc:isBusyChanged', { busy: true });
    }));

    it('isBusy true to false raises appActivitySvc:isBusyChanged', inject(function (appActivitySvc) {
        appActivitySvc.busy("test");
        appActivitySvc.idle("test");

        expect(rootScope.$broadcast).toHaveBeenCalledWith('appActivitySvc:isBusyChanged', { busy: false });
    }));

    it('Multiple isBusy true calls raises appActivitySvc:isBusyChanged once only', inject(function (appActivitySvc) {
        appActivitySvc.busy("test");
        appActivitySvc.busy("test1");

        expect(rootScopeSpy.calls.count()).toBe(1);
    }));

    it('One of many busy activities set to idle isBusy still true', inject(function (appActivitySvc) {
        appActivitySvc.busy("test");
        appActivitySvc.busy("test1");
        appActivitySvc.idle("test1");

        expect(appActivitySvc.info.isBusy).toBe(true);
    }));

    it('All of many busy activities set to idle isBusy now false', inject(function (appActivitySvc) {
        appActivitySvc.busy("test");
        appActivitySvc.busy("test1");
        appActivitySvc.idle("test1");
        appActivitySvc.idle("test2");

        expect(appActivitySvc.info.isBusy).toBe(false);
    }));

    it('Reset resets to false', inject(function (appActivitySvc) {
        appActivitySvc.busy("test");
        appActivitySvc.busy("test1");
        appActivitySvc.reset();

        expect(appActivitySvc.info.isBusy).toBe(false);
    }));

    //Teardown
    afterEach(function () {
       
    });
});