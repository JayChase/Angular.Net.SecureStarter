'use strict';

describe('app.Core navigationService', function () {
    
    beforeEach(module('app.core'));

    beforeEach(function () {
        
        var route = {
            routes: JSON.parse('{"/welcome":{"reloadOnSearch":true,"templateUrl":"app/content/welcome/welcome.html","controller":"welcomeController","showNav":"welcome","originalPath":"/welcome","regexp":{},"keys":[]},"/welcome/":{"redirectTo":"/welcome","originalPath":"/welcome/","regexp":{},"keys":[]},"/features":{"reloadOnSearch":true,"templateUrl":"app/content/features/features.html","controller":"featuresController","showNav":"features","originalPath":"/features","regexp":{},"keys":[]},"/features/":{"redirectTo":"/features","originalPath":"/features/","regexp":{},"keys":[]},"/register":{"reloadOnSearch":true,"templateUrl":"app/security/register.html","controller":"registerController","originalPath":"/register","regexp":{},"keys":[]},"/register/":{"redirectTo":"/register","originalPath":"/register/","regexp":{},"keys":[]},"/signIn":{"reloadOnSearch":true,"templateUrl":"app/security/signIn.html","controller":"signInCtrl","originalPath":"/signIn","regexp":{},"keys":[]},"/signIn/":{"redirectTo":"/signIn","originalPath":"/signIn/","regexp":{},"keys":[]},"null":{"reloadOnSearch":true,"redirectTo":"/welcome"}}')
        };
        
        //use $provide to set up service mock injection
        module(function ($provide) {
            $provide.value('$route', route);            
        });    
    });   
    
    it('only links with showNav properties are returned.', inject(function (navigationService) {
            expect(navigationService.getLinks().length).toBe(2);
        }));

    //Teardown
    afterEach(function () {
       
    });
});