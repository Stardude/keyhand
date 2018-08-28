(function (angular) {
    'use strict'

    angular
        .module('app')
        .directive('keyboardSignTextarea', keyboardSignTextareaDirective);

    function keyboardSignTextareaDirective(CONSTANTS, textAnalyzerService) {
        function link(scope) {
            scope.sampleText = CONSTANTS.SAMPLE_TEXT;
            scope.onKeyUp = onKeyUp;
            scope.onKeyDown = onKeyDown;

            var characters = [];
            var userSignParameters = null;

            function onKeyUp(e) {
                if ((e.keyCode > 64 && e.keyCode < 91) || e.keyCode === 32) {
                    !isValidUserText() && handleUserTextError();
                    for (var i = characters.length - 1; i >= 0; i--) {
                        if (characters[i].key === e.key) {
                            characters[i].upTime = e.timeStamp;
                            break;
                        }
                    }
                    scope.sampleText === scope.userText && characters[characters.length - 1].key === e.key && handleUserTextFinish();
                }
            }

            function onKeyDown(e) {
                if ((e.keyCode > 64 && e.keyCode < 91) || e.keyCode === 32) {
                    characters.push({
                        key: e.key,
                        upTime: null,
                        downTime: e.timeStamp
                    });
                } else if (e.keyCode === 8) {
                    characters.pop();
                }
            }

            function isValidUserText() {
                return scope.sampleText.substr(0, scope.userText.length) === scope.userText;
            }

            function handleUserTextError() {
                scope.userText = '';
                characters = [];
            }

            function handleUserTextFinish() {
                userSignParameters = textAnalyzerService.getAnalyzedData(characters);
                scope.onTextareaFulfilled({userSignParameters: userSignParameters});
                characters = [];
            }
        }

        return {
            restrict: 'E',
            templateUrl: './components/directives/keyboardSignTextarea.html',
            scope: {
                onTextareaFulfilled: '&'
            },
            link: link
        };
    }

})(window.angular);