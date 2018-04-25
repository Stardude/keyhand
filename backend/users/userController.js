const mongoose = require('mongoose');

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

module.exports = {
    saveUserData
};