(function (angular) {
    'use strict'

    angular
        .module('app')
        .factory('User', UserResource);

    function UserResource($resource) {
        var basePath = '/user';
        
        function saveUserData(charactersPressAndPause, mathematicalHope, arrhythmia, speed, overlaps) {
            var result = {
                charactersPressAndPause: charactersPressAndPause,
                mathematicalHope: mathematicalHope,
                arrhythmia: arrhythmia,
                speed: speed,
                overlaps: overlaps
            };

            return $resource(basePath).save(result).$promise;
        }

        return {
            saveUserData: saveUserData
        };
    }

})(window.angular);