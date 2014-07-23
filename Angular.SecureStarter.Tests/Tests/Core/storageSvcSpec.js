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
/// <reference path="../../../angular.securestarter/app/core/storageSvc.js" />

'use strict';

//Test suite
describe('Core storageSvc', function () {
    var localStorageSpy;
    //Setup
    beforeEach(function () {
        module('app.core');

    });

    //Spec - 1
    it('if persist store saves value in localStorage', inject(function (storageSvc) {
        spyOn(localStorage, 'setItem');
        storageSvc.store("test","testValue",true);

        expect(localStorage.setItem).toHaveBeenCalledWith("test", "testValue");
    }));

    it('if not persist store does not save value in localStorage', inject(function (storageSvc) {
        spyOn(localStorage, 'setItem');
        storageSvc.store("test", "testValue", false);

        expect(localStorage.setItem).not.toHaveBeenCalledWith("test", "testValue");
    }));

    it('if not persist store saves value in sessionStorage', inject(function (storageSvc) {
        spyOn(sessionStorage, 'setItem');
        storageSvc.store("test", "testValue", false, false);

        expect(sessionStorage.setItem).toHaveBeenCalledWith("test", "testValue");
    }));

    it('if value is object store stringifies value', inject(function (storageSvc) {
        spyOn(sessionStorage, 'setItem');
        spyOn(JSON, 'stringify');
        storageSvc.store("test", {}, false);

        expect(JSON.stringify).toHaveBeenCalledWith({});
    }));

    it('if value is not object store does not stringify value', inject(function (storageSvc) {
        spyOn(sessionStorage, 'setItem');
        spyOn(JSON, 'stringify');
        storageSvc.store("test", "testValue", false);

        expect(JSON.stringify).not.toHaveBeenCalledWith({});
    }));

    it('retrieve parses object value', inject(function (storageSvc) {
        spyOn(localStorage, 'getItem').and.callFake(function (key) { return JSON.parse({test:"testValue"}); });
        spyOn(JSON, 'parse');        
        storageSvc.retrieve("test");

        expect(JSON.parse).toHaveBeenCalledWith({ test: "testValue" });
    }));

    it('retrieve does not parse non object value', inject(function (storageSvc) {
        spyOn(localStorage, 'getItem').and.callFake(function (key) { return "testValue"; });
        spyOn(JSON, 'parse');
        storageSvc.retrieve("test");

        expect(JSON.parse).not.toHaveBeenCalledWith({ test: "testValue" });
    }));

    it('retrieve returns value from localStorage', inject(function (storageSvc) {
        spyOn(localStorage, 'getItem');
        storageSvc.retrieve("test");

        expect(localStorage.getItem).toHaveBeenCalledWith("test");
    }));

    it('retrieve returns value from sessionStorage', inject(function (storageSvc) {
        spyOn(localStorage, 'getItem').and.callFake(function (key) { return null; });
        spyOn(sessionStorage, 'getItem');
        storageSvc.retrieve("test");

        expect(sessionStorage.getItem).toHaveBeenCalledWith("test");
    }));

    it('retrieve returns value from localStorage if same key exists in session storage', inject(function (storageSvc) {
        spyOn(localStorage, 'getItem').and.callFake(function (key) { return "local"; });
        spyOn(sessionStorage, 'getItem').and.callFake(function (key) { return "session"; });
        var result = storageSvc.retrieve("test");

        expect(result).toEqual("local");
    }));

    it('remove deletes item from sessionStorage', inject(function (storageSvc) {        
        spyOn(sessionStorage, 'removeItem');
        storageSvc.remove("test");

        expect(sessionStorage.removeItem).toHaveBeenCalledWith("test");
    }));

    it('remove deletes item from localStorage', inject(function (storageSvc) {
        spyOn(localStorage, 'removeItem');
        storageSvc.remove("test");

        expect(localStorage.removeItem).toHaveBeenCalledWith("test");
    }));

    it('clear clears localStorage', inject(function (storageSvc) {
        spyOn(localStorage, 'clear');
        storageSvc.clear();

        expect(localStorage.clear).toHaveBeenCalled();
    }));

    it('clear clears sessionStorage', inject(function (storageSvc) {
        spyOn(sessionStorage, 'clear');
        storageSvc.clear();

        expect(sessionStorage.clear).toHaveBeenCalled();
    }));


    it('if sessionOnly clear does not touch localStorage', inject(function (storageSvc) {
        spyOn(localStorage, 'clear');
        storageSvc.clear(true);

        expect(localStorage.clear).not.toHaveBeenCalled();
    }));

    it('save session backs up localStorage to sessionStorage', inject(function (storageSvc) {
        spyOn(angular, "extend");

        storageSvc.saveSession();

        expect(angular.extend).toHaveBeenCalled();
    }));

    //Teardown
    afterEach(function () {

    });
});