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
        $scope.authenticate = authenticate;

        $scope.isPasswordAuth = true;

        var userSignParameters = [];
        var authData = null;

        function onTextareaFulfilled(parameters) {
            userSignParameters.push(parameters);
        }

        function verify() {
            User.recognize(userSignParameters, authData).then(function (response) {
                console.log('Recognize result:');
                console.log(response);
            });
        }

        function isVerifyButtonDisabled() {
            return !userSignParameters;
        }

        function authenticate() {
            authData = {
                name: $scope.fullName,
                password: $scope.password
            };

            User.authByPassword(authData).then(function (res) {
                if (!res.error) {
                    $scope.isPasswordAuth = false;
                }
            });
        }
    }

})(window.angular);