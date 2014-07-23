/// <reference path="../../scripts/sinon-1.9.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery-2.1.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery.utilities.js" />
/// <reference path="../../../angular.securestarter/scripts/angular.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-animate.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-mocks.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-route.js" />
/// <reference path="../../../angular.securestarter/app/app.js" />
/// <reference path="../../../angular.securestarter/app/core/core.js" />
/// <reference path="../../../angular.securestarter/app/core/appStatusSvc.js" />
'use strict';

//references


//Test suite
describe('Core appStatusSvc', function () {
    var q;

    //Setup
    beforeEach(function () {
        module('app.core');

        inject(function ($q) {
            q = $q;
            q.deferreds = [];
            q.deferProper = q.defer;
            q.setupDefer = function () {
                q.deferreds.push(q.deferProper());
            };
            q.defer = function () {                
                return $.arrayLast(q.deferreds); //always return the last promise in the array
            };            
        });
    });
    
    it('whenReady returns unresolved promise if app not ready', inject(function (appStatusSvc) {
        q.setupDefer();
        spyOn(q.deferreds[0], "resolve");

        appStatusSvc.whenReady();

        expect(q.deferreds[0].resolve).not.toHaveBeenCalled();
    }));

    it('whenReady returns ready resolved promise if app already ready', inject(function (appStatusSvc) {
        q.setupDefer();
        spyOn(q.deferreds[0], "resolve");

        appStatusSvc.isReady(true);
        appStatusSvc.whenReady();        

        expect(q.deferreds[0].resolve).toHaveBeenCalled();
    }));

    it('whenReady keeps track of all promises made', inject(function (appStatusSvc) {
        //request a few promises
        q.setupDefer();
        appStatusSvc.whenReady();
        q.setupDefer();
        appStatusSvc.whenReady();
        q.setupDefer();
        appStatusSvc.whenReady();

        expect(q.deferreds.length).toBe(3);
    }));

    it('isReady resolves all promises if arg true', inject(function (appStatusSvc) {
        //request a few promises
        q.setupDefer();
        appStatusSvc.whenReady();
        q.setupDefer();
        appStatusSvc.whenReady();
        q.setupDefer();
        appStatusSvc.whenReady();

        q.deferreds.forEach(function (dfd) {
            spyOn(dfd,"resolve");            
        });

        appStatusSvc.isReady(true);

        q.deferreds.forEach(function (dfd) {
            expect(dfd.resolve).toHaveBeenCalled();
        });
        
    }));
    
    it('isReady does not resolve promises if arg false', inject(function (appStatusSvc) {
        q.setupDefer();
        appStatusSvc.whenReady();
        q.setupDefer();
        appStatusSvc.whenReady();
        q.setupDefer();
        appStatusSvc.whenReady();

        q.deferreds.forEach(function (dfd) {
            spyOn(dfd, "resolve");
        });

        appStatusSvc.isReady(false);

        q.deferreds.forEach(function (dfd) {
            expect(dfd.resolve).not.toHaveBeenCalled();
        });
    }));

    it('isReady sets ready = arg', inject(function (appStatusSvc) {
        appStatusSvc.isReady(true);

        expect(appStatusSvc.ready).toBe(true);
    }));

    it('isReady does nothing if ready === arg', inject(function (appStatusSvc) {
        appStatusSvc.isReady(true);
        q.setupDefer();
        appStatusSvc.whenReady();
        spyOn(q.deferreds[0], "resolve");

        appStatusSvc.isReady(true);

        expect(q.deferreds[0].resolve).not.toHaveBeenCalled();
    }));

    //Teardown
    afterEach(function () {
       
    });
});