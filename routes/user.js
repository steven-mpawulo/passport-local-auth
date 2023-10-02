const express = require('express');
const getUser = require('../controllers/user/getUser');
const getUsers = require('../controllers/user/getUsers');
const userRoute = express.Router();

userRoute.get('/', getUsers);
userRoute.get('/:userId', getUser);

module.exports = getUser;