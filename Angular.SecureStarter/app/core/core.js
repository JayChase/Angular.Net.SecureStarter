(function () {
    'use strict';

    var core = angular.module('app.core', ['ngRoute']);

    //core.config(function ($provide) {
    //    $provide.decorator("$q", function ($delegate) {        
    //        $delegate.defer = deferFactory($delegate.defer);

    //        return $delegate;
    //    });
    //});

    function deferFactory(originalDefer) {
        return function () {
            var deferred = originalDefer();

            deferred.promise.success = function (fn) {
                this.then(function (result) {
                    fn(result);

                    if (alwaysFn) {
                        alwaysFn(result);
                    }
                });
                return this;
            };

            deferred.promise.error = function (fn) {
                this.then(null, function (result) {
                    fn(result);
                });
                return this;
            };

            deferred.promise.notify = function (fn) {
                this.then(null, null, function (result) {
                    fn(result);
                });

                return this;
            };

            return deferred;
        };
    } 
})();