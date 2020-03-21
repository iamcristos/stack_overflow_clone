import { body, param } from 'express-validator';

class AnswerValidation {
  static createAnswerRules() {
    return [
      body('answer').isString(),
      param('id').isMongoId().withMessage('user is required'),
      param('question').isMongoId().withMessage('question is required'),
    ];
  }

  static validateIds() {
    return [
      param('id').isMongoId().withMessage('user is required'),
      param('question').isMongoId().withMessage('question is required'),
    ];
  }
}

export default AnswerValidation;
