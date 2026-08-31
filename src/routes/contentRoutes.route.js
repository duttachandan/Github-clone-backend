const express = require('express');
const router = express.Router();
const WrapAsync = require('../utils/WrapAsync');
const ContentController = require('../controllers/Content.controller');
const multerImaginary = require('../components/multerImaginary');

router.get('/', WrapAsync(ContentController.updateLogo));
router.post('/logo', multerImaginary.single('image'), WrapAsync(ContentController.getLogo));


module.exports = router;

