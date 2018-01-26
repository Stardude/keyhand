(function (angular) {
    'use strict';
    
    angular
        .module('app', [
            'ui.router'
        ])
        .run(run);
    
    function run () {
        console.log('Lets the party start');
    }
    
})(window.angular);