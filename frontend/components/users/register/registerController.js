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

    function RegisterController($scope) {
        $scope.sample = 'london is the capital of great britain';
        $scope.onKeyUp = onKeyUp;
        $scope.onKeyDown = onKeyDown;

        var list = [];

        function onKeyUp(e) {
            !isValidSampleText() && handleSampleTextError();
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].key === e.key) {
                    list[i].keyUpTime = e.timeStamp;
                    break;
                }
            }
            $scope.sample === $scope.sampleText && handleSampleTextFinish();
        }

        function onKeyDown(e) {
            if ((e.keyCode > 64 && e.keyCode < 91) || e.keyCode === 32) {
                list.push({
                    key: e.key,
                    keyUpTime: null,
                    keyDownTime: e.timeStamp,
                    keyPressTime: null
                });
            }
        }

        function isValidSampleText() {
            return $scope.sample.substr(0, $scope.sampleText.length) === $scope.sampleText;
        }

        function handleSampleTextError() {
            $scope.sampleText = '';
            list = [];
        }

        function handleSampleTextFinish() {
            for (var i = 0; i < list.length; i++) {
                list[i].keyPressTime =  list[i].keyUpTime -  list[i].keyDownTime;
                if (i + 1 !== list.length) {
                    list[i].keyPauseTime = list[i + 1].keyDownTime -  list[i].keyUpTime;
                }
            }
            console.log(list);
        }
    }

})(window.angular);