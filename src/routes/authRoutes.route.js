const express = require('express');
const WrapAsync = require('../utils/WrapAsync');
const HomeController = require('../controllers/HomeController.controller');

const router = express.Router();

router.get('/', WrapAsync(HomeController.HomePath));

module.exports = router;