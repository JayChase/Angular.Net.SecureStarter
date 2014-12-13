'use strict';

describe('app.Core storageService', function () {
    
    
    beforeEach(function () {
        module('app.core');     
    });   
    
    it('if persist store saves value in localStorage', inject(function (storageService) {
            spyOn(localStorage, 'setItem');
            storageService.store("test", "testValue", true);
            
            expect(localStorage.setItem).toHaveBeenCalledWith("test", "testValue");
        }));
    
    it('if not persist store does not save value in localStorage', inject(function (storageService) {
            spyOn(localStorage, 'setItem');
            storageService.store("test", "testValue", false);
            
            expect(localStorage.setItem).not.toHaveBeenCalledWith("test", "testValue");
        }));
    
    it('if not persist store saves value in sessionStorage', inject(function (storageService) {
            spyOn(sessionStorage, 'setItem');
            storageService.store("test", "testValue", false, false);
            
            expect(sessionStorage.setItem).toHaveBeenCalledWith("test", "testValue");
        }));
    
    it('if value is object store stringifies value', inject(function (storageService) {
            spyOn(sessionStorage, 'setItem');
            spyOn(JSON, 'stringify');
            storageService.store("test", {}, false);
            
            expect(JSON.stringify).toHaveBeenCalledWith({});
        }));
    
    it('if value is not object store does not stringify value', inject(function (storageService) {
            spyOn(sessionStorage, 'setItem');
            spyOn(JSON, 'stringify');
            storageService.store("test", "testValue", false);
            
            expect(JSON.stringify).not.toHaveBeenCalledWith({});
        }));
    
    it('retrieve parses object value', inject(function (storageService) {
            spyOn(localStorage, 'getItem').and.callFake(function (key) { return JSON.parse({ test: "testValue" }); });
            spyOn(JSON, 'parse');
            storageService.retrieve("test");
            
            expect(JSON.parse).toHaveBeenCalledWith({ test: "testValue" });
        }));
    
    it('retrieve does not parse non object value', inject(function (storageService) {
            spyOn(localStorage, 'getItem').and.callFake(function (key) { return "testValue"; });
            spyOn(JSON, 'parse');
            storageService.retrieve("test");
            
            expect(JSON.parse).not.toHaveBeenCalledWith({ test: "testValue" });
        }));
    
    it('retrieve returns value from localStorage', inject(function (storageService) {
            spyOn(localStorage, 'getItem');
            storageService.retrieve("test");
            
            expect(localStorage.getItem).toHaveBeenCalledWith("test");
        }));
    
    it('retrieve returns value from sessionStorage', inject(function (storageService) {
            spyOn(localStorage, 'getItem').and.callFake(function (key) { return null; });
            spyOn(sessionStorage, 'getItem');
            storageService.retrieve("test");
            
            expect(sessionStorage.getItem).toHaveBeenCalledWith("test");
        }));
    
    it('retrieve returns value from localStorage if same key exists in session storage', inject(function (storageService) {
            spyOn(localStorage, 'getItem').and.callFake(function (key) { return "local"; });
            spyOn(sessionStorage, 'getItem').and.callFake(function (key) { return "session"; });
            var result = storageService.retrieve("test");
            
            expect(result).toEqual("local");
        }));
    
    it('remove deletes item from sessionStorage', inject(function (storageService) {
            spyOn(sessionStorage, 'removeItem');
            storageService.remove("test");
            
            expect(sessionStorage.removeItem).toHaveBeenCalledWith("test");
        }));
    
    it('remove deletes item from localStorage', inject(function (storageService) {
            spyOn(localStorage, 'removeItem');
            storageService.remove("test");
            
            expect(localStorage.removeItem).toHaveBeenCalledWith("test");
        }));
    
    it('clear clears localStorage', inject(function (storageService) {
            spyOn(localStorage, 'clear');
            storageService.clear();
            
            expect(localStorage.clear).toHaveBeenCalled();
        }));
    
    it('clear clears sessionStorage', inject(function (storageService) {
            spyOn(sessionStorage, 'clear');
            storageService.clear();
            
            expect(sessionStorage.clear).toHaveBeenCalled();
        }));
    
    
    it('if sessionOnly clear does not touch localStorage', inject(function (storageService) {
            spyOn(localStorage, 'clear');
            storageService.clear(true);
            
            expect(localStorage.clear).not.toHaveBeenCalled();
        }));
    
    it('save session backs up localStorage to sessionStorage', inject(function (storageService) {
            spyOn(angular, "extend");
            
            storageService.saveSession();
            
            expect(angular.extend).toHaveBeenCalled();
        }));

    //Teardown
    afterEach(function () {
       
    });
});