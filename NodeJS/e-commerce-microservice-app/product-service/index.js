const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5001;
const jwt = require("jsonwebtoken");
const amqp = require('amqplib');
const product = require('./product');
const isAuthenticated = require('../isAuthenticated');
app.use(express.json());
var channel, connection;
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
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel()
    await channel.assertQueue('PRODUCT');
}
connect();
// create a new product 
// buy a new product 
app.post('/product/create', isAuthenticated, async (req, res) => {
    try {
        let {
            name,
            description,
            price
        } = req.body;
        let newProduct = await new product({
            name,
            description,
            price
        });
        return res.send({
            message: 'Created',
            newProduct
        })
    } catch (error) {
        return res.send(error);
    }
})

// user will send a lift of the products that the user wants to buy , they will be identified by the product id 
// the order will be created of those products and the sum of the products prices will be the total billing amount 
app.post('/product/buy', isAuthenticated, async (req, res) => {
    try {
        let {
            ids
        } = req.body;
        let products = await new product.find(_id, {
            $in: ids
        });
        channel.sendToQueue('ORDER', Buffer.from(JSON.stringify({
            products,
            userEmail: req.user.email
        })))
    } catch (error) {
        return res.send(error);
    }
})
app.listen(PORT, () => {
    console.log(`Auth service at ${PORT}`);
});