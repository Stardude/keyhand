(function (angular) {
    'use strict';
    
    angular
        .module('app', [
            'ui.router',
            'ngResource'
        ])
        .run(run);
    
    function run($state, STATES) {
        console.log('run');
        $state.go(STATES.ROOT);
    }
    
})(window.angular);