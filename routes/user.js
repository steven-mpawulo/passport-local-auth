const express = require('express');
const getUser = require('../controllers/user/getUser');
const retreiveUsers = require('../controllers/user/getUsers');
const userRoute = express.Router();

userRoute.get('/', retreiveUsers);
userRoute.get('/:userId', getUser);

module.exports = userRoute;