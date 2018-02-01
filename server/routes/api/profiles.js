const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const auth = require('../auth');

router.get('/search', auth.optional, (req, res, next) => {
  const value = req.query.username;
  if(value.length !== 0) {
    User.find({ username: new RegExp(value, 'i') }).then((users) => {
      return res.json({ users: users.map(user => user.toJSON()) });
    }).catch(next);
  }
});

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



module.exports = router;