import mongoose from 'mongoose';

const answerSchema = mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question',
    required: [true, 'question is required'],
  },
  notified: {
    type: Boolean,
    default: false,
  },
  answer: {
    type: String,
    required: [true, 'answer is required'],
  },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'user answering the question is required'],
  },
});

answerSchema.index({ answer: 1 });

const Answer = mongoose.model('answer', answerSchema);

export default Answer;
