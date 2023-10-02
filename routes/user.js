const express = require('express');
const getUser = require('../controllers/user/getUser');
const userRoute = express.Router();

userRoute.get('/:userId', getUser);

module.exports = getUser;