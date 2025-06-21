import express from 'express';
import { checkOtp, checkUsername, confirmEmail, createUser, forgotPassword, googleLogin, loginUser, logoutUser, resetPassword } from '../controllers/auth.controller.js';
const authRouter = express.Router();


authRouter.post('/register', createUser);
authRouter.post('/checkusername', checkUsername);
authRouter.post('/login', loginUser);
authRouter.post('/googlelogin', googleLogin);
authRouter.get('/logout', logoutUser);
authRouter.post('/getotp', forgotPassword);
authRouter.post('/confirmemail', confirmEmail);
authRouter.post('/checkotp', checkOtp);
authRouter.post('/resetpassword', resetPassword);

export default authRouter;
