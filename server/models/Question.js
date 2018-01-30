const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  answer: String,
  answered: { type: Boolean, default: false },
  question: { type: String, required: [true, "can't be blank"] },
  receiver: { type: mongoose.Schema.ObjectId, ref: 'User' },
}, { timestamps: true });

QuestionSchema.methods.toJSON = function() {
  return {
    id: this._id,
    answer: this.answered ? this.answer : undefined,
    question: this.question,
    createdAt: this.createdAt,
  };
};

mongoose.model('Question', QuestionSchema);