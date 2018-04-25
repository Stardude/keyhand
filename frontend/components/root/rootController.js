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

    function RootController($scope, $state, STATES) {
        $state.go(STATES.STARTPAGE);

        $scope.goToStartpage = function () {
            $state.go(STATES.STARTPAGE);
        };
    }

})(window.angular);