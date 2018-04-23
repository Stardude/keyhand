
function saveUserData(req, res) {
    const userData = {
        name: 'Yurii',
        keyboard: req.body
    };

    const User = require('mongoose').model('User');

    User.create(userData, (err, user) => {
        if (err) {
            return res.send(err);
        }

        return res.send(user);
    });
}

module.exports = {
    saveUserData
};