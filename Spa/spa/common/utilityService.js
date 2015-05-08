(function () {
    'use strict';

    angular
        .module('app.common')
        .service('utilityService', utilityService);

    function utilityService() {
        this.arrayContains = arrayContains;
        this.arrayIndexOf = arrayIndexOf;
        this.asyncEach = asyncEach;
        this.getTodayIsoFormat = getTodayIsoFormat;
        this.getFragment = getFragment;
        this.parseQueryString = parseQueryString;
        this.arrayIntersect = arrayIntersect;
        this.getBasePath = getBasePath;
        this.getDeep = getDeep;
        this.PropertyValuesToString = PropertyValuesToString;
        this.isObject = isObject;
        this.exists = exists;
        this.arrayLast = arrayLast;

        function arrayContains(array, comparison) {
            if (Object.prototype.toString.call(array) === '[object Array]') {

                var res = false;
                var comparator;

                if (typeof (comparison) === 'function') {
                    comparator = comparison;
                } else {
                    comparator = function (value) {
                        if (value === comparison) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                }

                $.each(array, function (i, v) {
                    res = comparator(v);
                    return !res;
                });

                return res;

            } else {
                throw { name: "InvalidArgument", description: "array argument must be an array" };
            }
        }

        function arrayIndexOf(array, comparison) {
            if (Object.prototype.toString.call(array) === '[object Array]') {
                var res = -1;
                var comparator;

                if (typeof (comparison) === 'function') {
                    comparator = comparison;
                } else {
                    comparator = function (v) {
                        if (v === comparison) {
                            return array.indexOf(v);
                        } 
                    };
                }

                array.forEach(function (v) {
                    if (comparator(v) && res === -1) {
                        res = array.indexOf(v);
                    }
                });       

                return res;

            } else {
                throw { name: "InvalidArgument", description: "array argument must be an array" };
            }
        }

        function asyncEach(array, asyncFunction) {

            if (Object.prototype.toString.call(array) !== '[object Array]') {
                throw { name: "InvalidArgument", description: "array parameter must be an array" };
            }

            if (typeof (asyncFunction) !== 'function') {
                throw { name: "InvalidArgument", description: "asyncFunction parameter must be a function" };
            }

            var dfd = $.Deferred();

            if (array.length === 0) {
                return dfd.resolve();
            }

            $.each(array, function (i, v) {
                $.when(asyncFunction(v)).then(function () {
                    i++;
                    if (i === array.length) {
                        return dfd.resolve();
                    }
                });
            });

            return dfd.promise();
        }

        function getTodayIsoFormat(minusDays) {

            var today = new Date();

            if (typeof minusDays !== 'undefined') {
                today.setDate(today.getDate() - minusDays);
            }

            return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        }

        function getFragment() {
            if (window.location.hash.indexOf("#") === 0) {
                return $.parseQueryString(window.location.hash.substr(1));
            } else {
                return {};
            }
        }

        function parseQueryString(queryString) {
            var data = {},
                pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

            if (queryString === null) {
                return data;
            }

            pairs = queryString.split("&");

            for (var i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                separatorIndex = pair.indexOf("=");

                if (separatorIndex === -1) {
                    escapedKey = pair;
                    escapedValue = null;
                } else {
                    escapedKey = pair.substr(0, separatorIndex);
                    escapedValue = pair.substr(separatorIndex + 1);
                }

                key = decodeURIComponent(escapedKey);
                value = decodeURIComponent(escapedValue);

                data[key] = value;
            }

            return data;
        }

        function arrayIntersect(array1, array2) {
            return $.grep(array1, function (i) {
                return $.inArray(i, array2) > -1;
            });
        }

        function getBasePath() {
            var path = window.location.pathname;

            if (path.substring(path.length - 1) !== "/") {
                return path + "/";
            } else {
                return path;
            }
        }

        function getDeep(obj, path) {
            for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
                if (obj) {
                    obj = obj[path[i]];
                } else {
                    return obj;
                }
            };
            return obj;
        }

        function PropertyValuesToString(obIn) {
            var result = [];

            for (var prop in obIn) {
                result.push(obIn[prop]);
            }

            return result.join(",");
        }

        function isObject(value) {
            if (value === null) {
                return false;
            } else if (typeof value === "object") {
                return true;
            } else {
                return false;
            }
        }

        function exists(value) {
            if (typeof value === "undefined") {
                return false;
            } else if (value === null) {
                return false;
            } else {
                return true;
            }
        }

        function arrayLast(array) {
            return array.slice(-1)[0];
        }
    }
})();