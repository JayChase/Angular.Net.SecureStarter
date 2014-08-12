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

    var mockNotifierSvc, userSvcMock, externalAuthSvcMock, manageInfoResult;

    //Setup
    beforeEach(function () {
        module('app.security');

        module(function ($provide) {

            manageInfoResult = {
                result: "success",
                data: {
                    externalLoginProviders: [{ loginProvider: "prov1" }, { loginProvider: "prov2" }, { loginProvider: "prov3" }],
                    logins: [{ loginProvider: "prov3" }],
                    localLoginProvider: "localLoginProviderName"
                }
            };

            userSvcMock = {
                succeed: true,
                getManageInfo: function () { },
                getUserInfo: function () { },
                setUser: function () { },
                setPassword: function () { },
                addLocalLogin: function () { },
                removeLogin: function () { },
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
                info: {
                    username: "user"
                }
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

            $provide.value('notifierSvc', sinon.stub({
                show: function () { }
            }));

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

    it('load calls appActivitySvc.busy', inject(function (userManagementSvc, userSvc, appActivitySvc) {
        
        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, manageInfoResult));

        userManagementSvc.load();

        expect(appActivitySvc.busy.calledWith("userManagementSvc")).toEqual(true);
    }));

    it('load calls appActivitySvc.busy on userSvc.getManageInfo success', inject(function (userManagementSvc, userSvc, appActivitySvc) {

        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, manageInfoResult));

        userManagementSvc.load();

        expect(appActivitySvc.idle.calledWith("userManagementSvc")).toEqual(true);
    }));

    it('load calls appActivitySvc.busy on userSvc.getManageInfo fail', inject(function (userManagementSvc, userSvc, appActivitySvc) {

        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(false, manageInfoResult));

        userManagementSvc.load();

        expect(appActivitySvc.idle.calledWith("userManagementSvc")).toEqual(true);
    }));

    it('load calls userSvc.getManageInfo with returnUrl /externalauth/association', inject(function (userManagementSvc, userSvc) {
        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(false, manageInfoResult));

        userManagementSvc.load();

        expect(userSvc.getManageInfo).toHaveBeenCalledWith("/externalauth/association",false);
    }));

    it('load on userSvc.getManageInfo success pushes results onto userLogins and loginProviders', inject(function (userManagementSvc, userSvc) {
        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, manageInfoResult));

        userManagementSvc.load();

        expect(userManagementSvc.loginProviders.length === 3 && userManagementSvc.userLogins.length === 1).toEqual(true);
    }));

    it('load on userSvc.getManageInfo success pushes clears existing userLogins and loginProviders', inject(function (userManagementSvc, userSvc) {
        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, manageInfoResult));

        userManagementSvc.load();
        userManagementSvc.load();

        expect(userManagementSvc.loginProviders.length === 3 && userManagementSvc.userLogins.length === 1).toEqual(true);
    }));

    it('load on userSvc.getManageInfo fail notifies error', inject(function (userManagementSvc, userSvc, notifierSvc) {
        var result = $.extend({},
            { result: "failure", error: "test error" },
            manageInfoResult
            );

        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(false,result));

        userManagementSvc.load();

        expect(notifierSvc.show.calledWith({ message: "test error", type: "error" })).toEqual(true);
    }));

    it('load updates hasLocalLogin', inject(function (userManagementSvc, userSvc) {
        manageInfoResult.data.logins.push({ loginProvider: "localLoginProviderName" });

        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, manageInfoResult));

        userManagementSvc.load();

        expect(userManagementSvc.info.hasLocalLogin).toEqual(true);
    }));

    it('load updates moreLoginsAvailable', inject(function (userManagementSvc, userSvc) {
        manageInfoResult.data.logins.push({ loginProvider: "localLoginProviderName" });

        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, manageInfoResult));

        userManagementSvc.load();

        expect(userManagementSvc.info.moreLoginsAvailable).toEqual(true);
    }));

    it('changePassword calls userSvc.setPassword with args', inject(function (userManagementSvc, userSvc) {
        var args = { name: "test" };
        spyOn(userSvc, "setPassword").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.changePassword(args);

        expect(userSvc.setPassword).toHaveBeenCalledWith(args);
    }));

    it('addLocalLogin calls userSvc.addLocalLogin with externalLogin', inject(function (userManagementSvc, userSvc) {
        var args = { loginProvider: "test" };
        spyOn(userSvc, "addLocalLogin").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.addLocalLogin(args);

        expect(userSvc.addLocalLogin).toHaveBeenCalledWith(args);
    }));

    it('addLocalLogin calls userSvc.addLocalLogin successful notifies', inject(function (userManagementSvc, userSvc, notifierSvc) {
        var args = { loginProvider: "test" };
        spyOn(userSvc, "addLocalLogin").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.addLocalLogin(args);

        expect(notifierSvc.show.called).toEqual(true);
    }));

    it('addLocalLogin calls userSvc.addLocalLogin successful adds login to userLogins', inject(function (userManagementSvc, userSvc) {
        var args = { loginProvider: "test" };
        spyOn(userSvc, "addLocalLogin").and.callFake(testHelpers.fakePromise(true, args));

        var beforeCount = userManagementSvc.userLogins.length;

        userManagementSvc.addLocalLogin(args);

        expect(beforeCount === userManagementSvc.userLogins.length -1).toEqual(true);
    }));

    it('addLocalLogin calls userSvc.addLocalLogin successful sets info.hasLocalLogin true', inject(function (userManagementSvc, userSvc) {
        var args = { loginProvider: "localLoginProviderName" };
        spyOn(userSvc, "addLocalLogin").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.addLocalLogin(args);

        expect(userManagementSvc.info.hasLocalLogin).toEqual(true);
    }));

    it('addLocalLogin calls userSvc.addLocalLogin fail sets info.hasLocalLogin false', inject(function (userManagementSvc, userSvc) {
        var args = { loginProvider: "localLoginProviderName" };
        spyOn(userSvc, "addLocalLogin").and.callFake(testHelpers.fakePromise(false, args));

        userManagementSvc.addLocalLogin(args);

        expect(userManagementSvc.info.hasLocalLogin).toEqual(false);
    }));

    it('removeLogin calls appActivitySvc.busy', inject(function (userManagementSvc, userSvc, appActivitySvc) {
        var args = { loginProvider: "localLoginProviderName" };
        spyOn(userSvc, "removeLogin").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.removeLogin(args);

        expect(appActivitySvc.busy.called).toEqual(true);
    }));

    it('removeLogin notifies success', inject(function (userManagementSvc, userSvc, notifierSvc) {
        var args = { loginProvider: "localLoginProviderName" };
        spyOn(userSvc, "removeLogin").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.removeLogin(args);

        expect(notifierSvc.show.calledWith({ message: "localLoginProviderName login removed.", type: "info" })).toEqual(true);
    }));

    it('removeLogin calls appActivitySvc.idle on userSvc.removeLogin success', inject(function (userManagementSvc, userSvc, appActivitySvc) {
        var args = { loginProvider: "localLoginProviderName" };
        spyOn(userSvc, "removeLogin").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.removeLogin(args);

        expect(appActivitySvc.idle.called).toEqual(true);
    }));

    it('removeLogin calls appActivitySvc.idle on userSvc.removeLogin fail', inject(function (userManagementSvc, userSvc, appActivitySvc) {
        var args = { loginProvider: "localLoginProviderName" };
        spyOn(userSvc, "removeLogin").and.callFake(testHelpers.fakePromise(false, args));

        userManagementSvc.removeLogin(args);

        expect(appActivitySvc.idle.called).toEqual(true);
    }));

    it('removeLogin userSvc.removeLogin success removes login from userLogins', inject(function (userManagementSvc, userSvc) {
        var args = { loginProvider: "prov3" };
        spyOn(userSvc, "removeLogin").and.callFake(testHelpers.fakePromise(true, args));
        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, manageInfoResult));

        userManagementSvc.load();

        userManagementSvc.removeLogin(args);

        expect(userManagementSvc.userLogins.length === 0).toEqual(true);
    }));

    it('removeLogin userSvc.removeLogin success removes sets info.hasLocalLogin false if login was local', inject(function (userManagementSvc, userSvc) {
        manageInfoResult.data.logins.push({ loginProvider: "localLoginProviderName" });

        var args = { loginProvider: "localLoginProviderName" };
        spyOn(userSvc, "removeLogin").and.callFake(testHelpers.fakePromise(true, args));
        spyOn(userSvc, "getManageInfo").and.callFake(testHelpers.fakePromise(true, manageInfoResult));

        userManagementSvc.load();

        var before = userManagementSvc.info.hasLocalLogin;

        userManagementSvc.removeLogin(args);

        expect(userManagementSvc.info.hasLocalLogin !== before && userManagementSvc.info.hasLocalLogin === false).toEqual(true);
    }));

    it('removeLogin userSvc.removeLogin success notifies', inject(function (userManagementSvc, userSvc, notifierSvc) {
        var args = { loginProvider: "prov3" };
        spyOn(userSvc, "removeLogin").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.removeLogin(args);

        expect(notifierSvc.show.called).toEqual(true);
    }));

    it('removeLogin userSvc.removeLogin fail notifies', inject(function (userManagementSvc,userSvc, notifierSvc) {
        var args = { loginProvider: "prov3" };
        spyOn(userSvc, "removeLogin").and.callFake(testHelpers.fakePromise(true, args));

        userManagementSvc.removeLogin(args);

        expect(notifierSvc.show.called).toEqual(true);
    }));

    //Teardown
    afterEach(function () {

    });
});