/// <reference path="../../angular.securestarter/scripts/jquery-2.1.1.js" />
/// <reference path="../../scripts/sinon-1.9.1.js" />
/// <reference path="../../../angular.securestarter/scripts/angular.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-mocks.js" />
/// <reference path="../../../angular.securestarter/scripts/angular-route.js" />
/// <reference path="../../../angular.securestarter/scripts/toastr.js" />
/// <reference path="../../../angular.securestarter/app/app.js" />
/// <reference path="../../fakes/toastrfake.js" />
/// <reference path="../../../angular.securestarter/app/core/core.js" />
/// <reference path="../../../angular.securestarter/app/core/notifiersvc.js" />

'use strict';

//references


//Test suite
describe('Core notifierSvc', function () {

    //Setup
    beforeEach(function () {
        module('app.core');
    });

    //Spec - 1
    it('if show argument is a string notifier uses defaults with the string as a message.', inject(function (notifierSvc) {

        notifierSvc.show("message string");

        expect(toastr.args.message).toBe("message string");
    }));

    it('if verbose true then add detail to the message.', inject(function (notifierSvc) {

        notifierSvc.show({
            message: "message string",
            detail:"and details"
            });

        expect(toastr.args.message).toBe("message string and details");
    }));

    it('if verbose false then no detail added to the message.', inject(function (notifierSvc) {

        notifierSvc.verbose = false;

        notifierSvc.show({
            message: "message string",
            detail: "and details"
        });

        expect(toastr.args.message).toBe("message string");
    }));

    //Teardown
    afterEach(function () {
       
    });
});