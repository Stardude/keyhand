(function (angular) {
    'use strict'

    angular
        .module('app')
        .config(config)
        .controller('RootController', RootController);

    function config($stateProvider, STATES) {
        $stateProvider.state(STATES.ROOT, {
            url: '',
            views: {
                '': {
                    templateUrl: './components/root/root.html',
                    controller: 'RootController'
                }
            }
        });
    }

    function RootController($state, STATES) {
        $state.go(STATES.RECOGNIZER);
    }

})(window.angular);