const express = require('express');
const mongoose = require('mongoose');
const authRoute = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        const verifyPassword = bcrypt.compare(password, user.password);
        if (!verifyPassword) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

authRoute.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        res.json({"message": "user successfully logged in", "user": req.user});
    } else {
        res.json({"message": "failed to login user"});
    }
});

authRoute.post('/signup', async (req, res) => {
    const { email, password, userName} = req.body;
    if (!email && !password && !userName) {
        res.status(400).json({"message": "please provide the required data for sign up"});
        return;
    }
    const user = new User({
        "email": email,
        "password": password,
        "userName": userName,
    });

    await user.save().then((newuser) => {
        console.log(newUser);
        if (newUser){
            res.status(201).json({"message": "user sign up successful", "user": newUser});
        } else {
            res.status(400).json({"message": "failed to sign up user"});
        }
    }).catch((e) => {
        console.log(e);
        res.status(400).json({"message": "something went wrong", "error": e});
    });

});


module.exports = authRoute;