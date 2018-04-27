const _ = require('lodash');
const math = require('mathjs');

const PRECISION = 3;

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

    return _.map(mathematicalHope, item => _.round(item, PRECISION));
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

        covMatrix[i] = _.map(covMatrix[i], item => _.round(item, PRECISION));
    }

    return covMatrix;
}

function calculateInvMatrix(matrix) {
    return math.inv(matrix);
}

function calculateResult(vector, matrix, averages) {
    let sum = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j] * (vector[i] - averages[i]) * (vector[j] - averages[j]);
        }
    }

    return sum / 2;
}

function compare(originKeyboard, keyboard) {
    const vectors = createVectors(originKeyboard);
    const mathematicalHopes = calculateMathematicalHopes(vectors);
    const covMatrix = calculateCovMatrix(vectors, mathematicalHopes);
    const invMatrix = calculateInvMatrix(covMatrix);

    const userVector = createVectors([keyboard])[0];
    const result = calculateResult(userVector, invMatrix, mathematicalHopes);

    return {
        covMatrix,
        invMatrix,
        result
    };
}

module.exports = {
    compare
};