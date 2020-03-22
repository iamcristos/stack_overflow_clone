import express from 'express';
import answerController from '../controller/answer.controller';
import validation from '../validation';
import middleware from '../middleware';

const router = express.Router();

router.get('/answer/search', [validation.Answer.search(), validation.validate], answerController.search);

router.route('/answer/:id/:question')
  .post([validation.Answer.createAnswerRules(), validation.validate],
    [middleware.user.protectedRoute, middleware.user.restrictedRoute],
    [middleware.answer.validateQuestion],
    answerController.answerQuestion)
  .get([validation.Answer.validateIds(), validation.validate],
    [middleware.user.protectedRoute, middleware.answer.validateQuestion],
    answerController.viewAnswers);


export default router;
