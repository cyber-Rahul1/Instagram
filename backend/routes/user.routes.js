import express from 'express';
import { followAndUnfollow, getAllMostFollowedUsers, getFollowers, getFollowing, getOtherUser, getUser, suggestedUsers, updateUser } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();


userRouter.get('/getuser', getUser);
userRouter.put('/updateuser', upload.single('profilepic') , updateUser);
userRouter.get('/getotheruser/:username', getOtherUser);
userRouter.get('/getallmostfollowedusers', getAllMostFollowedUsers);
userRouter.get('/getsuggestedusers', suggestedUsers);
userRouter.put('/followandunfollow/:id', followAndUnfollow);
userRouter.get('/getfollowers/:username', getFollowers);
userRouter.get('/getfollowing/:username', getFollowing);




export default userRouter;
