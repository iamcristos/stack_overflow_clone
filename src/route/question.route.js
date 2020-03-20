import express from 'express';
import questionController from '../controller/question.controller';
import validation from '../validation';
import middleware from '../middleware';

const router = express.Router();

router.route('/question/:id')
  .post([validation.Question.createQuestionRules(), validation.validate],
    [middleware.user.protectedRoute, middleware.user.restrictedRoute],
    questionController.askQuestion)
  .get([validation.Question.validateId(), validation.validate], questionController.viewQuestion);


router.post('/question/:id/upvote', [validation.Question.upVoteValidate(), validation.validate],
  [middleware.user.protectedRoute, middleware.question.validateQuestion, 
    middleware.question.updateVote],
  questionController.upVote);

export default router;
