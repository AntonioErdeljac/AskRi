const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  answer: String,
  answered: { type: Boolean, default: false },
  question: { type: String, required: [true, "can't be blank"] },
  receiver: { type: mongoose.Schema.ObjectId, ref: 'User' },
}, { timestamps: true });

QuestionSchema.methods.toJSON = function() {
  return {
    answer: this.answered ? this.answer : undefined,
    question: this.question,
    receiver: this.receiver,
  };
};

mongoose.model('Question', QuestionSchema);