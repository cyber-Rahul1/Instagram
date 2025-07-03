import express from 'express';
import upload from '../middlewares/multer.js';
import { addReply, createPost, deletePost, getAllComments, getAllLikesOnComment, getAllLikesOnPost, getAllPosts, getAllReels, getSavedUsersOnPosts, getUserPosts, getUserReels, getUserSavedPosts, likeComment, likePost, postComment, saved } from '../controllers/post.controller.js';
const postRouter = express.Router();



postRouter.post('/createpost', upload.single('image'), createPost);
postRouter.delete('/deletepost/:postid', deletePost);
postRouter.get('/getallposts', getAllPosts);
postRouter.get('/getallreels', getAllReels);
postRouter.get('/getuserposts/:identifiier', getUserPosts);
postRouter.get('/getuserreels/:identifiier', getUserReels);
postRouter.post('/postcomment/:postid', postComment);
postRouter.get('/getallcomments/:postid', getAllComments);
postRouter.post('/addreply/:postid/:commentid', addReply);
postRouter.put('/likecomment/:commentid', likeComment);
postRouter.get('/getalllikesoncomment/:commentid', getAllLikesOnComment);
postRouter.put('/likepost/:postid', likePost);
postRouter.get('/getalllikesonpost/:postid', getAllLikesOnPost);
postRouter.put('/saved/:postid', saved);
postRouter.get('/getsavedusersonposts/:postid', getSavedUsersOnPosts);
postRouter.get('/getusersavedposts/:username', getUserSavedPosts);



export default postRouter;  