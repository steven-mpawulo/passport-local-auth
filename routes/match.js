const express = require('express');
const createMatch = require('../controllers/match/createMatch');
const deleteMatch = require('../controllers/match/deleteMatch');
const getMatches = require('../controllers/match/getMatches');
const getMatch = require('../controllers/match/getMatch');

const matchRoute = express.Router();

matchRoute.post('/:firstUserId/:secondUserId', createMatch);
matchRoute.delete('/:matchId', deleteMatch);
matchRoute.get('/', getMatches);
matchRoute.get('/:matchId', getMatch);

module.exports = matchRoute;