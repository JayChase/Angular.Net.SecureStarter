'use strict';

describe('app.Core appStatusService', function () {
    var mockQ, mockRootScope;

    beforeEach(function () {
        module('app.core');

        inject(function ($q) {
            mockQ = $q;
            mockQ.deferreds = [];
            mockQ.deferProper = mockQ.defer;
            mockQ.setupDefer = function () {
                mockQ.deferreds.push(mockQ.deferProper());
            };
            
            mockQ.defer = function () {
                return $.arrayLast(mockQ.deferreds); //always return the last promise in the array                     
            };
        });        
    });   
    
    it('whenReady returns unresolved promise if app not ready', inject(function (appStatusService) {
            mockQ.setupDefer();
            spyOn(mockQ.deferreds[0], "resolve");
            
            appStatusService.whenReady();    

            expect(mockQ.deferreds[0].resolve).not.toHaveBeenCalled();                
    }));

    it('whenReady returns ready resolved promise if app already ready', inject(function (appStatusService) {
            mockQ.setupDefer();
            spyOn(mockQ.deferreds[0], "resolve");
            
            appStatusService.isReady(true);
            appStatusService.whenReady();
            
            expect(mockQ.deferreds[0].resolve).toHaveBeenCalled();
        }));
    
    it('whenReady keeps track of all promises made', inject(function (appStatusService) {
            //remockQuest a few promises
            mockQ.setupDefer();
            appStatusService.whenReady();
            mockQ.setupDefer();
            appStatusService.whenReady();
            mockQ.setupDefer();
            appStatusService.whenReady();
            
            expect(mockQ.deferreds.length).toBe(3);
        }));
    
    it('isReady resolves all promises if arg true', inject(function (appStatusService) {
            //remockQuest a few promises
            mockQ.setupDefer();
            appStatusService.whenReady();
            mockQ.setupDefer();
            appStatusService.whenReady();
            mockQ.setupDefer();
            appStatusService.whenReady();
            
            mockQ.deferreds.forEach(function (dfd) {
                spyOn(dfd, "resolve");
            });
            
            appStatusService.isReady(true);
            
            mockQ.deferreds.forEach(function (dfd) {
                expect(dfd.resolve).toHaveBeenCalled();
            });
        
        }));
    
    it('isReady does not resolve promises if arg false', inject(function (appStatusService) {
            mockQ.setupDefer();
            appStatusService.whenReady();
            mockQ.setupDefer();
            appStatusService.whenReady();
            mockQ.setupDefer();
            appStatusService.whenReady();
            
            mockQ.deferreds.forEach(function (dfd) {
                spyOn(dfd, "resolve");
            });
            
            appStatusService.isReady(false);
            
            mockQ.deferreds.forEach(function (dfd) {
                expect(dfd.resolve).not.toHaveBeenCalled();
            });
        }));
    
    it('isReady sets ready = arg', inject(function (appStatusService) {
            appStatusService.isReady(true);
            
            expect(appStatusService.info.ready).toBe(true);
        }));
    
    it('isReady does nothing if ready === arg', inject(function (appStatusService) {
            appStatusService.isReady(true);
            mockQ.setupDefer();
            appStatusService.whenReady();
            spyOn(mockQ.deferreds[0], "resolve");
            
            appStatusService.isReady(true);
            
            expect(mockQ.deferreds[0].resolve).not.toHaveBeenCalled();
        }));


    //Teardown
    afterEach(function () {
       
    });
});