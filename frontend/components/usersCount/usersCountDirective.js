(function (angular) {
    'use strict'

    angular
        .module('app')
        .directive('usersCount', usersCountDirective);

    function usersCountLink(scope) {

    }

    function usersCountDirective() {
        return {
            restrict: 'E',
            templateUrl: './components/usersCount/usersCount.html',
            link: usersCountLink
        };
    }

})(window.angular);