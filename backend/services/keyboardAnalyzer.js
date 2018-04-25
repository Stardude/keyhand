const _ = require('lodash');

function calculateEuclidDifference(value1, value2) {
    return Math.sqrt(Math.pow((value1 - value2), 2));
}

function compareCharactersPressAndPause(originSymbols, symbols) {
    let results = [];

    _.forEach(originSymbols, originSymbol => {
        let symbol = _.find(symbols, {id: originSymbol.id});
        results.push({
            key: symbol.key,
            pauseTime: calculateEuclidDifference(originSymbol.pauseTime, symbol.pauseTime),
            pressTime: calculateEuclidDifference(originSymbol.pressTime, symbol.pressTime)
        });
    });

    return results;
}

function compareMathematicalHope(origin, data) {
    return {
        pause: calculateEuclidDifference(origin.pause, data.pause),
        press: calculateEuclidDifference(origin.press, data.press)
    };
}

function compareArrhythmia(origin, data) {
    return {
        alpha: calculateEuclidDifference(origin.alpha, data.alpha),
        betta: calculateEuclidDifference(origin.betta, data.betta)
    };
}

function compareOverlaps(origin, data) {
    return {
        averageTime: calculateEuclidDifference(origin.averageTime, data.averageTime),
        averageSquareOffset: calculateEuclidDifference(origin.averageSquareOffset, data.averageSquareOffset)
    };
}

function compare(originData, data) {
    return {
        charactersPressAndPause: compareCharactersPressAndPause(originData.charactersPressAndPause, data.charactersPressAndPause),
        mathematicalHope: compareMathematicalHope(originData.mathematicalHope, data.mathematicalHope),
        arrhythmia: compareArrhythmia(originData.arrhythmia, data.arrhythmia),
        overlaps: compareOverlaps(originData.overlaps, data.overlaps),
        speed: calculateEuclidDifference(originData.speed, data.speed)
    };
}

module.exports = {
    compare
};