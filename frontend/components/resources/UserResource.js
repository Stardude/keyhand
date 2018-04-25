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

        function recognize(keyboardData) {
            return $resource(basePath).query({data: keyboardData}).$promise;
        }

        return {
            saveUserData: saveUserData,
            recognize: recognize
        };
    }

})(window.angular);