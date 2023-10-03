const express = require('express');
const createMatch = require('../controllers/match/createMatch');
const deleteMatch = require('../controllers/match/deleteMatch');
const getMatches = require('../controllers/match/getMatches');

const matchRoute = express.Router();

matchRoute.post('/:firstUserId/:secondUserId', createMatch);
matchRoute.delete('/:matchId', deleteMatch);
matchRoute.get('/', getMatches);

module.exports = matchRoute;