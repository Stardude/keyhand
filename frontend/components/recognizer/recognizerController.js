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

    function RecognizerController($scope, User) {
        $scope.onTextareaFulfilled = onTextareaFulfilled;
        $scope.verify = verify;
        $scope.isVerifyButtonDisabled = isVerifyButtonDisabled;

        var userSignParameters = [];

        function onTextareaFulfilled(parameters) {
            userSignParameters.push(parameters);
        }

        function verify() {
            User.recognize(userSignParameters).then(function (response) {
                console.log('Recognize result:');
                console.log(response);
            });
        }

        function isVerifyButtonDisabled() {
            return !userSignParameters;
        }
    }

})(window.angular);