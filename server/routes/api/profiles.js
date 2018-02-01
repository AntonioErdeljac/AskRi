const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const auth = require('../auth');

router.param('username', (req, res, next, username) => {
  User.findOne({ username: username })
  .populate('questions')
  .then(user => {
    if(!user){
      return res.sendStatus(404);
    }

    req.profile = user;
    return next();
  }).catch(next);
});

router.get('/:username', auth.optional, (req, res, next) => {
  return res.json({profile: req.profile.toJSON()});
});

router.get('/:search', auth.optional, (req, res, next) => {

});

module.exports = router;