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

'use strict';

//Test suite
describe('security externalSignInCtrl', function () {
        var scope, controller, navigationSvcMock;

    beforeEach(function () {
        module(function ($provide) {

            navigationSvcMock = sinon.stub(
                {
                    getLinks: function () { }
                });

            $provide.value("navigationSvc", navigationSvcMock);

            $provide.value("appSettingsSvc", sinon.stub(
                {
                    title: "testTitle",
                    brand: "testBrand"                                    
                }));
        });

        module('app.shell');

        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('externalSignInCtrl', { $scope: scope });
        });
    });
    
    it('todo test externalSignInCtrl', inject(function () {        
        expect(false).toEqual(true);
    }));

    //Teardown
    afterEach(function () {
    });

});