import { body, validationResult } from 'express-validator';

class UserValidation {
  static createUserRules() {
    return [
      body('email').isEmail(),
      body('username').isLength({ min: 2 }),
      body('password').isLength({ min: 5 }),
    ];
  }

  static validate(req, res, next) {
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
}

export default UserValidation;
