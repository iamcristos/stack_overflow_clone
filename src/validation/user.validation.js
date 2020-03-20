import { body } from 'express-validator';

class UserValidation {
  static createUserRules() {
    return [
      body('email').isEmail(),
      body('username').isLength({ min: 2 }),
      body('password').isLength({ min: 5 }),
    ];
  }
}

export default UserValidation;
