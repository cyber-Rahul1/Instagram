import express from 'express';
import { checkOtp, forgotPassword, getUser, resetPassword, updateUser } from '../controllers/user.controller.js';
const userRouter = express.Router();


userRouter.get('/getuser', getUser);
userRouter.put('/updateuser', updateUser);
userRouter.post('/getotp', forgotPassword);
userRouter.post('/checkotp', checkOtp);
userRouter.post('/resetpassword', resetPassword);





export default userRouter;
