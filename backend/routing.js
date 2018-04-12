
const userRoute = require('./users/usersRoute');

function register(app) {
    app.use('/user', userRoute);
}

module.exports = {
    register
};