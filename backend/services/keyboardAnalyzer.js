const _ = require('lodash');
const math = require('mathjs');

const PRECISION = 3;

function createVectors(keyboard) {
    let vectors = [];

    _.forEach(keyboard, sign => {
        let vector = {
            words: [],
            parameters: []
        };

        let localVector = [];

        _.forEach(sign.charactersPressAndPause, symbol => {
            localVector.push(symbol.pressTime);
            !_.isNil(symbol.pauseTime) && localVector.push(symbol.pauseTime);

            if (symbol.key === ' ') {
                vector.words.push(localVector);
                localVector = [];
            }
        });

        localVector.length !== 0 && vector.words.push(localVector);
        vector.parameters.push(sign.mathematicalHope.press);
        vector.parameters.push(sign.mathematicalHope.pause);
        vector.parameters.push(sign.arrhythmia.alpha);
        vector.parameters.push(sign.arrhythmia.betta);
        vector.parameters.push(sign.speed);
        vector.parameters.push(sign.overlaps.averageTime);
        vector.parameters.push(sign.overlaps.averageSquareOffset);

        vectors.push(vector);
    });

    return vectors;
}

function calculateMathematicalHopes(vectors) {
    let mathematicalHope = {
        words: [],
        parameters: []
    };

    for (let i = 0; i < vectors[0].words.length; i++) {
        let word = [];

        for (let k = 0; k < vectors[0].words[i].length; k++) {
            let symbols = [];

            for (let j = 0; j < vectors.length; j++) {
                symbols.push(vectors[j].words[i][k]);
            }

            word.push(_.mean(symbols));
        }

        mathematicalHope.words.push(word);
    }

    for (let i = 0; i < vectors[0].parameters.length; i++) {
        let parameter = [];

        for (let j = 0; j < vectors.length; j++) {
            parameter.push(vectors[j].parameters[i]);
        }

        mathematicalHope.parameters.push(_.mean(parameter));
    }

    mathematicalHope.parameters = _.map(mathematicalHope.parameters, item => _.round(item, PRECISION));
    _.forEach(mathematicalHope.words, (word, index) => {
        mathematicalHope.words[index] = _.map(word, item => _.round(item, PRECISION));
    });

    return mathematicalHope;
}

function calculateCovMatrix(vectors, mathematicalHope) {
    let parameters = [];
    let words = [];

    for (let i = 0; i < vectors[0].parameters.length; i++) {
        parameters[i] = [];

        for (let j = 0; j < vectors[0].parameters.length; j++) {
            let sumArray = _.map(vectors, vector => {
                return (vector.parameters[i] - mathematicalHope.parameters[i]) * (vector.parameters[j] - mathematicalHope.parameters[j]);
            });

            parameters[i][j] = _.sum(sumArray) / (vectors.length - 1);
        }

        parameters[i] = _.map(parameters[i], item => _.round(item, PRECISION));
    }

    for (let i = 0; i < vectors[0].words.length; i++) {
        let word = [];

        for (let j = 0; j < vectors[0].words[i].length; j++) {
            word[j] = [];

            for (let k = 0; k < vectors[0].words[i].length; k++) {
                let sumArray = _.map(vectors, vector => {
                    return (vector.words[i][j] - mathematicalHope.words[i][j]) * (vector.words[i][k] - mathematicalHope.words[i][k]);
                });
    
                word[j][k] = _.sum(sumArray) / (vectors.length - 1);
            }

            word[j] = _.map(word[j], item => _.round(item, PRECISION));
        }

        words.push(word);
    }

    return { words, parameters };
}

function calculateInvMatrix(matrix) {
    let words = [];

    _.forEach(matrix.words, word => {
        words.push(_.map(math.inv(word), row => _.map(row, item => _.round(item, PRECISION))));
    });

    let parameters = _.map(math.inv(matrix.parameters), row => _.map(row, item => _.round(item, PRECISION)));

    return {
        words,
        parameters
    };
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
    const mathematicalHope = calculateMathematicalHopes(vectors);
    const covMatrix = calculateCovMatrix(vectors, mathematicalHope);
    const invMatrix = calculateInvMatrix(covMatrix);

    // const userVector = createVectors([keyboard])[0];
    // const result = calculateResult(userVector, invMatrix, mathematicalHope);

    return {
        vectors,
        mathematicalHope,
        covMatrix,
        invMatrix
    };
}

module.exports = {
    compare
};