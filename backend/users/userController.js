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
    const authData = JSON.parse(req.query.authData);

    User.findOne(authData).exec((err, user) => {
        if (err) {
            return res.send(err);
        }

        let difference = keyboardAnalyzer.compare(user.keyboard, keyboardData);

        res.send({ name: user.name, difference });
    });
}

function authByPassword(req, res) {
    const User = mongoose.model('User');
    const userData = JSON.parse(req.query.data);

    User.findOne(userData)
        .exec((err, user) => res.send((err || !user) ? {error: 'Password authentification failed'} : user));
}

function getAllUsers(req, res) {
    const User = mongoose.model('User');

    User.find({}).exec((err, users) => res.send(err ? {error: 'There are no users'} : users));
}

module.exports = {
    saveUserData,
    recognize,
    authByPassword,
    getAllUsers
};