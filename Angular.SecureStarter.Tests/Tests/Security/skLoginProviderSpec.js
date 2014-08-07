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
/// <reference path="../../../angular.securestarter/app/security/guardroutesvc.js" />
/// <reference path="../../../angular.securestarter/app/security/skLoginProvider.js" />


'use strict';

//Test suite
describe('security skLoginProvider', function () {
    var scope, directive, template, userSvcMock, externalAuthSvcMock;

        beforeEach(function () {
            module('app.security');
 
            //module("../../../angular.securestarter/app/security/skLoginProvider.html");           
            
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

                $provide.value("notifierSvc", sinon.stub({
                    show: function () { }
                }));

                $provide.value("appActivitySvc", sinon.stub({
                    show: function () { }
                }));

                $provide.value("userManagementSvc", sinon.stub({
                    addLogin: function () { }
                }));

            });

            //directive = angular.element('<tr sk-user-login="login"></tr>');

 
            //TODO: never going to work with Chutpah and external templates

            inject(function ($rootScope, $compile, $templateCache) {
                scope = $rootScope;                

                scope.provider = {
                    providerName: "testProvider",
                    providerKey: "testKey"
                };

                //$templateCache.put("app/security/skLoginProvider.htmll", template);

                directive = angular.element('<tr sk-login-provider="login"></tr>');

                $compile(directive)(scope);

                scope.$digest();

                //TODO no code to test now but suppose should test bindings
                //need to get to the isolated scope for this then check click calls addLogin etc..
            });
    });


    //it('no possible with Chutspah, move to karma', inject(function () {            
       

    //    expect(true).toEqual(true);
    //}));
    
       

    //Teardown
    afterEach(function () {
    });

});