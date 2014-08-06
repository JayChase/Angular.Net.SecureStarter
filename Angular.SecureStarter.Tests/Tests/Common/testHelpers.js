var testHelpers = testHelpers || {};

testHelpers.fakePromise = function(resolve, result) {
    var promise = {
        resolve: resolve,
        result: result,
        then: function (success, failure) {
            if (resolve) {
                if (success) {
                    success(result);
                }
            } else {
                if (failure) {
                    failure(result);
                }
            }

            return this;
        },
        'finally': function (finallyFn) {
            if (finallyFn) {
                finallyFn();
            }
        }
    };
    
    return function(){
        return promise;
    };
};