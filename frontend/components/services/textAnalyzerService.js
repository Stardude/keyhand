(function (angular) {
    'use strict'

    angular
        .module('app')
        .factory('textAnalyzerService', textAnalyzerService);

    function textAnalyzerService(_) {
        var S_MAX = 900;
        var PRECISION = 3;

        function calculatePressAndPauseTime(characters) {
            var charactersPressAndPause = [];
            for (var i = 0; i < characters.length; i++) {
                charactersPressAndPause.push({
                    key: characters[i].key,
                    pressTime: characters[i].upTime - characters[i].downTime,
                    pauseTime: (i + 1 !== characters.length) ? characters[i + 1].downTime -  characters[i].upTime : null
                });
            }

            return charactersPressAndPause;
        }

        function calculateMathematicalHope(charactersPressAndPause) {
            var sumPause = 0, sumPress = 0;
            var maxPauseTime = _.maxBy(charactersPressAndPause, 'pauseTime').pauseTime;

            for (var i = 0; i < charactersPressAndPause.length; i++) {
                if (i !== charactersPressAndPause.length - 1) {
                    sumPause += charactersPressAndPause[i].pauseTime / maxPauseTime;
                }
                sumPress += charactersPressAndPause[i].pressTime;
            }
            
            return {
                pause: sumPause / (charactersPressAndPause.length - 1),
                press: sumPress / charactersPressAndPause.length
            };
        }

        function calculateArrhythmia(charactersPressAndPause, mathematicalHope) {
            var sumAlpha = 0, sumBetta = 0;
            var maxPauseTime = _.maxBy(charactersPressAndPause, 'pauseTime').pauseTime;
            var maxPressTime = _.maxBy(charactersPressAndPause, 'pressTime').pressTime;

            for (var i = 0; i < charactersPressAndPause.length; i++) {
                if (i !== charactersPressAndPause.length - 1) {
                    sumAlpha += Math.pow(((charactersPressAndPause[i].pauseTime / maxPauseTime) - mathematicalHope.pause), 2);
                }
                sumBetta += Math.pow(((charactersPressAndPause[i].pressTime / maxPressTime) - mathematicalHope.press), 2);
            }

            return {
                alpha: Math.sqrt(sumAlpha / (charactersPressAndPause.length - 2)),
                betta: Math.sqrt(sumBetta / (charactersPressAndPause.length - 1))
            };
        }

        function calculateSpeed(characters) {
            return (characters[characters.length - 1].upTime - characters[0].downTime) * S_MAX / 60000;
        }

        function calculateOverlaps(characters, maxPressTime) {
            var count = 0, sumTime = 0, sumAverageSquareOffset = 0;
            for (var i = 0; i < characters.length; i++) {
                if (i + 1 !== characters.length) {
                    if (characters[i].downTime <= characters[i + 1].upTime && characters[i + 1].downTime <= characters[i].upTime) {
                        count++;
                        sumTime += characters[i].upTime - characters[i + 1].downTime;
                    }
                }
            }

            var averageTime = sumTime / (count * maxPressTime);

            for (var j = 0; j < characters.length; j++) {
                if (j + 1 !== characters.length) {
                    sumAverageSquareOffset += Math.pow((((characters[j].upTime - characters[j + 1].downTime) / maxPressTime) - averageTime), 2);
                }
            }

            return {
                averageTime: averageTime,
                averageSquareOffset: Math.sqrt(sumAverageSquareOffset / (count - 1))
            };
        }

        function roundValues(values) {
            if (_.isArray(values)) {
                _.forEach(values, function(item) {
                    _.forEach(item, function(value, key) {
                        if (_.isNumber(value)) {
                            item[key] = _.round(value, PRECISION);
                        }
                    });
                });
            } else if (_.isObject(values)) {
                _.forEach(values, function(value, key) {
                    values[key] = _.round(value, PRECISION);
                });
            } else {
                return _.round(values, PRECISION);
            }

            return values;
        }
        
        function getAnalyzedData(characters) {
            var charactersPressAndPause = calculatePressAndPauseTime(characters);
            var mathematicalHope = calculateMathematicalHope(charactersPressAndPause);
            var arrhythmia = calculateArrhythmia(charactersPressAndPause, mathematicalHope);
            var speed = calculateSpeed(characters);
            var overlaps = calculateOverlaps(characters, _.maxBy(charactersPressAndPause, 'pressTime').pressTime);

            return {
                charactersPressAndPause: roundValues(charactersPressAndPause),
                mathematicalHope: roundValues(mathematicalHope),
                arrhythmia: roundValues(arrhythmia),
                speed: roundValues(speed),
                overlaps: roundValues(overlaps)
            };
        }

        return {
            getAnalyzedData: getAnalyzedData
        };
    }

})(window.angular);