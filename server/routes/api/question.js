const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../auth');

const User = mongoose.model('User');
const Question = mongoose.model('Question');

router.post('/new', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if(!user) { return res.sendStatus(422); }

    if(!req.body.question.question) {
      return res.status(402).json({ errors: { question: 'is required' } });
    }

    const question = new Question(req.body.question);
    question.receiver = user._id;
    return question.save().then(() => {
      user.questions = (user.questions || []).concat([question]);
      return user.save().then(() => {
        return res.json({ question: question.toJSON() });
      });
    });
  }).catch(next);
});

module.exports = router;