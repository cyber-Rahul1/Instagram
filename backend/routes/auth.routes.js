import express from 'express';
import { checkUsername, createUser, googleLogin, loginUser, logoutUser } from '../controllers/auth.controller.js';
const authRouter = express.Router();


authRouter.post('/register', createUser);
authRouter.post('/checkusername', checkUsername);
authRouter.post('/login', loginUser);
authRouter.post('/googlelogin', googleLogin);
authRouter.get('/logout', logoutUser);

export default authRouter;
