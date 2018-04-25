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

    function RegistrationController($scope, User) {
        $scope.isRegisterButtonDisabled = isRegisterButtonDisabled;
        $scope.register = register;
        $scope.onTextareaFulfilled = onTextareaFulfilled;

        var userSignParameters = null;

        function onTextareaFulfilled(parameters) {
            userSignParameters = parameters;
        }

        function isRegisterButtonDisabled() {
            return !$scope.fullName || !$scope.password || !userSignParameters;
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
        }
    }

})(window.angular);