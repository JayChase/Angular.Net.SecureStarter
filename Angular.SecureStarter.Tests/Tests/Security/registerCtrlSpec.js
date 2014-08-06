/// <reference path="../../scripts/sinon-1.9.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery-2.1.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery.utilities.js" />
/// <reference path="../../../angular.securestarter/scripts/angular.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-animate.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-mocks.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-route.js" />
/// <reference path="../../../angular.securestarter/scripts/toastr.js" />
/// <reference path="../../../angular.securestarter/app/app.js" />
/// <reference path="../../../angular.securestarter/app/core/core.js" />
/// <reference path="../../../angular.securestarter/app/core/notifiersvc.js" />
/// <reference path="../../../angular.securestarter/app/core/navigationsvc.js" />
/// <reference path="../../../angular.securestarter/app/core/storagesvc.js" />
/// <reference path="../../../angular.securestarter/app/security/security.js" />
/// <reference path="../../../angular.securestarter/app/security/securehttpinterceptor.js" />
/// <reference path="../../../angular.securestarter/app/security/usersvc.js" />
/// <reference path="../../../angular.securestarter/app/security/accountclientsvc.js" />
/// <reference path="../../../angular.securestarter/app/security/registerCtrl.js" />

//Test suite
describe('security registerCtrl', function () {
    'use strict';

    var scope, controller, userSvcMock, externalAuthSvcMock;

    beforeEach(function () {
        module('app.security');

        module(function ($provide) {
            externalAuthSvcMock = {
                succeed: true,
                info: undefined,
                getRegistrationInfo: function(){                
                    return this.info;
                },
                handleAuthResponse: function () {
                    var that = this;

                    return {
                        then: function (fn1, fn2) {
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
                  
            userSvcMock = {
                succeed: true,
                succeedSignIn: true,
                result: {},
                signIn: function () {
                    var that = this;

                    return {
                        then: function (fn1, fn2) {
                            if (that.succeedSignIn) {
                                if (fn1) {
                                    fn1(that.result);
                                }
                            } else {
                                if (fn2) {
                                    fn2(that.result);
                                }
                            }

                            return this;
                        },
                        'finally': function () { }
                    }
                },
                register: function () {
                    var that = this;

                    return {
                        then: function (fn1, fn2, fn3) {
                            if (that.succeed) {
                                if (fn1) {
                                    fn1(that.result);
                                }
                            } else {
                                if (fn2) {
                                    fn2(that.result);
                                }
                            }

                            return this;
                        },
                        'finally': function () { }
                    };
                }
            };

            $provide.value("externalAuthSvc", externalAuthSvcMock);

            $provide.value("userSvc", userSvcMock);

            $provide.value("restoreUserSvc", sinon.stub({
                restore: function () { }
            }));

            $provide.value("appStatusSvc", sinon.stub({
                isReady: function () { }
            }));                       

            $provide.value("notifierSvc", sinon.stub({
                show: function () { }
            }));

            $provide.value("appActivitySvc", sinon.stub({
                busy: function () { },
                idle: function () { }
            }));

            $provide.value('appSettingsSvc', { siteUrl: 'testUrl' });

            $provide.value("$location", sinon.stub(
                {
                    path: function () { }
                }));
        });

        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('registerCtrl', { $scope: scope });

            scope.registration.email = "test@test.com";
            scope.registration.password = "password";
        });
    });

    it('register notifies signing in', inject(function (notifierSvc,userSvc) {
        spyOn(notifierSvc, "show");        
        scope.register();

        expect(notifierSvc.show).toHaveBeenCalled();
    }));

    it('register successful notifies success', inject(function (notifierSvc, userSvc) {
        spyOn(notifierSvc, "show");
        scope.register();
        
        //expect(notifierSvc.show).toHaveBeenCalled();
        expect(notifierSvc.show).toHaveBeenCalledWith({ message: "sucessfully registered", type: "info" });
    }));

    it('register fail notifies error', inject(function (notifierSvc, userSvc) {
        spyOn(notifierSvc, "show");
        userSvc.succeed = false;
        userSvc.result = { error: "error message" };

        scope.register();

        expect(notifierSvc.show).toHaveBeenCalledWith({ message: "error message", type: "error" });
    }));

    it('register successful calls userSvc.signIn', inject(function (userSvc) {
        spyOn(userSvc, "signIn").and.callThrough();
        scope.register();

        expect(userSvc.signIn).toHaveBeenCalledWith({ id: "test@test.com", password: "password" });
    }));

    it('register successful notifies success', inject(function (userSvc, notifierSvc) {
        //spyOn(notifierSvc, "show");
        userSvc.username = "test";

        scope.register();

        expect(notifierSvc.show.calledWith({ message: "signed in as test", type: "info" })).toEqual(true);
    }));

    it('register > signIn fail notifies error', inject(function (userSvc, notifierSvc) {
        spyOn(notifierSvc, "show");

        userSvc.result = { error: "error message" };
        userSvc.succeedSignIn = false;

        scope.register();

        expect(notifierSvc.show).toHaveBeenCalledWith({ message: "error message", type: "error" });
    }));

    //Teardown
    afterEach(function () {
    });

});