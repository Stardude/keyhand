const mongoose = require('mongoose');

const requiredMsg = '{PATH} is required!';

function declareSchema() {
    const userSchema = mongoose.Schema({
        name: { type: String, required: requiredMsg },
        password: { type: String, required: requiredMsg },
        keyboard: [{
            charactersPressAndPause: [{
                key: String,
                pressTime: Number,
                pauseTime: Number
            }],
            mathematicalHope: {
                pause: Number,
                press: Number
            },
            arrhythmia: {
                alpha: Number,
                betta: Number
            },
            speed: Number,
            overlaps: {
                averageTime: Number,
                averageSquareOffset: Number
            }
        }]
    });

    const User = mongoose.model('User', userSchema);
}

module.exports = {
    declareSchema
};