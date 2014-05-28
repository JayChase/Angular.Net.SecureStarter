
//references
/// <reference path="..\scripts\angular.js" />
/// <reference path="..\scripts\angular-route.js" />
/// <reference path="..\scripts\sinon-1.9.1.js" />
/// <reference path="..\scripts\angular-mocks.js" />


//Test suite
describe('Base Angular controller test', function () {

    //Setup
    beforeEach(function () {
        //module('registrationModule');

        //how to set up a controller to be tested (with scope)
        //inject(function ($rootScope,$controller) {
        //    scope = $rootScope.$new();
        //    controller = $controller('toTestController', {$scope: scope});
        //});

    });

    //Spec - 1
    it('This is a test', function () {
        expect(10).toBe(10);
    });


    //Teardown
    afterEach(function () {
       
    });
});