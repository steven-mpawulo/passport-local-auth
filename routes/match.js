const express = require('express');
const createMatch = require('../controllers/match/createMatch');
const deleteMatch = require('../controllers/match/deleteMatch');

const matchRoute = express.Router();

matchRoute.post('/:firstUserId/:secondUserId', createMatch);
matchRoute.delete('/:firstUserId/:secondUserId', deleteMatch);

module.exports = matchRoute;