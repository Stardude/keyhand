(function (angular, _) {
    'use strict'

    angular.module('app')
        .constant('CONSTANTS', {
            SAMPLE_TEXT: 'london is the capital of great britain',
            SAMPLE_TEXT2: 'i want to eat my breakfast today'
        })
        .constant('_', _);

})(window.angular, window._);