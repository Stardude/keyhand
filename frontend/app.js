(function (angular) {
    'use strict';
    
    angular
        .module('app', [
            'ui.router',
            'ngResource'
        ])
        .run(run);
    
    function run($state, STATES) {
        $state.go(STATES.ROOT);
    }
    
})(window.angular);