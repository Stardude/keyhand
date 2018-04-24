(function (angular) {
    'use strict'

    angular
        .module('app')
        .config(config)
        .controller('RecognizerController', RecognizerController);

    function config($stateProvider, STATES) {
        $stateProvider.state(STATES.RECOGNIZER, {
            url: '/recognizer',
            views: {
                'center': {
                    templateUrl: './components/recognizer/recognizer.html',
                    controller: 'RecognizerController'
                }
            }
        });
    }

    function RecognizerController($scope, $state, STATES) {
        
    }

})(window.angular);