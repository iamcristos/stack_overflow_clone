import { body, param } from 'express-validator';

class QuestionValidation {
  static createQuestionRules() {
    return [
      body('title').isString(),
      body('body').exists(),
      param('id').isMongoId(),
    ];
  }

  static userIdValidate(field) {
    return [
      // body(field).isMongoId(),
      body('userId').isMongoId(),
      param('id').isMongoId(),
    ];
  }

  static subscribeValidation() {
    return QuestionValidation.userIdValidate('subscribedUsers');
  }

  static upVoteValidate() {
    return QuestionValidation.userIdValidate('upVote');
  }

  static downVoteValidate() {
    return QuestionValidation.userIdValidate('downVote');
  }

  static validateId() {
    return [
      param('id').isMongoId().withMessage('invalid question id'),
    ];
  }
}

export default QuestionValidation;
