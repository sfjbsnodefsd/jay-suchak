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

function createOrder(products, userEmail) {
    let total = 0;
    for (const product of products) {
        total += product.price;
    }
    let newOrder = new order({
        products,
        user: userEmail,
        total_price: total
    })
    newOrder.save()
    return newOrder;
}
async function connect() {
    const amqpServer = 'amqp://localhost:5672'
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel()
    await channel.assertQueue('ORDER');
}
connect().then(() => {
    channel.consume('ORDER', data => {
        const {
            products,
            userEmail
        } = JSON.parse(data.content);
        let newOrder = createOrder(products, userEmail);
        console.log('Consuming order queue');
        console.log(products);
        channel.ack(data);
        channel.sendToQueue('PRODUCT', Buffer.from(JSON.stringify({
            newOrder
        })));
    })
});

app.listen(PORT, () => {
    console.log(`Auth service at ${PORT}`);
});