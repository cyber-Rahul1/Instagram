import express from 'express';
import { checkUsername, createUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
const authRouter = express.Router();


authRouter.post('/register', createUser);
authRouter.post('/checkusername', checkUsername);
authRouter.post('/login', loginUser);
authRouter.get('/logout', logoutUser);

export default authRouter;
