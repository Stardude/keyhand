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

function compare(originData, data) {
    return {
        charactersPressAndPause: compareCharactersPressAndPause(originData.charactersPressAndPause, data.charactersPressAndPause)
    };
}

module.exports = {
    compare
};