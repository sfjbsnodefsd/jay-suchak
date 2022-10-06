const mongoose = require("mongoose");
(async () => {
    await mongoose.connect(
        "mongodb://localhost:27017/employees", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    console.log('DB Connect');
})();