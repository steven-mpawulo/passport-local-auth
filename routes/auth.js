const express = require('express');
const mongoose = require('mongoose');
const authRoute = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');


passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

authRoute.post('/login', (req, res) => {

});


module.exports = authRoute;