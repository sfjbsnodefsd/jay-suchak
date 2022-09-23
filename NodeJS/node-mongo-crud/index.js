const express = require('express');
const app = express();
const dotenv = require('dotenv');
const users = require('./routes/users');
// set env config
dotenv.config();

//  json middleware
app.use(express.json());



// Using Node.js `require()`
const mongoose = require('mongoose');

let conn = mongoose.connect(process.env.DB_CONNECT);

// routes
app.get('/', (req, res) => {
    return res.send('Hello world')
})
app.use('/users', users);

conn.then(() => {
    console.log('db connected');
}).catch((err) => {
    console.log(err);
})

let server = app.listen(process.env.PORT, () => {
    console.log('Server running at', server.address().port);
})