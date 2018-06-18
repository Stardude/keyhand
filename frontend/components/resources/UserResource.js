(function (angular) {
    'use strict'

    angular
        .module('app')
        .factory('User', UserResource);

    function UserResource($resource) {
        var basePath = '/user';
        var authPath = '/user/authByPassword'
        
        function saveUserData(userData) {
            return $resource(basePath).save(userData).$promise;
        }

        function recognize(keyboardData, authData) {
            return $resource(basePath).query({data: keyboardData, authData: authData}).$promise;
        }

        function authByPassword(authData) {
            return $resource(authPath).get({data: authData}).$promise;
        }

        return {
            saveUserData: saveUserData,
            recognize: recognize,
            authByPassword: authByPassword
        };
    }

})(window.angular);