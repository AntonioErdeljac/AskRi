const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post('/new', (req, res, next) => {
  const user = new User(req.body.user);

  user.setPassword(req.body.user.password);

  return user.save().then(() => {
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

module.exports = router;