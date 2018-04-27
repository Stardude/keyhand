const _ = require('lodash');
var math = require('mathjs');

function createVectors(keyboard) {
    let vectors = [];

    _.forEach(keyboard, sign => {
        let vector = [];

        _.forEach(sign.charactersPressAndPause, symbol => {
            vector.push(symbol.pressTime);
            !_.isNil(symbol.pauseTime) && vector.push(symbol.pauseTime);
        });

        vector.push(sign.mathematicalHope.press);
        vector.push(sign.mathematicalHope.pause);
        vector.push(sign.arrhythmia.alpha);
        vector.push(sign.arrhythmia.betta);
        vector.push(sign.speed);
        vector.push(sign.overlaps.averageTime);
        vector.push(sign.overlaps.averageSquareOffset);

        vectors.push(vector);
    });

    return vectors;
}

function calculateMathematicalHopes(vectors) {
    let mathematicalHope = [];

    for (let i = 0; i < vectors[0].length; i++) {
        let value = [];

        for (let j = 0; j < vectors.length; j++) {
            value.push(vectors[j][i]);
        }

        mathematicalHope.push(_.mean(value));
    }

    return mathematicalHope;
}

function calculateCovMatrix(vectors, mathematicalHopes) {
    let covMatrix = [];

    for (let i = 0; i < vectors[0].length; i++) {
        covMatrix[i] = [];

        for (let j = 0; j < vectors[0].length; j++) {
            let sumArray = _.map(vectors, vector => {
                return (vector[i] - mathematicalHopes[i]) * (vector[j] - mathematicalHopes[j]);
            });

            covMatrix[i][j] = _.sum(sumArray) / (vectors.length - 1);
        }
    }

    return covMatrix;
}

function calculateInvMatrix(matrix) {
    return math.inv(matrix);
}

function compare(originKeyboard, keyboard) {
    const vectors = createVectors(originKeyboard);
    const mathematicalHopes = calculateMathematicalHopes(vectors);
    const covMatrix = calculateCovMatrix(vectors, mathematicalHopes);
    const invMatrix = calculateInvMatrix(covMatrix);

    return {
        invMatrix
    };
}

module.exports = {
    compare
};