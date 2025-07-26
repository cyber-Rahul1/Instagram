import express from 'express';
import upload from '../middlewares/multer.js';
import { addReply, createPost, deleteComment, deletePost, deleteReply, getAllComments, getAllLikesOnComment, getAllLikesOnPost, getAllLikesOnReply, getAllPosts, getAllReels, getAllReplies, getPost, getSavedUsersOnPosts, getUserPosts, getUserReels, getUserSavedPosts, getUserTaggedPosts, hideComments, hideLikes, likeComment, likePost, likeReply, postComment, saved, setViewed, updatePost } from '../controllers/post.controller.js';
const postRouter = express.Router();



postRouter.post('/createpost', upload.single('image'), createPost);
postRouter.post('/updatepost/:postid', updatePost);
postRouter.delete('/deletepost/:postid', deletePost);
postRouter.get('/getallposts', getAllPosts);
postRouter.get('/getpost/:postid', getPost);
postRouter.get('/getallreels', getAllReels);
postRouter.get('/getuserposts/:identifier', getUserPosts);
postRouter.get('/getuserreels/:identifier', getUserReels);
postRouter.post('/postcomment', postComment);
postRouter.delete('/deletecomment/:commentid', deleteComment);
postRouter.post('/getallcomments', getAllComments);
postRouter.post('/addreply', addReply);
postRouter.delete('/deletereply/:replyid', deleteReply);
postRouter.post('/getallreplies', getAllReplies);
postRouter.get('/likecomment/:commentid', likeComment);
postRouter.get('/getalllikesoncomment/:commentid', getAllLikesOnComment);
postRouter.put('/likepost', likePost);
postRouter.post('/getalllikesonpost', getAllLikesOnPost);
postRouter.get('/likereply/:replyid', likeReply);
postRouter.get('/getalllikesonreply', getAllLikesOnReply);
postRouter.get('/saved/:postid', saved);
postRouter.get('/getsavedusersonposts/:postid', getSavedUsersOnPosts);
postRouter.get('/getusersavedposts', getUserSavedPosts);
postRouter.get('/getusertaggedposts', getUserTaggedPosts);
postRouter.get('/hidelikes/:postid', hideLikes);
postRouter.get('/hidecomments/:postid', hideComments);
postRouter.get('/setviewed', setViewed);



export default postRouter;  