import express from 'express';
import { addRecentUsers, clearOneRecentUser, clearRecentUsers, followAndUnfollow, getAllMostFollowedUsers, getAllUsers, getFollowers, getFollowing, getRecentUsers, getUser, getUserProfile, removeProfilePic, suggestedUsers, updateUser } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();


userRouter.get('/getuser', getUser);
userRouter.get('/getallusers', getAllUsers);
userRouter.put('/updateuser', upload.single('profilepic') , updateUser);
userRouter.put('/removeprofilepic', removeProfilePic);
userRouter.get('/getuserprofile/:identifier', getUserProfile);
userRouter.get('/getallmostfollowedusers', getAllMostFollowedUsers);
userRouter.get('/getsuggestedusers', suggestedUsers);
userRouter.get('/followandunfollow/:identifier', followAndUnfollow);
userRouter.get('/getfollowers/:identifier', getFollowers);
userRouter.get('/getfollowing/:identifier', getFollowing);
userRouter.post('/addrecentusers', addRecentUsers);
userRouter.get('/getrecentusers', getRecentUsers);
userRouter.get('/clearrecentusers', clearRecentUsers);
userRouter.post('/clearonerecentuser', clearOneRecentUser);




export default userRouter;
