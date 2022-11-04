const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5001;
const amqp = require("amqplib");
const isAuthenticated = require("../auth-service/isAuthenticated");
var restTemplate = require("rest-template");
const request = require("request");
const cors = require('cors')
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
var response_from_pensioner_detail;


app.post("/processpension", isAuthenticated, async (req, res) => {
    const {
        aadhaar
    } = req.body;
    try {
        response_from_pensioner_detail = await getPensioner(aadhaar);
        if (!response_from_pensioner_detail.success) {
            throw new Error(response_from_pensioner_detail.err);
        }
        const {
            classification,
            salary_earned,
            allowances,
            bank_detail
        } =
        response_from_pensioner_detail.pensioner;
        const pensionPercentage = await getPensionPercentage(classification);
        console.log("pensionPercentage", pensionPercentage);
        if (pensionPercentage && pensionPercentage.percentage === null) {
            console.error("[DEBUG] Provided Pension classifation is not supported");
            throw new Error("Internal Server Error");
        }

        const PensionAmount = (80 * salary_earned) / 100 + allowances;
        const ServiceCharge = await getBankServiceCharge(bank_detail.bank_type);
        console.log("serviceCharge ",ServiceCharge);
        if (ServiceCharge && ServiceCharge.serviceCharge === null) {
            console.error("[DEBUG] Provided Bank classifation is not supported");
            throw new Error("Internal Server Error");
        }

        return res.status(200).json({
            success: 1,
            pensionDetail: {
                PensionAmount,
                ServiceCharge,
            },
        });
    } catch (err) {
        console.log("[ERROR] ", err);
        // err = err.toString();
        // err = err.split('Error:')[1];
        return res.status(500).json({
            success: 0,
            err
        });
    }
});

const getPensioner = (aadhaar) =>
    new Promise((resolve, reject) => {
        request.get(
            `http://localhost:5002/${aadhaar}`, {
                json: true
            },
            (err, res, body) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(body);
            }
        );
    });

const getPensionPercentage = (classification) => 
    new Promise((resolve, reject) => {
        console.log("classification", classification);
        request.get(
            `http://localhost:5004/getPensionPercentage/${classification}`, {
                json: true
            },
            (err, res, body) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(body);
            }
        );
    });


const getBankServiceCharge = (bank_type) => 
    new Promise((resolve, reject) => {
        request.get(
            `http://localhost:5004/getBankServiceCharge/${bank_type}`, {
                json: true
            },
            (err, res, body) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(body);
            }
        );
    });


app.listen(PORT, () => {
    console.log(`PENSIONER-DETAIL-SERVICE Running at PORT ${PORT}`);
});