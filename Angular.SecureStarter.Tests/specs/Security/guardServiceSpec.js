'use strict';

describe('app.security guardService', function () {
    var mockLocation, mockRoute, mockNotifierSvc, mockuserService, mockStorageSvc, externalAuthSvcMock, mockEvent;
    
    beforeEach(module('app.security'));

    beforeEach(function () {       
        mockEvent = sinon.stub({ preventDefault: function () { } });        
        
        mockNotifierSvc = sinon.stub({ show: function (args) { } });        
       
        mockuserService = sinon.stub({
            signedIn: true,
            roles: []
        });        
        
        mockStorageSvc = sinon.stub({
            retrieve: function (args) {
                return args;
            }
        });
        

        mockLocation = {            
            path: function (){         
            }
        };
        
        mockRoute = {
            routes: JSON.parse('{"/welcome":{"reloadOnSearch":true,"templateUrl":"app/content/welcome/welcome.html","controller":"welcomeController","showNav":"welcome","originalPath":"/welcome","regexp":{},"keys":[]},"/welcome/":{"redirectTo":"/welcome","originalPath":"/welcome/","regexp":{},"keys":[]},"/features":{"reloadOnSearch":true,"templateUrl":"app/content/features/features.html","controller":"featuresController","showNav":"features","originalPath":"/features","regexp":{},"keys":[]},"/features/":{"redirectTo":"/features","originalPath":"/features/","regexp":{},"keys":[]},"/register":{"reloadOnSearch":true,"templateUrl":"app/security/register.html","controller":"registerController","originalPath":"/register","regexp":{},"keys":[]},"/register/":{"redirectTo":"/register","originalPath":"/register/","regexp":{},"keys":[]},"/signIn":{"reloadOnSearch":true,"templateUrl":"app/security/signIn.html","controller":"signInCtrl","originalPath":"/signIn","regexp":{},"keys":[]},"/signIn/":{"redirectTo":"/signIn","originalPath":"/signIn/","regexp":{},"keys":[]},"null":{"reloadOnSearch":true,"redirectTo":"/welcome"}}')
        };
        
        module(function ($provide) {
            externalAuthSvcMock = {
                succeed: true,
                handleAuthResponse: function () {
                    var that = this;
                    
                    return {
                        then: function (fn1, fn2, fn3) {
                            if (that.succeed) {
                                if (fn1) {
                                    fn1();
                                }
                            } else {
                                if (fn2) {
                                    fn2();
                                }
                            }
                            
                            return this;
                        },
                        'finally': function () { }
                    };
                }
            };
            
            $provide.value("externalAuthSvc", externalAuthSvcMock);
            
            $provide.value("restoreUserService", sinon.stub({
                    restore: function () { }
                }));
            
            var ass = sinon.stub({
                isReady: function () { },
                whenReady: function () { }
            });
            
            ass.whenReady.returns({
                'finally': function (fn) { return fn(); }
            });
            
            $provide.value("appStatusSvc", ass);            
            $provide.value('notifierSvc', mockNotifierSvc);
            $provide.value('userService', mockuserService);
            $provide.value('$route', mockRoute);
            $provide.value('$location', mockLocation);
        });      
    });   
    
    //TODO this all needs changing for new functionality
    it('if path does not match any routes does not re-route', inject(function (guardService) {
            spyOn(mockLocation, "path").and.returnValue("/fakeUnknownRoute");            
            
            guardService.guardRoute(mockEvent);
            
            expect(mockLocation.path).not.toHaveBeenCalledWith("/signIn");;
        }));
    
    //Teardown
    afterEach(function () {
       
    });
});