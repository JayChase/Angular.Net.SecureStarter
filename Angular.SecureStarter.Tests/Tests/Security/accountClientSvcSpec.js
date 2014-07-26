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
/// <reference path="../../../angular.securestarter/app/security/accountclientsvc.js" />

'use strict';

//Test suite
describe('security accountClientSvc', function () {
    var  mockNotifierSvc, externalAuthSvcMock;

    //Setup
    beforeEach(function () {
        module('app.security');

        //mockUserSvc = sinon.stub({
        //    signedIn: true,
        //    roles: []
        //});

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

            $provide.value("restoreUserSvc", sinon.stub({
                restore: function () { }
            }));

            var ass = sinon.stub({
                isReady: function () { },
                whenReady: function () { }
            });

            ass.whenReady.returns({
                'finally': function(fn){return fn();}
            });

            $provide.value("appStatusSvc", ass);

            $provide.value('notifierSvc', mockNotifierSvc);
            
            $provide.value('appSettingsSvc', {siteUrl: 'testUrl'});
        });
        
       

        inject(function ($route, $location) {
           
        });
    });

    //Spec - 1
    it('addExternalLogin success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/addexternallogin').respond({status: 200});

        var result;

        accountClientSvc.addExternalLogin({}).then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('addExternalLogin error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/addexternallogin').respond(400);

        var result;

        accountClientSvc.addExternalLogin({}).then(null,function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'Add external login failed. ' });
    }));

    it('removeLogin success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/removelogin').respond({ status: 200 });

        var result;

        accountClientSvc.removeLogin({}).then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('removeLogin error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/removelogin').respond(400);

        var result;

        accountClientSvc.removeLogin({}).then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'Remove login failed. ' });
    }));

    it('register success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/register').respond({ status: 200 });

        var result;

        accountClientSvc.register({}).then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('register error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/register').respond(400);

        var result;

        accountClientSvc.register({}).then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'registration failed with the error(s): ' });
    }));

    it('registerExternal success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/registerexternal').respond({ status: 200 });

        var result;

        accountClientSvc.registerExternal({}).then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('registerExternal error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/registerexternal').respond(400);

        var result;

        accountClientSvc.registerExternal({}).then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'registration failed with the error(s): ' });
    }));

    it('login success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/token').respond({ status: 200 });

        var result;

        accountClientSvc.login({}).then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('login error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/token').respond(400);

        var result;

        accountClientSvc.login({}).then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'login failed. ' });
    }));

    it('logout success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/logout').respond({ status: 200 });

        var result;

        accountClientSvc.logout({}).then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('logout error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/logout').respond(400);

        var result;

        accountClientSvc.logout({}).then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'logout failed. ' });
    }));

    it('setPassword success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/setpassword').respond({ status: 200 });

        var result;

        accountClientSvc.setPassword({}).then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('setPassword error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/setpassword').respond(400);

        var result;

        accountClientSvc.setPassword({}).then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'Set password failed. ' });
    }));

    it('changePassword success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/changepassword').respond({ status: 200 });

        var result;

        accountClientSvc.changePassword({}).then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('changePassword error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('POST', '/api/account/changepassword').respond(400);

        var result;

        accountClientSvc.changePassword({}).then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'Change password failed. ' });
    }));

    it('getExternalLogins success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('GET', '/api/Account/externallogins?returnUrl=testUrl%2Ftest&generateState=false').respond({ status: 200 });

        var result;

        accountClientSvc.getExternalLogins("/test").then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('getExternalLogins error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('GET', '/api/Account/externallogins?returnUrl=testUrl%2Ftest&generateState=false').respond(400);

        var result;

        accountClientSvc.getExternalLogins("/test").then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'Failed to get external logins. ' });
    }));

    it('getExternalLogin success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('GET', '/api/Account/externallogins?returnUrl=testUrl%2Ftest&provider=test&generateState=false').respond({ status: 200 });

        var result;

        accountClientSvc.getExternalLogin("/test","test").then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('getExternalLogin error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('GET', '/api/Account/externallogins?returnUrl=testUrl%2Ftest&provider=test&generateState=false').respond(400);

        var result;

        accountClientSvc.getExternalLogin("/test","test").then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'Failed to get external login. ' });
    }));

    it('getUserInfo success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('GET', '/api/account/userinfo').respond({ status: 200 });

        var result;

        accountClientSvc.getUserInfo().then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('getUserInfo error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('GET', '/api/account/userinfo').respond(400);

        var result;

        accountClientSvc.getUserInfo().then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'Failed to load data. ' });
    }));

    it('getManageInfo success resolves with result { result: "success" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('GET', '/api/account/manageinfo?returnUrl=%2Ftest&generateState=false').respond({ status: 200 });

        var result;

        accountClientSvc.getManageInfo("/test").then(function (r) {
            result = r;
        });

        $httpBackend.flush();

        expect(result).toEqual({ result: "success" });
    }));

    it('getManageInfo error rejects with result { result: "failure" }', inject(function (accountClientSvc, $httpBackend) {
        $httpBackend.when('GET', '/api/account/manageinfo?returnUrl=%2Ftest&generateState=false').respond(400);

        var result;

        accountClientSvc.getManageInfo("/test").then(null, function (r) {
            result = r;
        });
        $httpBackend.flush();

        expect(result).toEqual({ result: 'failure', error: 'Failed to load data. ' });
    }));

    //Teardown
    afterEach(function () {

    });
});