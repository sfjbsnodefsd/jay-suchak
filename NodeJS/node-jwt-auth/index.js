const express = require('express');

const app = express();
// json parser
app.use(express.json());

// load config
require('dotenv').config();


app.get('/', (req, res) => {
    res.send({
        message: "Test"
    });
})

app.use('/users', require('./api/users/users.routes'));

let server = app.listen(process.env.APP_PORT, () => {
    console.log('Server running on ', server.address().port);
})