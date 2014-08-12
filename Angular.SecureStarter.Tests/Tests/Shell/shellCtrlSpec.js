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
/// <reference path="../../../angular.securestarter/app/core/storageSvc.js" />
/// <reference path="../../../angular.securestarter/app/shell/shell.js" />
/// <reference path="../../../angular.securestarter/app/shell/shellCtrl.js" />
/// <reference path="../../../angular.securestarter/app/security/security.js" />
/// <reference path="../../../angular.securestarter/app/security/guardSvc.js" />
/// <reference path="../../../angular.securestarter/app/security/userSvc.js" />

'use strict';

//references


//Test suite
describe('shell shellCtrl', function () {
    var scope, controller;

    //Setup
    beforeEach(function () {
        module('app.shell');

        inject(function ($rootScope, $controller, $http) {
            scope = $rootScope.$new();
            controller = $controller('shellCtrl', { $scope: scope });
            $http = {};
        });
    });
    
    it('no logic to test', inject(function () {        
        expect(true).toEqual(true);
    }));
  
    //Teardown
    afterEach(function () {
       
    });
});