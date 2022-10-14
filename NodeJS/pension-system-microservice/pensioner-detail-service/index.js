const express = require('express');
require("dotenv").config();
const mongoose = require("mongoose");
const PensionerDetail = require("./PensionerDetail");
const PORT = process.env.PORT || 5002;
const amqp = require("amqplib");
const isAuthenticated = require('../auth-service/isAuthenticated');
const app = express();
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/PMS-pensioner-detail-service", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("[PENSIONER_DETAIL-SERVICE] - Connected to database"))
    .catch((err) => {
        console.error(err);
        console.error("[PENSIONER_DETAIL-SERVICE] - DB connection failed!");
    });

let connection, channel;

// async function connect() {
//     const amqpServer = "amqp://localhost:5672";
//     connection = await amqp.connect(amqpServer);
//     channel = await connection.createChannel();
//     await channel.assertQueue("PENSIONER_DETAIL");
// }

// connect().then(async () => {
//     channel.consume("PENSIONER_DETAIL", async (data) => {

//         const {
//             aadhaar
//         } = JSON.parse(data.content);
//         channel.ack(data);
//         try {
//             let pensioner = await PensionerDetail.findOne({
//                 aadhaar
//             });
//             channel.sendToQueue(
//                 "PROCESS_PENSION",
//                 Buffer.from(JSON.stringify({
//                     success: true,
//                     pensioner
//                 }))
//             );

//         } catch (err) {
//             channel.sendToQueue(
//                 "PROCESS_PENSION",
//                 Buffer.from(JSON.stringify({
//                     success: false,
//                     err
//                 }))
//             );
//         }
//     });
// });

// get a pensioner detail by adhaar
app.get("/:aadhaar", async (req, res) => {
    try {

        let aadhaar = req.params.aadhaar;
        console.log(aadhaar);
        const pensioner = await PensionerDetail.find({
            aadhaar
        }).lean();

        return res.send({
            success: true,
            pensioner: pensioner[0],
            message: 'Pensioner detail'
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error
        })
    }
});

app.listen(PORT, () => {
    console.log(`[PENSIONER_DETAIL-SERVICE] - LIVE AT PORT ${PORT}`);
});