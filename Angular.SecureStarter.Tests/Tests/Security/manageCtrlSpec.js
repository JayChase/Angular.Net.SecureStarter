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
/// <reference path="../../../angular.securestarter/app/security/security.js" />
/// <reference path="../../../angular.securestarter/app/security/manageCtrl.js" />

'use strict';

//Test suite
describe('manage signInCtrl', function () {
    var scope, controller, externalAuthSvcMock;

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
              
                $provide.value("externalAuthSvc",externalAuthSvcMock);

                $provide.value("restoreUserSvc", sinon.stub({
                    restore: function () { }
                }));

                $provide.value("appStatusSvc", sinon.stub({
                    isReady: function () { }
                }));

                $provide.value("userManagementSvc", sinon.stub({
                    load: function () { }
                }));

            });

            inject(function ($rootScope, $controller,$q) {
                scope = $rootScope.$new();                

                controller = $controller('manageCtrl', { $scope: scope });
            });
    });


        it('manageCtrl calls userManagementSvc load', inject(function (userManagementSvc) {
            expect(userManagementSvc.load.called).toEqual(true);
        }));   

    //Teardown
    afterEach(function () {
    });

});