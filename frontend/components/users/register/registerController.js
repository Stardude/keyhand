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

    function RegisterController() {
        
    }

})(window.angular);