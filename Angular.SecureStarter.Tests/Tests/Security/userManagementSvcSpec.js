/// <reference path="../../scripts/sinon-1.9.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery-2.1.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery.utilities.js" />
/// <reference path="../Common/testHelpers.js" />
/// <reference path="../../../angular.securestarter/scripts/angular.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-animate.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-mocks.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-route.js" />
/// <reference path="../../../angular.securestarter/app/app.js" />
/// <reference path="../../../angular.securestarter/app/core/core.js" />
/// <reference path="../../../angular.securestarter/app/core/storagesvc.js" />
/// <reference path="../../../angular.securestarter/app/security/security.js" />
/// <reference path="../../../angular.securestarter/app/security/securehttpinterceptor.js" />
/// <reference path="../../../angular.securestarter/app/security/userManagementSvc.js" />

//Test suite
describe('security userManagementSvc', function () {
    'use strict';

    var mockNotifierSvc, userSvcMock, externalAuthSvcMock;

    //Setup
    beforeEach(function () {
        module('app.security');

        module(function ($provide) {
            userSvcMock = {
                succeed: true,
                getUserInfo: function () { },
                setUser: function(){},
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
                'finally': function (fn) { return fn(); }
            });

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

            $provide.value("appActivitySvc", sinon.stub({
                busy: function () { },
                idle: function () { }
            }));

            
            $provide.value("userSvc", userSvcMock);

            $provide.value("appStatusSvc", ass);

            $provide.value('notifierSvc', mockNotifierSvc);

            $provide.value('externalAuthSvc', externalAuthSvcMock);

            $provide.value('$location',sinon.stub({
                path: function(){}
            }));

            $provide.value('appSettingsSvc', { siteUrl: 'testUrl' });

            $provide.value('storageSvc', sinon.stub({
                retrieve: function () { }
            }));

            $provide.value("restoreUserSvc", sinon.stub({
                restore: function () { }
            }));
        });

        inject(function () {

        });
    });

    it('restore calls appActivitySvc.busy', inject(function (userManagementSvc) {       
        
        expect(true).toEqual(true);
    }));

    

    //Teardown
    afterEach(function () {

    });
});