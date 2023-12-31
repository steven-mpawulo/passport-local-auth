const express = require('express');
const authRoute = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const signup = require('../controllers/auth/signup');
const logOut = require('../controllers/auth//logout');
const login = require('../controllers/auth/login');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (username, password, done) {
        console.log(`username: ${username}, password: ${password}`);
        await User.findOne({ 'email': username }).then(async (user) => {
            console.log(user);
            if (!user) { return done(null, false, {message: "user not found"});}
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword) { return done(null, false, {message: "incorrect password"}); }
            return done(null, user);
        }).catch((e) => {
            console.log(e);
            if (e) { return done(e, {message: "something went wrong"}); }
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

authRoute.post('/login', passport.authenticate('local'), login);

authRoute.post('/signup', signup);

authRoute.post('/logout', logOut);


module.exports = authRoute;