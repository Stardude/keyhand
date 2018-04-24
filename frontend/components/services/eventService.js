(function (angular) {
    'use strict'

    angular
        .module('app')
        .factory('eventService', eventService);

    function eventService(_) {
        var events = {};

        function register(name, callback) {
            if (!events[name]) {
                events[name] = [callback];
            } else {
                events[name].push(callback);
            }
        }

        function unregister(name, callback) {
            if (events[name]) {
                _.pull(events[name], callback);
            }
        }

        function emit(name, paramObject) {
            if (events[name]) {
                _.forEach(events[name], function (callback) {
                    callback(paramObject);
                });
            }
        }

        return {
            register: register,
            unregister: unregister,
            emit: emit
        };
    }

})(window.angular);