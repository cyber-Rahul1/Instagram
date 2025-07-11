import express from 'express';
import { followAndUnfollow, getAllMostFollowedUsers, getAllUsers, getFollowers, getFollowing, getUser, getUserProfile, removeProfilePic, suggestedUsers, updateUser } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();


userRouter.get('/getuser', getUser);
userRouter.get('/getallusers', getAllUsers);
userRouter.put('/updateuser', upload.single('profilepic') , updateUser);
userRouter.put('/removeprofilepic', removeProfilePic);
userRouter.get('/getuserprofile/:identifier', getUserProfile);
userRouter.get('/getallmostfollowedusers', getAllMostFollowedUsers);
userRouter.get('/getsuggestedusers', suggestedUsers);
userRouter.put('/followandunfollow/:id', followAndUnfollow);
userRouter.get('/getfollowers/:username', getFollowers);
userRouter.get('/getfollowing/:username', getFollowing);




export default userRouter;
