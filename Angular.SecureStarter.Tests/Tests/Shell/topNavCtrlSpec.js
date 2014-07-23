/// <reference path="../../scripts/sinon-1.9.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery-2.1.1.js" />
/// <reference path="../../../angular.securestarter/scripts/jquery.utilities.js" />
/// <reference path="../../../angular.securestarter/scripts/angular.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-animate.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-mocks.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-route.js" />
/// <reference path="../../../angular.securestarter/app/app.js" />
/// <reference path="../../../angular.securestarter/app/core/core.js" />
/// <reference path="../../../angular.securestarter/app/core/navigationSvc.js" />
/// <reference path="../../../angular.securestarter/app/shell/shell.js" />
/// <reference path="../../../angular.securestarter/app/shell/topNavCtrl.js" />
'use strict';

//references


//Test suite
describe('shell topNavCtrl tests', function () {    
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
            controller = $controller('topNavCtrl', { $scope: scope });
        });
    });
    
    it('links get set from the NavigationSvc', inject(function () {        
        expect(navigationSvcMock.getLinks.called).toEqual(true);
    }));

    it('title get set from the appSettingsSvc', inject(function () {
        expect(scope.title).toBe("testTitle");
    }));
   
    it('brand get set from the appSettingsSvc', inject(function () {
        expect(scope.brand).toBe("testBrand");
    }));

    //Teardown
    afterEach(function () {
       
    });
});