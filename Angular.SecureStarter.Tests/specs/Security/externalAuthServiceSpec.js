//'use strict';

//describe('app.Core externalAuthService', function () {
//    var userServiceMock;
    
//    beforeEach(function () {
//        module('app.security');

//        module(function ($provide) {
            
//            $provide.value("restoreUserService", sinon.stub({
//                    restore: function () { }
//                }));
            
//            userServiceMock = {
//                succeed: true,
//                signIn: function () {
//                    var that = this;
//                    this.called = true;
                    
//                    var thenF = function (success, failure, nofity) {
//                        if (that.succeed) {
//                            success();
//                        } else {
//                            failure({ error: "failure" });
//                        }
//                    };
                    
//                    return {
//                        then: thenF
//                    };
//                },
//                username: "user"
//            };
            
//            var ass = sinon.stub({
//                isReady: function () { },
//                whenReady: function () { }
//            });
            
//            ass.whenReady.returns({
//                'finally': function (fn) { return fn(); }
//            });
            
            
//            $provide.value("appActivitySvc", sinon.stub({
//                    busy: function () { },
//                    idle: function () { }
//                }));
            
//            $provide.value("userService", userServiceMock);
            
//            $provide.value("appStatusSvc", ass);
            
//            $provide.value('notifierSvc', mockNotifierSvc);
            
//            $provide.value('appSettingsService', { siteUrl: 'testUrl' });
//        });
//    });   
    
//    it('start', inject(function (externalAuthService) {
            
//            expect(true).toEqual(true);
//        }));
    
//    it('handleAuthResponse calls isBusy with handleAuthResponse', inject(function (externalAuthService, appActivityService) {
            
//            externalAuthSvc.handleAuthResponse();
            
//            expect(appActivitySvc.busy.calledWith('externalAuthService')).toEqual(true);
//        }));
    
//    //Teardown
//    afterEach(function () {
       
//    });
//});