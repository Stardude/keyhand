const mongoose = require('mongoose');

function saveUserData(req, res) {
    const User = mongoose.model('User');
    const userData = req.body;

    User.findOne({name: userData.name}).exec((err, finded) => {
        if (!err && finded.length === 0) {
            User.create(userData, (err, user) => {
                if (err) {
                    return res.send(err);
                }
        
                return res.send(user);
            });
        }
    });
}

module.exports = {
    saveUserData
};