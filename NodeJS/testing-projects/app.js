const express = require('express')

const app = express();

app.get('/test', (req, res) => {
    return res.end('hello world')
});

app.get('/test/subject', (req, res) => {
    return res.send(['hello', 'world'])
});

const add = (a, b) => a + b;
module.exports = {
    app,
    add
};