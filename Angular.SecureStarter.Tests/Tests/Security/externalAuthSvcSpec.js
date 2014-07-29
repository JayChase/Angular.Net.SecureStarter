/// <reference path="../../scripts/sinon-1.9.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery-2.1.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery.utilities.js" />
/// <reference path="../../../angular.securestarter/scripts/angular.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-animate.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-mocks.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-route.js" />
/// <reference path="../../../angular.securestarter/app/app.js" />
/// <reference path="../../../angular.securestarter/app/core/core.js" />
/// <reference path="../../../angular.securestarter/app/core/storagesvc.js" />
/// <reference path="../../../angular.securestarter/app/security/security.js" />
/// <reference path="../../../angular.securestarter/app/security/securehttpinterceptor.js" />
/// <reference path="../../../angular.securestarter/app/security/externalAuthSvc.js" />

//Test suite
describe('security externalAuthSvc', function () {
    'use strict';

    var mockNotifierSvc, userSvcMock;

    //Setup
    beforeEach(function () {
        module('app.security');

        module(function ($provide) {
            
            $provide.value("restoreUserSvc", sinon.stub({
                restore: function () { }
            }));

            userSvcMock = {
                succeed: true,
                signIn: function () {
                    var that = this;
                    this.called = true;

                    var thenF = function (success, failure, nofity) {
                        if (that.succeed) {
                            success();
                        } else {
                            failure({ error: "failure" });
                        }
                    };

                    return {
                        then: thenF
                    };
                },
                username: "user"
            };

            var ass = sinon.stub({
                isReady: function () { },
                whenReady: function () { }
            });

            ass.whenReady.returns({
                'finally': function(fn){return fn();}
            });


            $provide.value("appActivitySvc", sinon.stub({
                busy: function () { },
                idle: function () { }
            }));

            $provide.value("userSvc", userSvcMock);

            $provide.value("appStatusSvc", ass);

            $provide.value('notifierSvc', mockNotifierSvc);
            
            $provide.value('appSettingsSvc', {siteUrl: 'testUrl'});
        });
        
       

        inject(function () {
           
        });
    });

    //Spec - 1
    it('start', inject(function (externalAuthSvc) {
       
       

        expect(true).toEqual(true);
    }));

    it('handleAuthResponse calls isBusy with handleAuthResponse', inject(function (externalAuthSvc, appActivitySvc) {

        externalAuthSvc.handleAuthResponse();

        expect(appActivitySvc.busy.calledWith('externalAuthSvc')).toEqual(true);
    }));

    

    //Teardown
    afterEach(function () {

    });
});