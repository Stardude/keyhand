(function (angular) {
    'use strict'

    angular
        .module('app')
        .config(config)
        .controller('StartpageController', StartpageController);

    function config($stateProvider, STATES) {
        $stateProvider.state(STATES.STARTPAGE, {
            url: '/startpage',
            views: {
                'center': {
                    templateUrl: './components/startpage/startpage.html',
                    controller: 'StartpageController'
                }
            }
        });
    }

    function StartpageController($scope, $state, STATES) {
        $scope.goToRegistrationForm = goToRegistrationForm;
        $scope.goToRecognizerForm = goToRecognizerForm;

        function goToRecognizerForm() {
            $state.go(STATES.RECOGNIZER);
        }

        function goToRegistrationForm() {
            $state.go(STATES.REGISTER);
        }
    }

})(window.angular);