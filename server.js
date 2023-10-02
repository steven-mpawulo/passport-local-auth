const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const passport = require('passport');
const session = require('express-session');
const matchRoute = require('./routes/match');



const app = express();

app.use(session({
    secret: 'trialSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/match', matchRoute);

const port = process.env.PORT || 4001;

mongoose.connect(process.env.DB_URL).then((value) => {
    console.log("database connected");
    app.listen(port, () => {
        console.log("server started");
    });
}).catch((e) => {
    console.log("database failed to connect");
});