const express = require('express');
const getUser = require('../controllers/user/getUser');
const userRoute = express.Router();

userRoute.get('/users', getUser);

module.exports = getUser;