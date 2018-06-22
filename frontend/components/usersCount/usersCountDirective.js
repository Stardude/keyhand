(function (angular) {
    'use strict'

    angular
        .module('app')
        .directive('usersCount', usersCountDirective);

    function usersCountController($scope, $state, STATES, User) {
        User.getAllUsers().then(function (users) {
            $scope.userCount = users.length;
            $scope.users = users;
        });

        $scope.goToUserList = function () {
            $state.go(STATES.LIST, {data: $scope.users});
        };
    }

    function usersCountDirective() {
        return {
            restrict: 'E',
            templateUrl: './components/usersCount/usersCount.html',
            controller: usersCountController
        };
    }

})(window.angular);