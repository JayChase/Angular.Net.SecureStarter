'use strict';

describe('app.Core appActivityService', function () {
    var mockQ, mockRootScope;

    beforeEach(module('app.core'));
    
    beforeEach(function () {
        
        module(function ($provide) {
            mockQ = sinon.stub({
                reject: function () { }
            });
            
            mockRootScope = sinon.stub({
                $broadcast: function () { }
            });
            
            $provide.value('$q', mockQ);
            $provide.value('$rootScope', mockRootScope);
        });
                       
        });   
    
    it('Initially isBusy is false', inject(function (appActivityService) {        
        expect(appActivityService.info.isBusy).toBe(false);
    }));
    
    it('Initially isBusy is false', inject(function (appActivityService) {
            expect(appActivityService.info.isBusy).toBe(false);
        }));

    it('After calling busy(value) isBusy is true', inject(function (appActivityService) {
        appActivityService.busy("test");
        expect(appActivityService.info.isBusy).toBe(true);
    }));

    it('busy(undefined or null) throws error', inject(function (appActivityService) {        
        expect(appActivityService.busy).toThrow({ name: 'Error', message: 'A valid activity name must be provided.' });
    }));

    it('idel(undefined or null) throws error', inject(function (appActivityService) {
        expect(appActivityService.idle).toThrow({ name: 'Error', message: 'A valid activity name must be provided.' });
    }));

    it('isBusy false to true raises appActivityService:isBusyChanged', inject(function (appActivityService) {
        appActivityService.busy("test");            
        expect(mockRootScope.$broadcast.calledWith('appActivityService:isBusyChanged', { busy: true })).toBe(true);        
    }));

    it('isBusy true to false raises appActivityService:isBusyChanged', inject(function (appActivityService) {
        appActivityService.busy("test");
        appActivityService.idle("test");

        expect(mockRootScope.$broadcast.calledWith('appActivityService:isBusyChanged', { busy: false })).toBe(true);
    }));
    
    it('Multiple isBusy true calls raises appActivityService:isBusyChanged once only', inject(function (appActivityService) {
        appActivityService.busy("test");
        appActivityService.busy("test1");

        expect(mockRootScope.$broadcast.calledOnce).toBe(true);
    }));

    it('One of many busy activities set to idle isBusy still true', inject(function (appActivityService) {
        appActivityService.busy("test");
        appActivityService.busy("test1");
        appActivityService.idle("test1");

        expect(appActivityService.info.isBusy).toBe(true);
    }));

    it('All of many busy activities set to idle isBusy now false', inject(function (appActivityService) {
        appActivityService.busy("test");
        appActivityService.busy("test1");
        appActivityService.idle("test1");
        appActivityService.idle("test2");

        expect(appActivityService.info.isBusy).toBe(false);
    }));

    it('Reset resets to false', inject(function (appActivityService) {
        appActivityService.busy("test");
        appActivityService.busy("test1");
        appActivityService.reset();

        expect(appActivityService.info.isBusy).toBe(false);
    }));

    //Teardown
    afterEach(function () {
       
    });
});