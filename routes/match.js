const express = require('express');
const createMatch = require('../controllers/match/createMatch');

const matchRoute = express.Router();

matchRoute.post('/:firstUserId/:secondUserId', createMatch);

module.exports = matchRoute;