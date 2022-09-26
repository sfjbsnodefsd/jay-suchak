const express = require('express');

const app = express();
// json parser
app.use(express.json());

// database connect
const connection = require('./config/database');

app.get('/', (req, res) => {
    res.send({
        message: "Test"
    });
})
let server = app.listen(3000, () => {
    console.log('Server running on ', server.address().port);
})