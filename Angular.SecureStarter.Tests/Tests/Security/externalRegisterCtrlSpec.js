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
/// <reference path="../../../angular.securestarter/app/security/externalRegisterCtrl.js" />

//Test suite
describe('security externalRegisterCtrl', function () {
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
                  
            userSvcMock = {
                succeed: true,
                succeedsignIn: true,
                result: {},
                signInExternal: function () {
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
                registerExternal: function () {
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

        inject(function ($rootScope) {
            scope = $rootScope.$new();
        });
    });

    it('externalRegisterCtrl calls appActivitySvc.busy', inject(function ($controller, appActivitySvc, externalAuthSvc) {
        spyOn(appActivitySvc, "busy");
        controller = $controller('externalRegisterCtrl', { $scope: scope });

        expect(appActivitySvc.busy).toHaveBeenCalledWith("externalRegisterCtrl");
    }));
    
    it('externalRegisterCtrl calls externalAuthSvc.getRegistrationInfo on activate', inject(function ($controller, appActivitySvc, externalAuthSvc) {
        spyOn(externalAuthSvc,"getRegistrationInfo");
        controller = $controller('externalRegisterCtrl', { $scope: scope });

        expect(externalAuthSvc.getRegistrationInfo).toHaveBeenCalled();
    }));

    it('if no registration info calls appActivitySvc.idle', inject(function ($controller, appActivitySvc) {
        spyOn(appActivitySvc, "idle");
        controller = $controller('externalRegisterCtrl', { $scope: scope });

        expect(appActivitySvc.idle).toHaveBeenCalledWith("externalRegisterCtrl");
    }));

    it('if no registration info change $location path to register', inject(function ($controller, $location) {
        spyOn($location, "path");
        controller = $controller('externalRegisterCtrl', { $scope: scope });

        expect($location.path).toHaveBeenCalledWith("/register");
    }));

    it('if registration info then set scope registration to info', inject(function ($controller, externalAuthSvc) {
        externalAuthSvc.info = {
            username: "test",
            email: "test",
            loginProvider: "test"
        };

        controller = $controller('externalRegisterCtrl', { $scope: scope });

        expect(scope.registration).toEqual(externalAuthSvc.info);
    }));

    it('if registration info calls appActivitySvc.idle', inject(function ($controller, appActivitySvc) {
        spyOn(appActivitySvc, "idle");

        controller = $controller('externalRegisterCtrl', { $scope: scope });

        expect(appActivitySvc.idle).toHaveBeenCalledWith("externalRegisterCtrl");
    }))

    it('register calls userSvc.registerExternal', inject(function ($controller, userSvc, externalAuthSvc) {
        externalAuthSvc.info = {
            username: "test",
            email: "test",
            loginProvider: "test"
        };

        spyOn(userSvc, "registerExternal").and.callThrough();

        controller = $controller('externalRegisterCtrl', { $scope: scope });

        scope.register();

        expect(userSvc.registerExternal).toHaveBeenCalledWith(externalAuthSvc.info);
    }))

    it('register notifies user on userSvc.registerExternal error', inject(function ($controller, userSvc, externalAuthSvc, notifierSvc) {
        externalAuthSvc.succeed = false;

        controller = $controller('externalRegisterCtrl', { $scope: scope });

        scope.register();

        expect(notifierSvc.show.called).toEqual(true);
    }))

    it('register notifies user on userSvc.registerExternal successful', inject(function ($controller, userSvc, externalAuthSvc, notifierSvc) {        
        controller = $controller('externalRegisterCtrl', { $scope: scope });

        scope.register();

        expect(notifierSvc.show.called).toEqual(true);
    }))

    it('register on userSvc.registerExternal successful calls userSvc.signInExternal', inject(function ($controller, userSvc, externalAuthSvc, notifierSvc) {

        controller = $controller('externalRegisterCtrl', { $scope: scope });

        spyOn(userSvc, "signInExternal").and.callThrough();

        scope.register();

        expect(userSvc.signInExternal).toHaveBeenCalled();
    }))

    it('register on userSvc.signInExternal fail notifies', inject(function ($controller, userSvc, externalAuthSvc, notifierSvc) {
        userSvc.succeedSignIn = false;
        userSvc.result = { error: "oops" };

        controller = $controller('externalRegisterCtrl', { $scope: scope });

        scope.register();

        expect(notifierSvc.show.called).toEqual(true);
    }))

    //Teardown
    afterEach(function () {
    });

});