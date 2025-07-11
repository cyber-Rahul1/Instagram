import express from 'express';
import upload from '../middlewares/multer.js';
import { addReply, createPost, deletePost, getAllComments, getAllLikesOnComment, getAllLikesOnPost, getAllLikesOnReply, getAllPosts, getAllReels, getAllReplies, getSavedUsersOnPosts, getUserPosts, getUserReels, getUserSavedPosts, getUserTaggedPosts, likeComment, likePost, likeReply, postComment, saved } from '../controllers/post.controller.js';
const postRouter = express.Router();



postRouter.post('/createpost', upload.single('image'), createPost);
postRouter.post('/deletepost', deletePost);
postRouter.get('/getallposts', getAllPosts);
postRouter.get('/getallreels', getAllReels);
postRouter.get('/getuserposts/:identifier', getUserPosts);
postRouter.get('/getuserreels/:identifier', getUserReels);
postRouter.post('/postcomment', postComment);
postRouter.post('/getallcomments', getAllComments);
postRouter.post('/addreply', addReply);
postRouter.post('/getallreplies', getAllReplies);
postRouter.get('/likecomment/:commentid', likeComment);
postRouter.get('/getalllikesoncomment', getAllLikesOnComment);
postRouter.put('/likepost', likePost);
postRouter.post('/getalllikesonpost', getAllLikesOnPost);
postRouter.get('/likereply/:replyid', likeReply);
postRouter.get('/getalllikesonreply', getAllLikesOnReply);
postRouter.get('/saved/:postid', saved);
postRouter.get('/getsavedusersonposts/:postid', getSavedUsersOnPosts);
postRouter.get('/getusersavedposts', getUserSavedPosts);
postRouter.get('/getusertaggedposts', getUserTaggedPosts);



export default postRouter;  