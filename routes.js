const express = require('express');
const userController = require('./controllers/userController');

const Router = express.Router();

Router.route('/').get(userController.getLeaderboard)
	.post(userController.newReport);

Router.route('/:email').get(userController.getReport);

module.exports = Router;
