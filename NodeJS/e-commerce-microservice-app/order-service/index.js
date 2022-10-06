const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5002;
const jwt = require("jsonwebtoken");
const amqp = require('amqplib');
const order = require('./order');
const isAuthenticated = require('../isAuthenticated');
app.use(express.json());
var channel, connection;
mongoose.connect(
    "mongodb://localhost:27017/order-service", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log(`order service DB  Connected`);
    }
);
async function connect() {
    const amqpServer = 'amqp://localhost:5672'
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel()
    await channel.assertQueue('ORDER');
}
connect();

app.listen(PORT, () => {
    console.log(`Auth service at ${PORT}`);
});