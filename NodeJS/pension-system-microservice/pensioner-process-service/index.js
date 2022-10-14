const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5004;

const app = express();
app.use(express.json());

app.get('/getPensionPercentage/:classification', (req, res) => {
    try {
        let classification = req.params.classification;
        let percentage;
        switch (classification.toUpperCase()) {
            case "SELF":
                percentage = 80;
                break;

            case "FAMILY":
                percentage = 50;
                break;
        }
        return res.send({
            sucess: true,
            percentage
        });
    } catch (error) {
        return res.send({
            sucess: false,
            error
        });
    }
})

app.get('/getBankServiceCharge/:bank_type', (req, res) => {
    try {
        let serviceCharge = null;
        let bank_type = req.params.bank_type
        console.log(bank_type);
        switch (bank_type.toUpperCase()) {
            case "PUBLIC":
                serviceCharge = 500;
                break;
            case "PRIVATE":
                serviceCharge = 550;
                break;
        }

        return res.send({
            sucess: true,
            serviceCharge
        });
    } catch (error) {
        return res.send({
            sucess: false,
            error
        });
    }
})

app.listen(PORT, () => {
    console.log(`PENSIONER-DETAIL-SERVICE Running at PORT ${PORT}`);
});