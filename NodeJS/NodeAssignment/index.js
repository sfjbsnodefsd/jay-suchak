const express = require("express");

const app = express();
const PORT = 5002;
app.use(express.json());

require('./models/index');

app.use('/employee', require('./routes/employeesRoutes'))

app.listen(PORT, () => {
    console.log(`Auth service at ${PORT}`);
});