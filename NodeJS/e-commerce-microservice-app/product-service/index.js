const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5001;
const jwt = require("jsonwebtoken");
const amqp = require('amqplib');
app.use(express.json());

mongoose.connect(
    "mongodb://localhost:27017/product-service", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log(`product service DB  Connected`);
    }
);
async function connect() {
    const amqpServer = 'amqp://localhost:5672'
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel()
    await channel.assertQueue('PRODUCT');
}
connect();

app.listen(PORT, () => {
    console.log(`Auth service at ${PORT}`);
});