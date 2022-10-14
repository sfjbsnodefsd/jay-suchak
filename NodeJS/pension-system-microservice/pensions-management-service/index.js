const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5001;
const amqp = require("amqplib");
const isAuthenticated = require("../auth-service/isAuthenticated");
var restTemplate = require("rest-template");
const request = require("request");

const app = express();
app.use(express.json());

var response_from_pensioner_detail;


app.post("/processpension", isAuthenticated, async (req, res) => {
    const {
        aadhaar
    } = req.body;
    try {
        response_from_pensioner_detail = await getPensioner(aadhaar);
        console.log(response_from_pensioner_detail);
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
        const pensionPercentage = getPensionPercentage(classification);
        if (pensionPercentage === null) {
            console.error("[DEBUG] Provided Pension classifation is not supported");
            throw new Error("Internal Server Error");
        }

        const PensionAmount = (80 * salary_earned) / 100 + allowances;
        const ServiceCharge = getBankServiceCharge(bank_detail.bank_type);
        if (ServiceCharge === null) {
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
        console.log(aadhaar);
        request.get(
            `http://localhost:5002/${aadhaar}`, {
                json: true
            },
            (err, res, body) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log(body);
                resolve(body);
            }
        );
    });

const getPensionPercentage = (classification) => {
    let percentage = null;
    switch (classification.toUpperCase()) {
        case "SELF":
            percentage = 80;
            break;

        case "FAMILY":
            percentage = 50;
            break;
    }
    return percentage;
};

const getBankServiceCharge = (bank_type) => {
    let serviceCharge = null;

    switch (bank_type.toUpperCase()) {
        case "PUBLIC":
            serviceCharge = 500;
            break;
        case "PRIVATE":
            serviceCharge = 550;
            break;
    }

    return serviceCharge;
};

app.listen(PORT, () => {
    console.log(`PENSIONER-DETAIL-SERVICE Running at PORT ${PORT}`);
});