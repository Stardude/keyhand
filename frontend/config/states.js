(function (angular) {
    'use strict'

    angular.module('app')
        .constant('STATES', {
            ROOT: 'root',
            REGISTER: 'root.register',
            LIST: 'root.list',
            RESULTS: 'root.results',
            RECOGNIZER: 'root.recognizer'
        });

})(window.angular);