const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 4001;

mongoose.connect(process.env.DB_URL).then((value) => {
    console.log("database connected");
    app.listen(port, () => {
        console.log("server started");
    });
}).catch((e) => {
console.log("database failed to connect");
});