const express = require("express");
const app = express();


app.get("", (req, res) => {
    res.end("Hello world")
});
let server = app.listen(3000, () => {
    console.log("Server running at ", server.address().port);
})