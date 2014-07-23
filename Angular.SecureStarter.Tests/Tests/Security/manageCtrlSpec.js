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
        var scope, controller, q, userSvcMock;

        beforeEach(function () {
            module('app.security');
            
            module(function ($provide) { 
                              

                $provide.value("userSvc", userSvcMock);

                $provide.value("notifierSvc", sinon.stub({
                    show: function () { }
                }));

                $provide.value("appActivitySvc", sinon.stub({
                    show: function () { }
                }));

                $provide.value("$location", sinon.stub(
                    {
                        path: function () { }
                    }));
            });

            inject(function ($rootScope, $controller,$q) {
                scope = $rootScope.$new();                

                controller = $controller('manageCtrl', { $scope: scope });
            });
    });


        it('manageCtrl does something', inject(function () {
            
            
        }));   

    //Teardown
    afterEach(function () {
    });

});