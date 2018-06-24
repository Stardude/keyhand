(function (angular) {
    'use strict'

    angular
        .module('app')
        .factory('User', UserResource);

    function UserResource($resource) {
        var basePath = '/user';
        
        function saveUserData(userData) {
            return $resource(basePath).save(userData).$promise;
        }

        function recognize(keyboardData, authData) {
            return $resource(basePath).get({data: keyboardData, authData: authData}).$promise;
        }

        function authByPassword(authData) {
            return $resource(basePath + '/authByPassword').get({data: authData}).$promise;
        }

        function getAllUsers() {
            return $resource(basePath + '/getAllUsers').query().$promise;
        }

        return {
            saveUserData: saveUserData,
            recognize: recognize,
            authByPassword: authByPassword,
            getAllUsers: getAllUsers
        };
    }

})(window.angular);