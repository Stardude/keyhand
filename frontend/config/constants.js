(function (angular, _) {
    'use strict'

    angular.module('app')
        .constant('CONSTANTS', {
            SAMPLE_TEXT: 'london is the capital of great britain'
        })
        .constant('_', _);

})(window.angular, window._);