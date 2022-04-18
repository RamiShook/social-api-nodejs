/* eslint-disable import/extensions */
import express from 'express';
import signupRequestValidation from '../middlewares/auth/signupRequest.middleware.js';
import loginRequestValidation from '../middlewares/auth/loginRequest.middleware.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signupRequestValidation, authController.signup);

router.post('/login', loginRequestValidation, authController.login);

router.get('/user/:UserId', authController.findById);

export default router;
