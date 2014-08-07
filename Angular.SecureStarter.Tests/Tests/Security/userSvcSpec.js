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
/// <reference path="../../../angular.securestarter/app/security/userSvc.js" />

//Test suite
describe('security userSvc', function () {
    'use strict';

    var mockNotifierSvc, userSvcMock, externalAuthSvcMock, manageInfoResult, accountClientSvcMock, rootScope;

    //Setup
    beforeEach(function () {
        module('app.security');

        module(function ($provide) {

            accountClientSvcMock = {
                login: function () { },
                logout: function () { },
                setPassword: function () { },
                removeLogin: function () { },
                getManageInfo: function () { },
                getUserInfo: function () { },
                registerExternal: function () { },
                register: function () { },
                addExternalLogin: function () { },
                getExternalLogin: function () { }
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

            $provide.value("accountClientSvc", accountClientSvcMock);

            $provide.value("appActivitySvc", sinon.stub({
                busy: function () { },
                idle: function () { }
            }));

            $provide.value("appStatusSvc", ass);

            $provide.value('notifierSvc', sinon.stub({
                show: function () { }
            }));

            $provide.value('externalAuthSvc', externalAuthSvcMock);

            $provide.value('$location',sinon.stub({
                path: function(){}
            }));

            $provide.value('$window', sinon.stub({
                location: {
                    href: ""
                }
            }));

            $provide.value('appSettingsSvc', { siteUrl: 'testUrl' });

            $provide.value('storageSvc', sinon.stub({
                store: function () { },
                retrieve: function () { },
                remove: function () { }
            }));

            $provide.value("restoreUserSvc", sinon.stub({
                restore: function () { }
            }));
        });

        inject(function ($rootScope) {
            rootScope = $rootScope;
            spyOn(rootScope, '$broadcast');
        });
    });

    
    it('signIn calls appActivitySvc busy', inject(function (userSvc, appActivitySvc, accountClientSvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "login").and.callFake(testHelpers.fakePromise(true, result));

        userSvc.signIn();

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('signIn calls appActivitySvc idle on success', inject(function (userSvc, appActivitySvc, accountClientSvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "login").and.callFake(testHelpers.fakePromise(true, result));

        userSvc.signIn();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('signIn calls appActivitySvc idle on fail', inject(function (userSvc, appActivitySvc, accountClientSvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "login").and.callFake(testHelpers.fakePromise(false, result));

        userSvc.signIn();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('signIn on success sets user', inject(function (userSvc, accountClientSvc) {
        var result = {
            data: {
                access_token: "testToken",
                userName: "test",
                email: "test"
            }
        };

        spyOn(accountClientSvc, "login").and.callFake(testHelpers.fakePromise(true, result));

        userSvc.signIn();

        expect(userSvc.info.username).toEqual("test");
    }));

    it('signIn on success stores access token', inject(function (userSvc, accountClientSvc, storageSvc) {
        var result = {
            data: {
                access_token: "testToken",
                userName: "test",
                email: "test"
            }
        };

        spyOn(accountClientSvc, "login").and.callFake(testHelpers.fakePromise(true, result));
        
        userSvc.signIn(result,false);

        expect(storageSvc.store.calledWith("accessToken", "testToken",false)).toEqual(true);
    }));

    it('signOut calls appActivitySvc busy', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "logout").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.signOut();

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('signOut calls appActivitySvc idle on success', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "logout").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.signOut();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('signOut calls appActivitySvc idle on fail', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "logout").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.signOut();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('signOut calls accountClientSvc logout', inject(function (userSvc, accountClientSvc) {
        spyOn(accountClientSvc, "logout").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.signOut();

        expect(accountClientSvc.logout).toHaveBeenCalled();
    }));

    it('signOut removes token on always', inject(function (userSvc, accountClientSvc, storageSvc) {
        spyOn(accountClientSvc, "logout").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.signOut();

        expect(storageSvc.remove.calledWith("accessToken")).toEqual(true);
    }));

    it('setPassword calls appActivitySvc busy', inject(function (userSvc, appActivitySvc, accountClientSvc) {
        spyOn(accountClientSvc, "setPassword").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.setPassword({});

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('setPassword calls appActivitySvc idle on success', inject(function (userSvc, appActivitySvc, accountClientSvc) {
        spyOn(accountClientSvc, "setPassword").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.setPassword({});

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('setPassword calls appActivitySvc idle on fail', inject(function (userSvc, appActivitySvc, accountClientSvc) {
        spyOn(accountClientSvc, "setPassword").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.setPassword({});

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('setPassword notifies on success', inject(function (userSvc, notifierSvc, accountClientSvc) {
        spyOn(accountClientSvc, "setPassword").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.setPassword({});

        expect(notifierSvc.show.called).toEqual(true);
    }));

    it('setPassword notifies on fail', inject(function (userSvc, notifierSvc, accountClientSvc) {
        spyOn(accountClientSvc, "setPassword").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.setPassword({});

        expect(notifierSvc.show.called).toEqual(true);
    }));

    it('setPassword calls accountClientSvc setPassword with args', inject(function (userSvc, accountClientSvc) {
        spyOn(accountClientSvc, "setPassword").and.callFake(testHelpers.fakePromise(true, {}));

        var args = {};

        userSvc.setPassword(args);
        expect(accountClientSvc.setPassword).toHaveBeenCalledWith(args);
    }));

    it('getManageInfo calls appActivitySvc busy', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.getManageInfo();

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('getManageInfo calls appActivitySvc idle on success', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.getManageInfo();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('getManageInfo calls appActivitySvc idle on fail', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.getManageInfo();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('getManageInfo notifies on fail', inject(function (userSvc, accountClientSvc, notifierSvc) {
        spyOn(accountClientSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.getManageInfo();

        expect(notifierSvc.show.called).toEqual(true);
    }));

    it('getManageInfo calls accountClientSvc getManageInfo with /externalauth/association', inject(function (userSvc, accountClientSvc) {
        spyOn(accountClientSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.getManageInfo();

        expect(accountClientSvc.getManageInfo).toHaveBeenCalledWith("/externalauth/association");
    }));

    it('getUserInfo calls appActivitySvc busy', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.getUserInfo();

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('getUserInfo calls appActivitySvc idle on success', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.getUserInfo();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('getUserInfo calls appActivitySvc idle on fail', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.getUserInfo();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('getUserInfo notifies on fail', inject(function (userSvc, accountClientSvc, notifierSvc) {
        spyOn(accountClientSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.getUserInfo();

        expect(notifierSvc.show.called).toEqual(true);
    }));

    it('getUserInfo calls accountClientSvc getUserInfo', inject(function (userSvc, accountClientSvc) {
        spyOn(accountClientSvc, "getUserInfo").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.getUserInfo();

        expect(accountClientSvc.getUserInfo).toHaveBeenCalled();
    }));

    it('registerExternal calls appActivitySvc busy', inject(function (userSvc, appActivitySvc, accountClientSvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "login").and.callFake(testHelpers.fakePromise(true, result));

        userSvc.signIn();

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('registerExternal calls appActivitySvc busy', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "registerExternal").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.registerExternal();

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('registerExternal calls appActivitySvc idle on success', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "registerExternal").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.registerExternal();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('registerExternal calls appActivitySvc idle on fail', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "registerExternal").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.registerExternal();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('registerExternal calls accountClientSvc registerExternal', inject(function (userSvc, accountClientSvc) {
        spyOn(accountClientSvc, "registerExternal").and.callFake(testHelpers.fakePromise(false, {}));
        var args = {};

        userSvc.registerExternal(args);

        expect(accountClientSvc.registerExternal).toHaveBeenCalledWith(args);
    }));

    it('register calls appActivitySvc idle on success', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "register").and.callFake(testHelpers.fakePromise(true, result));

        userSvc.register({},false);

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('register calls appActivitySvc idle on fail', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "register").and.callFake(testHelpers.fakePromise(true, result));

        userSvc.register({},false);

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('register calls accountClientSvc register', inject(function (userSvc, accountClientSvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "register").and.callFake(testHelpers.fakePromise(true, result));

        var args = {};
        userSvc.register(args,false);

        expect(accountClientSvc.register).toHaveBeenCalledWith(args);
    }));

    it('register calls accountClientSvc register with args', inject(function (userSvc, accountClientSvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "register").and.callFake(testHelpers.fakePromise(true, result));

        var args = {};
        userSvc.register(args,false);

        expect(accountClientSvc.register).toHaveBeenCalledWith(args);
    }));

    it('register success stores accessToken', inject(function (userSvc, accountClientSvc, storageSvc) {
        var result = {
            data: {
                access_token: "testToken"
            }
        };

        spyOn(accountClientSvc, "register").and.callFake(testHelpers.fakePromise(true, result));

        var args = {};

        userSvc.register(args,false);

        expect(storageSvc.store.calledWith("accessToken", "testToken", false)).toEqual(true);
    }));

    it('signInExternal calls appActivitySvc busy', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getExternalLogin").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.signInExternal();

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('signInExternal calls appActivitySvc idle on success', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getExternalLogin").and.callFake(testHelpers.fakePromise(true, {}));

        userSvc.signInExternal();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('signInExternal calls appActivitySvc idle on fail', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        spyOn(accountClientSvc, "getExternalLogin").and.callFake(testHelpers.fakePromise(false, {}));

        userSvc.signInExternal();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('signInExternal calls accountClientSvc signInExternal with /externalAuth', inject(function (userSvc, accountClientSvc) {
        spyOn(accountClientSvc, "getExternalLogin").and.callFake(testHelpers.fakePromise(false, {}));
        var args = {};

        userSvc.signInExternal(args);

        expect(accountClientSvc.getExternalLogin).toHaveBeenCalledWith("/externalauth", args);
    }));

    it('addExternalLogin calls appActivitySvc busy', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        var result = {
            data: {
                url: "testUrl"
            }
        }, args = {};

        spyOn(accountClientSvc, "addExternalLogin").and.callFake(testHelpers.fakePromise(false, result));

        userSvc.addExternalLogin();

        expect(appActivitySvc.busy.calledWith("userSvc")).toEqual(true);
    }));

    it('addExternalLogin calls appActivitySvc idle on success', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        var result = {
            data: {
                url: "testUrl"
            }
        }, args = {};

        spyOn(accountClientSvc, "addExternalLogin").and.callFake(testHelpers.fakePromise(false, result));

        userSvc.addExternalLogin(args);

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));

    it('addExternalLogin calls appActivitySvc idle on fail', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        var result = {
            data: {
                url: "testUrl"
            }
        }, args = {};

        spyOn(accountClientSvc, "addExternalLogin").and.callFake(testHelpers.fakePromise(false, result));

        userSvc.addExternalLogin();

        expect(appActivitySvc.idle.calledWith("userSvc")).toEqual(true);
    }));
    

    it('addExternalLogin calls accountClientSvc addExternalLogin with args', inject(function (userSvc, accountClientSvc, appActivitySvc) {
        var result = {
            data: {
                url: "testUrl"
            }
        }, args = {};

        spyOn(accountClientSvc, "addExternalLogin").and.callFake(testHelpers.fakePromise(false, result));
        
        userSvc.addExternalLogin(args);

        expect(accountClientSvc.addExternalLogin).toHaveBeenCalledWith(args);
    }));

    it('addExternalLogin success updates window url', inject(function (userSvc, accountClientSvc, $window) {
        var result = {
            data: {
                url: "testUrl"
            }
        };

        spyOn(accountClientSvc, "addExternalLogin").and.callFake(testHelpers.fakePromise(true, result));
        var args = {};

        userSvc.addExternalLogin(args);

        expect($window.location.href).toEqual("testUrl", args);
    }));

    //Teardown
    afterEach(function () {

    });
});