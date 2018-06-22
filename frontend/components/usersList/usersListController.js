(function (angular) {
    'use strict'

    angular
        .module('app')
        .config(config)
        .controller('UsersListController', UsersListController);

    function config($stateProvider, STATES) {
        $stateProvider.state(STATES.LIST, {
            url: '/list',
            views: {
                'center': {
                    templateUrl: './components/usersList/usersList.html',
                    controller: 'UsersListController'
                }
            },
            params: {
                data: null
            }
        });
    }

    function UsersListController($scope, $stateParams) {
        $scope.users = $stateParams.data;
    }

})(window.angular);