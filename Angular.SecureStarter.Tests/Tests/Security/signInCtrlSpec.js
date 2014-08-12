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
/// <reference path="../../../angular.securestarter/app/security/guardSvc.js" />
/// <reference path="../../../angular.securestarter/app/security/signInCtrl.js" />

//Test suite
describe('security signInCtrl', function () {
    'use strict';

    var scope, controller, q, userSvcMock, externalAuthSvcMock;

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
                                failure({error: "failure"});
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

                $provide.value("userSvc", userSvcMock);

                $provide.value("notifierSvc", sinon.stub({
                    show: function () { }
                }));

                $provide.value("appActivitySvc", sinon.stub({
                    busy: function () { },
                    idle: function () { }
                }));

                $provide.value("$location", sinon.stub({
                    path: function () { }
                }));
            });

            inject(function ($rootScope, $controller,$q) {
                scope = $rootScope.$new();                
                controller = $controller('signInCtrl', { $scope: scope });
            });
        });


        it('if signIn calls userSvc.signIn with (user,password)', inject(function () {
            spyOn(userSvcMock, 'signIn').and.callThrough();

            scope.user = {
                id: "user",
                password: "password"
            };

            scope.remember = false;

            scope.signIn();

            expect(userSvcMock.signIn).toHaveBeenCalledWith({
                id: "user",
                password: "password"
            },false);
        }));
    
        it('if signIn successful then redirect to default /', inject(function ($location) {
            scope.signIn();

            expect($location.path.calledWith('/')).toEqual(true);
        }));

        it('if signIn successful then show success message', inject(function (notifierSvc) {
            scope.signIn();

            expect(notifierSvc.show.calledWith({ message: "signed in as user", type: "info" })).toEqual(true);
        }));

        it('if signIn fails then show error', inject(function (notifierSvc) {
            userSvcMock.succeed = false;
            scope.signIn();

            expect(notifierSvc.show.calledWith({message: "failure", type: "error"})).toEqual(true);
        }));

    //Teardown
    afterEach(function () {
    });

});