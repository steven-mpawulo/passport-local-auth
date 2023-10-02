const express = require('express');
const authRoute = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (username, password, done) {
        if (!username && !password) {
            res.status(400).json({"message": "please provide email and password"});
        }
        console.log(`username: ${username}, password: ${password}`);
        await User.findOne({ 'email': username }).then(async (user) => {
            console.log(user);
            if (!user) { return done(null, false);}
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword) { return done(null, false); }
            return done(null, user);
        }).catch((e) => {
            console.log(e);
            if (e) { return done(e); }
        });
    }
));
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user._id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

authRoute.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        res.json({ "message": "user successfully logged in", "user": req.user });
    } else {
        res.json({ "message": "failed to login user" });
    }
});

authRoute.post('/signup', );

authRoute.post('/logout', (req, res, next) => {
    req.logOut(function (err) {
        if (err) {next(err);}
        res.json({"message": "user logged out", "user": req.user});
    });
});


module.exports = authRoute;