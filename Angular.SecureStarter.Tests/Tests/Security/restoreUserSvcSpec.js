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
/// <reference path="../../../angular.securestarter/app/security/restoreUserSvc.js" />

//Test suite
describe('security restoreUserSvc', function () {
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
        });

        inject(function () {

        });
    });

    it('restore calls appActivitySvc.busy', inject(function (restoreUserSvc, appActivitySvc) {       
        restoreUserSvc.restore();

        expect(appActivitySvc.busy.calledWith('restoreUserSvc')).toEqual(true);
    }));

    it('restore calls storageSvc.retrieve with param accessToken', inject(function (restoreUserSvc, storageSvc) {
        storageSvc.retrieve.returns(undefined);

        restoreUserSvc.restore();       

        expect(storageSvc.retrieve.calledWith('accessToken')).toEqual(true);
    }));

    it('restore calls appActivitySvc.idle if storageSvc.retrieve returns undefined', inject(function (restoreUserSvc, storageSvc, appActivitySvc) {
        storageSvc.retrieve.returns(undefined);

        restoreUserSvc.restore();

        expect(appActivitySvc.idle.calledWith('restoreUserSvc')).toEqual(true);
    }));

    it('restore returns a promise if storageSvc.retrieve returns undefined', inject(function (restoreUserSvc, storageSvc, $q) {
        storageSvc.retrieve.returns(undefined);
        spyOn($q, 'defer').and.callThrough();
        
        restoreUserSvc.restore();

        expect($q.defer).toHaveBeenCalled();
    }));

    it('restore returns a resolved promise if storageSvc.retrieve returns undefined', inject(function (restoreUserSvc, storageSvc, $q) {
        storageSvc.retrieve.returns(undefined);

        var promise = sinon.stub({
            resolve: function () { }
        });

        spyOn($q, 'defer').and.callFake(function () {
            return promise;
        });

        restoreUserSvc.restore();

        expect(promise.resolve.called).toEqual(true);
    }));

    it('restore calls userSvc.getUserInfo if storageSvc.retrieve returns a token', inject(function (restoreUserSvc, storageSvc, userSvc) {
        storageSvc.retrieve.returns("testToken");
        
        spyOn(userSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(true, {}));
        
        restoreUserSvc.restore();

        expect(userSvc.getUserInfo).toHaveBeenCalled();
    }));

    it('if userSvc.getUserInfo success and hasRegistered call userSvc.setUser', inject(function (restoreUserSvc, storageSvc, userSvc) {
        storageSvc.retrieve.returns("testToken");

        var fakeUser = {
            userName: "test",
            hasRegistered: true
        };

        spyOn(userSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(true, fakeUser));

        spyOn(userSvc, 'setUser');       

        restoreUserSvc.restore();

        expect(userSvc.setUser).toHaveBeenCalledWith(fakeUser);
    }));

    it('if userSvc.getUserInfo success and hasRegistered call appActivitySvc.idle', inject(function (restoreUserSvc, storageSvc, userSvc, appActivitySvc) {
        storageSvc.retrieve.returns("testToken");

        var fakeUser = {
            userName: "test",
            hasRegistered: true
        };

        spyOn(userSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(true, fakeUser));

        spyOn(userSvc, 'setUser');

        restoreUserSvc.restore();

        expect(appActivitySvc.busy.calledWith("restoreUserSvc")).toEqual(true);
    }));

    it('if userSvc.getUserInfo success and hasRegistered false call $location.path with /signIn', inject(function (restoreUserSvc, storageSvc, userSvc, $location) {
        storageSvc.retrieve.returns("testToken");

        var fakeUser = {
            userName: "test",
            hasRegistered: false
        };

        spyOn(userSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(true, fakeUser));

        restoreUserSvc.restore();

        expect($location.path.calledWith("/signIn")).toEqual(true);
    }));

    it('if userSvc.getUserInfo success and hasRegistered false call appActivitySvc.idle', inject(function (restoreUserSvc, storageSvc, userSvc, appActivitySvc) {
        storageSvc.retrieve.returns("testToken");

        var fakeUser = {
            userName: "test",
            hasRegistered: false
        };

        spyOn(userSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(true, fakeUser));

        spyOn(userSvc, 'setUser');

        restoreUserSvc.restore();

        expect(appActivitySvc.busy.calledWith("restoreUserSvc")).toEqual(true);
    }));

    //Teardown
    afterEach(function () {

    });
});