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

        return {
            saveUserData: saveUserData
        };
    }

})(window.angular);