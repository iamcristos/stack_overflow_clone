import express from 'express';
import questionController from '../controller/question.controller';
import validation from '../validation';
import middleware from '../middleware';

const router = express.Router();

router.get('/questions/search', [validation.Question.search(), validation.validate], questionController.search);

router.route('/question/:id')
  .post([validation.Question.createQuestionRules(), validation.validate],
    [middleware.user.protectedRoute, middleware.user.restrictedRoute],
    questionController.askQuestion)
  .get([validation.Question.validateId(), validation.validate], questionController.viewQuestion);


router.post('/question/:id/upvote', [validation.Question.upVoteValidate(), validation.validate],
  [middleware.user.protectedRoute, middleware.question.validateQuestion,
    middleware.question.updateVote],
  questionController.upVote);

router.post('/question/:id/downvote', [validation.Question.upVoteValidate(), validation.validate],
  [middleware.user.protectedRoute, middleware.question.validateQuestion,
    middleware.question.updateDownVote],
  questionController.downVote);

router.post('/question/:id/subscribe', [validation.Question.upVoteValidate(), validation.validate],
  [middleware.user.protectedRoute, middleware.question.validateQuestion,
    middleware.question.checkSubscribtion],
  questionController.subscribe);


export default router;
