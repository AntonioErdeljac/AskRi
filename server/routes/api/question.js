const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../auth');

const User = mongoose.model('User');
const Question = mongoose.model('Question');

router.post('/new', (req, res, next) => {
  if(!req.body.question.question) {
    return res.status(402).json({ errors: { question: 'is required' } });
  }

  if(!req.body.question.receiver) {
    return res.status(402).json({ errors: { receiver: 'is required' } });
  }

  User.findOne({ username: req.body.question.receiver }).then(receiver => {
    const question = new Question(req.body.question);
    question.receiver = receiver._id;
    return question.save().then(() => {
      receiver.questions = (receiver.questions || []).concat([question]);
      return receiver.save().then(() => {
        return res.json({ question: question.toJSON() });
      });
    });
  }).catch(next);
});

router.get('/private', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if(!user) { return res.sendStatus(402); }

    return Question.find({receiver: user})
    .populate('receiver')
    .then(questions => {
      return res.json({
        questions: questions.map(question => {
          return question.toJSON();
        }),
      });
    });
  }).catch(next);
});

router.param('id', (req,res, next, id) => {
  Question.findById(id)
  .populate('receiver')
  .then(question => {
    if(!question) { return res.sendStatus(404); }

    req.question = question;
    return next();
  }).catch(next);
});

router.delete('/:id', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if(!user) { return res.sendStatus(422); }

    if(user._id.toString() === req.question.receiver._id.toString()) {
      return req.question.remove().then(() => {
        return res.sendStatus(200);
      });
    }
    return res.sendStatus(403);
  }).catch(next);
});

router.post('/:id/answer', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if(!user) { return res.sendStatus(402); }

    if(user._id.toString() === req.question.receiver.toString()) {
      if(!req.body.answer.answer) {
        return res.status(402).json({ errors: { answer: 'is required' } });
      }
      req.question.answer = req.body.answer.answer;
      req.question.answered = true;
      return req.question.save().then(() => {
        return res.json({ question: req.question });
      });
    }
    return res.sendStatus(403);
  }).catch(next);
});

router.param('username', (req, res, next, username) => {
  User.findOne({ username: username }).then(user => {
    if(!user) { return res.sendStatus(404); }

    req.profile = user;
    return next();
  }).catch(next);
});

router.get('/profile/:username', auth.optional, (req, res, next) => {
  Question.find({receiver: req.profile, answered: true})
  .populate('receiver')
  .then(questions => {
    return res.json({
      questions: questions.map(question => {
        return question.toJSON();
      }),
    });
  }).catch(next);
});

module.exports = router;