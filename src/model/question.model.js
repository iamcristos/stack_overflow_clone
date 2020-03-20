import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  body: {
    type: String,
    required: [true, 'body is required'],
  },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'user asking the question is required'],
    ref: 'user',
  },
  upVote: [{
    type: mongoose.Schema.Types.ObjectId,
    // unique: true,
    ref: 'user',
  }],
  downVote: [{
    type: mongoose.Schema.Types.ObjectId,
    // unique: true,
    ref: 'user',
  }],
  subscribedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    // unique: true,
    ref: 'user',
  }],
},
{ timestamps: true });

const Question = mongoose.model('question', questionSchema);

export default Question;
