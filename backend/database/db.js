const mongoose = require('mongoose');

const user = require('./models/user');
const dbURL = 'mongodb://ychubei:keyhand@ds223009.mlab.com:23009/keyhand';

function register() {
    mongoose.connect(dbURL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('keyhand db opened');
        user.declareSchema();
    });
}

module.exports = register;