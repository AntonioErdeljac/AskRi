const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/question', require('./question'));
router.use('/profiles', require('./profiles'));

module.exports = router;