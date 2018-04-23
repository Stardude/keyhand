(function (angular) {
    'use strict'

    angular
        .module('app')
        .config(config)
        .controller('RegisterController', RegisterController);

    function config($stateProvider, STATES) {
        $stateProvider.state(STATES.REGISTER, {
            url: '/register',
            views: {
                'center': {
                    templateUrl: './components/users/register/register.html',
                    controller: 'RegisterController'
                }
            }
        });
    }

    function RegisterController($scope, User, textAnalyzerService) {
        $scope.sampleText = 'london is the capital of great britain';
        $scope.onKeyUp = onKeyUp;
        $scope.onKeyDown = onKeyDown;
        $scope.isRegisterButtonDisabled = isRegisterButtonDisabled;
        $scope.register = register;

        var characters = [];
        var userSignParameters = null;

        function onKeyUp(e) {
            !isValidUserText() && handleUserTextError();
            for (var i = characters.length - 1; i >= 0; i--) {
                if (characters[i].key === e.key) {
                    characters[i].upTime = e.timeStamp;
                    break;
                }
            }
            $scope.sampleText === $scope.userText && characters[characters.length - 1].key === e.key && handleUserTextFinish();
        }

        function onKeyDown(e) {
            if ((e.keyCode > 64 && e.keyCode < 91) || e.keyCode === 32) {
                characters.push({
                    key: e.key,
                    upTime: null,
                    downTime: e.timeStamp
                });
            }
        }

        function isValidUserText() {
            return $scope.sampleText.substr(0, $scope.userText.length) === $scope.userText;
        }

        function handleUserTextError() {
            $scope.userText = '';
            characters = [];
        }

        function handleUserTextFinish() {
            userSignParameters = textAnalyzerService.getAnalyzedData(characters);
            characters = [];
        }

        function isRegisterButtonDisabled() {
            return !$scope.fullName || !$scope.password || userSignParameters === null;
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