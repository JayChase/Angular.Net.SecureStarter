'use strict';

describe('app.Core notifierService', function () {
    
    
    beforeEach(function () {
        module('app.core');     
    });   
    
    it('if show argument is a string notifier uses defaults with the string as a message.', inject(function (notifierService) {           
            notifierService.show("message string");            
            expect(toastr.info.withArgs("message string","").calledOnce).toBe(true);
        }));
    
    it('if verbose true then add detail to the message.', inject(function (notifierService) {            
            notifierService.show({
                message: "verbose true",
                detail: "and details"
            });
            
            expect(toastr.info.withArgs("verbose true and details", "").calledOnce).toBe(true);
        }));
    
    it('if verbose false then no detail added to the message.', inject(function (notifierService) {            
            notifierService.verbose = false;            
            notifierService.show({
                message: "verbose false",
                detail: "and details"
            });
            
            expect(toastr.info.withArgs("verbose false", "").calledOnce).toBe(true);
        }));


    //Teardown
    afterEach(function () {
       
    });
});