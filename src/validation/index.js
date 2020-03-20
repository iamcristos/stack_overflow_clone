import { validationResult } from 'express-validator';
import UserValidation from './user.validation';
import Question from './question.validation';

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
}


const validation = { UserValidation, validate, Question };

export default validation;
