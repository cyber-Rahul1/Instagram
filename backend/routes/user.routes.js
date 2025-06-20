import express from 'express';
import { checkOtp, confirmEmail, forgotPassword, getUser, resetPassword, updateUser } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();


userRouter.get('/getuser', getUser);
userRouter.put('/updateuser', upload.single('profilepic') , updateUser);
userRouter.post('/getotp', forgotPassword);
userRouter.post('/confirmemail', confirmEmail);
userRouter.post('/checkotp', checkOtp);
userRouter.post('/resetpassword', resetPassword);





export default userRouter;
