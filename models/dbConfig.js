const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://0.0.0.0:27017/creation-api",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(!err) console.log("DB connected");
        else console.log("Connection error: " + err)
    }
)

