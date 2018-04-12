const bodyParser = require('body-parser');

function register(app) {
    app.use(bodyParser.json());
}

module.exports = {
    register
};