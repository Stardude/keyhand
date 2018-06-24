const _ = require('lodash');
const math = require('mathjs');

const PRECISION = 3;
const COEF = 2.78;

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
        let parameter = [];

        for (let j = 0; j < vectors.length; j++) {
            parameter.push(vectors[j][i]);
        }

        mathematicalHope.push(_.mean(parameter));
    }

    mathematicalHope = _.map(mathematicalHope, item => _.round(item, PRECISION));

    return mathematicalHope;
}

function calculateCovMatrix(vectors, mathematicalHope) {
    let matrix = [];

    for (let i = 0; i < vectors[0].length; i++) {
        matrix[i] = [];

        for (let j = 0; j < vectors[0].length; j++) {
            let sumArray = _.map(vectors, vector => {
                return (vector[i] - mathematicalHope[i]) * (vector[j] - mathematicalHope[j]);
            });

            matrix[i][j] = _.sum(sumArray) / (vectors.length - 1);
        }

        matrix[i] = _.map(matrix[i], item => _.round(item, PRECISION));
    }

    return matrix;
}

function calculateInvMatrix(matrix) {
    let inv = _.map(math.inv(matrix), row => _.map(row, item => _.round(item, PRECISION)));

    return inv;
}

function calculateResult(vector, matrix, averages) {
    let result = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            result += matrix[i][j] * (vector[i] - averages[i]) * (vector[j] - averages[j]);
        }
    }

    return {
        parameters: _.round((result / 2) - COEF * COEF, PRECISION)
    };
}

function compare(originKeyboard, keyboard) {
    const vectors = createVectors(originKeyboard);
    const mathematicalHope = calculateMathematicalHopes(vectors);
    const covMatrix = calculateCovMatrix(vectors, mathematicalHope);
    const invMatrix = calculateInvMatrix(covMatrix);

    const userVector = createVectors([keyboard])[0];
    const result = calculateResult(userVector, invMatrix, mathematicalHope);

    return {
        originKeyboard,
        keyboard,
        vectors,
        mathematicalHope,
        covMatrix,
        invMatrix,
        userVector,
        result
    };
}

module.exports = {
    compare
};