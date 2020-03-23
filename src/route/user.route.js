import express from 'express';
import userController from '../controller/user.controler';
import validation from '../validation';
import middleware from '../middleware/user.middleware';

const router = express.Router();

router.post('/register', [validation.UserValidation.createUserRules(), validation.validate], [middleware.validateUserSignUp], userController.createUser);

router.post('/login', [middleware.validateUserLogin], userController.loginUser);


router.get('/user/search', [validation.UserValidation.searchUser(), validation.validate], userController.searchUser);

export default router;
