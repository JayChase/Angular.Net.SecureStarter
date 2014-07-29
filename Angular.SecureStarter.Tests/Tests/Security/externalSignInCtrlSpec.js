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
/// <reference path="../../../angular.securestarter/app/security/externalSignInCtrl.js" />

//Test suite
describe('security externalSignInCtrl', function () {
    'use strict';

    var scope, controller, q, userSvcMock, externalAuthSvcMock, accountClientSvcMock;

    beforeEach(function () {
        module('app.security');

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

            $provide.value("externalAuthSvc", externalAuthSvcMock);

            $provide.value("restoreUserSvc", sinon.stub({
                restore: function () { }
            }));

            $provide.value("appStatusSvc", sinon.stub({
                isReady: function () { }
            }));

            accountClientSvcMock = {
                succeed: true,
                result: 'test',
                getExternalLogins: function () {
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
                        'finally': function (fn) {
                            if (fn) {
                                fn();
                            }
                        }
                    };
                }
            };
            
            $provide.value("accountClientSvc", accountClientSvcMock);

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
    
    it('appActivitySvc.busy always called', inject(function ($controller, appActivitySvc) {        
        controller = $controller('externalSignInCtrl', { $scope: scope });
        expect(appActivitySvc.busy.calledWith("externalSignInCtrl")).toEqual(true);
    }));

    it('appActivitySvc.idle always called', inject(function ($controller, appActivitySvc) {        
        controller = $controller('externalSignInCtrl', { $scope: scope });
        expect(appActivitySvc.idle.calledWith("externalSignInCtrl")).toEqual(true);
    }));

    it('$scope.loginProviders set to getExternalLogins result', inject(function ($controller) {        
        controller = $controller('externalSignInCtrl', { $scope: scope });
        expect(scope.authProviders).toEqual("test");
    }));

    it('On getExternalLogins error notify with error', inject(function ($controller, notifierSvc, accountClientSvc) {        
        accountClientSvc.succeed = false;

        controller = $controller('externalSignInCtrl', { $scope: scope });

        expect(notifierSvc.show.calledWith({ message: "error retrieving external logins", type: "error" })).toEqual(true);
    }));

    //Teardown
    afterEach(function () {
    });

});