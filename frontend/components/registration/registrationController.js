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

    function RegistrationController($scope, EVENTS, User, eventService) {
        $scope.isRegisterButtonDisabled = isRegisterButtonDisabled;
        $scope.register = register;

        eventService.register(EVENTS.TEXTAREA_FULFILLED, onTextareaFulFilled);

        function onTextareaFulFilled(eventParams) {
            console.log('textarea completed');
        }

        function isRegisterButtonDisabled() {
            return !$scope.fullName || !$scope.password;
        }

        function register() {
            var userData = {
                name: $scope.fullName,
                password: $scope.password,
                keyboard: null
            };

            User.saveUserData(userData).then(function (response) {
                console.log('From server');
                console.log(response);
            });
        }
    }

})(window.angular);