import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();


userRouter.get('/getuser', getUser);
userRouter.put('/updateuser', upload.single('profilepic') , updateUser);




export default userRouter;
