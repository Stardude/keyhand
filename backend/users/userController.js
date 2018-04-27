const mongoose = require('mongoose');
const _ = require('lodash');

const keyboardAnalyzer = require('./../services/keyboardAnalyzer');

function saveUserData(req, res) {
    const User = mongoose.model('User');
    const userData = req.body;

    User.findOne({name: userData.name}).exec((err, finded) => {
        if (err) {
            return res.send(err);
        } else if (finded) {
            return res.send({message: 'User exists'});
        } else {
            User.create(userData, (err, user) => {
                if (err) {
                    return res.send(err);
                }
        
                return res.send(user);
            });
        }
    });
}

function recognize(req, res) {
    const User = mongoose.model('User');
    const keyboardData = JSON.parse(req.query.data);
    let results = [];

    User.findOne({name: 'Yurii'}).exec((err, user) => {
        if (err) {
            return res.send(err);
        }

        let difference = keyboardAnalyzer.compare(user.keyboard, keyboardData);
        results.push({ name: user.name, difference });

        res.send(results);
    });
}

module.exports = {
    saveUserData,
    recognize
};