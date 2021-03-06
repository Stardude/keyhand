(function (angular) {
    'use strict'

    angular
        .module('app')
        .config(config)
        .controller('RegistrationController', RegistrationController);

    function config($stateProvider, STATES) {
        $stateProvider.state(STATES.REGISTER, {
            url: '/registration',
            views: {
                'center': {
                    templateUrl: './components/registration/registration.html',
                    controller: 'RegistrationController'
                }
            }
        });
    }

    function RegistrationController($scope, $state, STATES, User) {
        $scope.isRegisterButtonDisabled = isRegisterButtonDisabled;
        $scope.register = register;
        $scope.onTextareaFulfilled = onTextareaFulfilled;

        $scope.numberOfSigns = 5;
        $scope.getNumber = function (number) {
            return new Array(number);
        };

        var userSignParameters = [];

        function onTextareaFulfilled(parameters) {
            userSignParameters.push(parameters);
        }

        function isRegisterButtonDisabled() {
            return !$scope.fullName || !$scope.password || !userSignParameters.length;
        }

        function register() {
            var userData = {
                name: $scope.fullName,
                password: $scope.password,
                keyboard: userSignParameters
            };

            User.saveUserData(userData).then(function (response) {
                console.log('From server');
                console.log(response);
            });

            $state.go(STATES.STARTPAGE);
        }
    }

})(window.angular);