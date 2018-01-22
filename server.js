const express = require('express');

const app = express();
app.use(express.static('frontend'));

app.listen(process.env.PORT);

console.log('Listening on port 3000...');