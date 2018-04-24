(function (angular, _) {
    'use strict'

    angular.module('app')
        .constant('EVENTS', {
            TEXTAREA_FULFILLED: 'TEXTAREA_FULFILLED'
        })
        .constant('_', _);

})(window.angular, window._);