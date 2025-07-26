
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import Reply from "../models/Reply.model.js";
import Notification from "../models/notification.model.js";
import mongoose from "mongoose";
import { io } from "../index.js";




export const createPost = async (req, res) => {
    try {
        let author = await User.findById(req.userId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        let { description, type, tagged } = req.body;
        if (!description) return res.status(400).json({ message: 'Description is required' });
        if (!type) return res.status(400).json({ message: 'Type is required' });
        let imageUrl;
        if (!req.file) return res.status(400).json({ message: 'Image is required' });
        if (req.file) {
            imageUrl = await uploadOnCloudinary(req.file);
        }
        let taggedUser;
        if (tagged) {
            taggedUser = await User.findOne({ username: tagged });
            if (!taggedUser) return res.status(404).json({ message: 'Tagged user not found' });
        }
        let taggedUserId = taggedUser ? new mongoose.Types.ObjectId(taggedUser._id) : null;
        let post = await Post.create({
            author: author._id,
            image: imageUrl,
            description,
            type,
            tagged: taggedUserId,
        });
        let notification;
        if (post) {

            await Promise.all([User.findByIdAndUpdate(author._id, { $push: { posts: post._id } }),
            taggedUser && (User.findByIdAndUpdate(taggedUserId, { $push: { tagged: post._id } }),
             notification = new Notification({ sender: author._id, receiver: taggedUserId, type: 'tag', message: `${author.username} tagged you in a post.`, post: post._id }),
             User.findByIdAndUpdate(taggedUser._id, { $push: { notifications: notification._id } }))
            ]);

            await author.save();

        }
        return res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - createPost' });
    }
}

//------------------------------------------------------------------------------------------


export const updatePost = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let author = await User.findById(req.userId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        if (author._id.toString() !== post.author.toString()) {
            return res.status(401).json({ message: 'You are not authorized to update this post' });
        } else {
            let { description } = req.body;
            if (!description) return res.status(400).json({ message: 'Description is required' });
            await Post.findByIdAndUpdate(post._id, { $set: { description } });
            return res.status(200).json({ message: 'Post updated successfully' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - updatePost' });
    }
}   


//------------------------------------------------------------------------------------------


export const deletePost = async (req, res) => {
    try {
        const { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let author = await User.findById(req.userId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        if (author._id.toString() !== post.author.toString()) {
            return res.status(401).json({ message: 'You are not authorized to delete this post' });
        } else {
            await Promise.all([
                Post.findByIdAndDelete(postid),
                User.findByIdAndUpdate(post.author, { $pull: { posts: postid } })
            ]);
        }
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - deletePost' });
    }
}

//------------------------------------------------------------------------------------------


export const getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find().sort({ createdAt: -1 }).populate('author likes comments tagged').populate({
            path: 'author',
            populate: {
                path: 'story',
                model: 'Story',
            }
        });
        if (!posts) return res.status(404).json({ message: 'Posts not found' });
        return res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllPosts' });
    }
}

//------------------------------------------------------------------------------------------


export const getPost = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid).populate('author likes comments tagged').populate({
            path: 'author',
            populate: {
                path: 'story',
                model: 'Story',
                populate: {
                    path: 'author',
                    model: 'User',
                }
            }
        });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json({ post });
    } catch (error) {   
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getPost' });
    }
}   

//------------------------------------------------------------------------------------------


export const getAllReels = async (req, res) => {
    try {
        let posts = await Post.find({ type: 'Reel' }).sort({ createdAt: -1 }).populate('author likes comments tagged').populate({
            path: 'author',
            populate: {
                path: 'story',
                model: 'Story',
            }
        });
        if (!posts) return res.status(404).json({ message: 'Posts not found' });
        return res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllReels' });
    }
}

//------------------------------------------------------------------------------------------


export const getUserPosts = async (req, res) => {
    try {
        let { identifier } = req.params;
        const conditions = [{ username: identifier }];
        
                if (mongoose.Types.ObjectId.isValid(identifier)) {
                    conditions.push({ _id: identifier });
                }
        let user = await User.findOne({ $or: conditions });
        if (!user) return res.status(404).json({ message: 'User not found' });
        let posts = await Post.find({ author: user._id, type: 'Post' }).sort({ createdAt: -1 }).populate('author likes comments tagged');
        if (!posts) return res.status(404).json({ message: 'Posts not found' });
        return res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getUserPosts' });
    }
}

//------------------------------------------------------------------------------------------


export const getUserReels = async (req, res) => {
    try {
        let { identifier } = req.params;
        const conditions = [{ username: identifier }];

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            conditions.push({ _id: identifier });
        }
        let user = await User.findOne({ $or: conditions });
        if (!user) return res.status(404).json({ message: 'User not found' });
        let posts = await Post.find({ author: user._id, type: 'Reel' }).sort({ createdAt: -1 }).populate('author likes comments tagged');
        if (!posts) return res.status(404).json({ message: 'Posts not found' });
        return res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getUserReels' });
    }
}

//------------------------------------------------------------------------------------------


export const postComment = async (req, res) => {
    try {
        let { postid } = req.body;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let { comment } = req.body;
        if (!comment) return res.status(400).json({ message: 'Comment is required' });
        let author = await User.findById(req.userId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        let newComment = new Comment({
            author,
            post,
            comment
        });
        await newComment.save();
        if (newComment) {
            await Post.findByIdAndUpdate(post._id, { $push: { comments: newComment._id } })
            let notification = await Notification.create({ sender: author._id, receiver: post.author, type: 'comment', message: `${author.username || author.name} commented on your post.`, post: post._id })
            if (!author._id.equals(post.author)) {
                await User.findByIdAndUpdate(post.author, { $push: { notifications: notification._id } })
                await User.findByIdAndUpdate(post.author, { $set: { viewed: false } })
                io.emit('newNotification', post.author._id );
            }
            io.emit('newComment', newComment);
        }
        await post.save();
        return res.status(201).json({ message: 'Comment posted successfully', newComment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - postComment' });
    }
}

//------------------------------------------------------------------------------------------


export const deleteComment = async (req, res) => {
    try {
        let { commentid } = req.params;
        if (!commentid) return res.status(400).json({ message: 'Comment id is required' });
        let comment = await Comment.findById(commentid);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (comment.author.toString() !== user._id.toString()) {
            return res.status(401).json({ message: 'You are not authorized to delete this comment' });
        } else {
            await Promise.all([
                Comment.findByIdAndDelete(commentid),
                Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentid } })
            ]);
        }
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - deleteComment' });
    }
}


//------------------------------------------------------------------------------------------


export const getAllComments = async (req, res) => {
    try {
        let { postid } = req.body;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        if (!mongoose.Types.ObjectId.isValid(postid)) {
            return res.status(400).json({ message: 'Invalid post ID format' });
        }
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let comments = await Comment.find({ _id: { $in: post.comments } }).sort({ createdAt: -1 }).populate('author likes').populate({
            path: 'author',
            populate: {
                path: 'story',
                model: 'Story',
                populate: {
                    path: 'author',
                    model: 'User',
                }
            }
        }).populate({
            path: 'replies',
            populate: {
                path: 'author',
                model: 'User',
                populate: {
                    path: 'story',
                    model: 'Story',
                    populate: {
                        path: 'author',
                        model: 'User',
                    }
                }
            }});
        if (!comments)
        if (!comments) return res.status(404).json({ message: 'Comments not found' });
        return res.status(200).json(comments);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllComments' });
    }
}

//------------------------------------------------------------------------------------------


export const addReply = async (req, res) => {
    try {
        let { postid, commentid, reply } = req.body;
        if (!postid || !commentid || !reply) return res.status(400).json({ message: 'Post id, comment id and reply are required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let comment = await Comment.findById(commentid);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        let author = await User.findById(req.userId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        let newReply = new Reply({
            author,
            comment,
            reply
        });
        await newReply.save();
        if (newReply) {
            let reply = await Reply.findById(newReply._id).populate('author');
            io.emit('newReply', { reply , commentId : commentid});
            await Comment.findByIdAndUpdate(comment._id, { $push: { replies: newReply._id } }).sort({ createdAt: -1 });
            if (!author._id.equals(comment.author)) {
            let notification = await Notification.create({ sender: author._id, receiver: comment.author, type: 'comment', message: `${author.username || author.name} replied to your comment.`, post: post._id })
            if (!author._id.equals(post.author)) {
                await User.findByIdAndUpdate(post.author, { $push: { notifications: notification._id } })
                await User.findByIdAndUpdate(post.author, { $set: { viewed: false } })
                io.emit('newNotification', post.author._id );
            }
            }
        }
        await comment.save();
        return res.status(201).json({ message: 'Reply added successfully', newReply });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - addReply' });
    }
}

//------------------------------------------------------------------------------------------


export const deleteReply = async (req, res) => {
    try {
        let { replyid } = req.params;
        if (!replyid) return res.status(400).json({ message: 'Reply id is required' });
        let reply = await Reply.findById(replyid);
        if (!reply) return res.status(404).json({ message: 'Reply not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (reply.author.toString() !== user._id.toString()) {
            return res.status(401).json({ message: 'You are not authorized to delete this reply' });
        } else {
            await Promise.all([
                Reply.findByIdAndDelete(replyid),
                Comment.findByIdAndUpdate(reply.comment, { $pull: { replies: replyid } })
            ]);
        }
        return res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - deleteReply' });
    }
}


//------------------------------------------------------------------------------------------


export const getAllReplies = async (req, res) => {
    try {
        let { postid } = req.body;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let replies = await Reply.find().sort({ createdAt: -1 }).populate('author').populate({
            path: 'comment',
            populate: {
                path: 'author',
                model: 'User',
            }
        }).populate({
            path: 'author',
            populate: {
                path: 'story',
                model: 'Story',
                populate: {
                    path: 'author',
                    model: 'User',
                }
            }
        });
        if (!replies) return res.status(404).json({ message: 'Replies not found' });
        return res.status(200).json(replies);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllReplies' });
    }
}

//------------------------------------------------------------------------------------------



export const likeComment = async (req, res) => {
    try {
        let { commentid } = req.params;
        if (!commentid) return res.status(400).json({ message: 'Comment id is required' });
        let comment = await Comment.findById(commentid);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (comment.likes.includes(user._id)) {
            await Comment.findByIdAndUpdate(comment._id, { $pull: { likes: user._id } });
            return res.status(200).json({ message: 'Comment unliked' });
        } else {
            await Comment.findByIdAndUpdate(comment._id, { $push: { likes: user._id } }, { new: true });
            let notification = await Notification.create({ sender: user._id, receiver: comment.author, type: 'like', message: `${user.username} liked your comment.`, post: comment.post })
            if (!user._id.equals(comment.author)) {
                await User.findByIdAndUpdate(comment.author, { $push: { notifications: notification._id } })
                await User.findByIdAndUpdate(comment.author, { $set: { viewed: false } })
                io.emit('newNotification', comment.author._id );
            }
            io.emit('newCommentLike', { commentId: commentid, user });
            return res.status(200).json({ message: 'Comment liked' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - likeComment' });
    }
}

//------------------------------------------------------------------------------------------


export const likeReply = async (req, res) => {
    try {
        let { replyid } = req.params;
        if (!replyid) return res.status(400).json({ message: 'Reply id is required' });
        let reply = await Reply.findById(replyid);
        if (!reply) return res.status(404).json({ message: 'Reply not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (reply.likes.includes(user._id)) {
            await Reply.findByIdAndUpdate(reply._id, { $pull: { likes: user._id } });
            return res.status(200).json({ message: 'Reply unliked' });
        } else {
            await Reply.findByIdAndUpdate(reply._id, { $addToSet: { likes: user._id } }, { new: true });
            let notification = await Notification.create({ sender: user._id, receiver: reply.author, type: 'like', message: `${user.username} liked your reply.`, post: reply.post })
            if (!user._id.equals(reply.author)) {
                await User.findByIdAndUpdate(reply.author, { $push: { notifications: notification._id } })
                await User.findByIdAndUpdate(reply.author, { $set: { viewed: false } })
                io.emit('newNotification', reply.author._id );
            }
            io.emit('newReplyLike', { replyId: replyid, user });
            return res.status(200).json({ message: 'Reply liked' });
        }
    }   catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - likeReply' });
    }
}       


//------------------------------------------------------------------------------------------


export const hideLikes = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (post.author.toString() !== user._id.toString()) {
            return res.status(401).json({ message: 'You are not authorized to hide likes' });
        } else {
            await Post.findByIdAndUpdate(post._id, { $set: { hideLikes: !post.hideLikes } }, { new: true });
            return res.status(200).json({ message: 'Likes hidden', post });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - hideLikes' });
    }
}   


//------------------------------------------------------------------------------------------


export const hideComments = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (post.author.toString() !== user._id.toString()) {
            return res.status(401).json({ message: 'You are not authorized to hide comments' });
        } else {
            await Post.findByIdAndUpdate(post._id, { $set: { hideComments: !post.hideComments } }, { new: true });
            return res.status(200).json({ message: 'Comments hidden', post });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - hideComments' });
    }
}


//------------------------------------------------------------------------------------------



export const getAllLikesOnComment = async (req, res) => {
    try {
        let { commentid } = req.params;
        if (!commentid) return res.status(400).json({ message: 'Comment id is required' });
        let comment = await Comment.findById(commentid);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        let likedUsersOnComment = await User.find({ _id: { $in: comment.likes } }).select('_id username profilepic name').sort({ username: -1 });
        if (!likedUsersOnComment) return res.status(404).json({ message: 'Likes not found' });
        return res.status(200).json(likedUsersOnComment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllLikesOnComment' });
    }
}


//------------------------------------------------------------------------------------------


export const getAllLikesOnReply = async (req, res) => {
    try {
        let { replyid } = req.body;
        if (!replyid) return res.status(400).json({ message: 'Reply id is required' });
        let reply = await Reply.findById(replyid);
        if (!reply) return res.status(404).json({ message: 'Reply not found' });
        let likedUsersOnReply = await User.find({ _id: { $in: reply.likes } }).select('_id username profilepic name likes').sort({ username: -1 });
        if (!likedUsersOnReply) return res.status(404).json({ message: 'Likes not found' });
        return res.status(200).json(likedUsersOnReply);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllLikesOnReply' });
    }
}


//------------------------------------------------------------------------------------------


export const likePost = async (req, res) => {
    try {
        let { postid } = req.body;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (post.likes.includes(user._id)) {
            await Post.findByIdAndUpdate(post._id, { $pull: { likes: user._id } });
            await User.findByIdAndUpdate(user._id, { $pull: { activity: post._id } });
            const updatedUser = await User.findById(user._id);
            io.emit('newLike', { user, postId: post._id, liked: false });
            const likedUsers = await User.find({ _id: { $in: post.likes.filter(id => id.toString() !== user._id.toString()) } })
                .select('_id username profilepic name');
            return res.status(200).json({ message: 'Post unliked' , likedUsers, updatedUser });
        } else {
            await Post.findByIdAndUpdate(post._id, { $push: { likes: user._id } });
            await User.findByIdAndUpdate(user._id, { $push: { activity: post._id } });
            const updatedUser = await User.findById(user._id);
            io.emit('newLike', { user, postId: post._id, liked: true });
            let notification = await Notification.create({ sender: user._id, receiver: post.author, type: 'like', message: `${user.username || user.name} liked your post.`, post: post._id })
            if (!user._id.equals(post.author)) {
                await User.findByIdAndUpdate(post.author, { $push: { notifications: notification._id } })
                await User.findByIdAndUpdate(post.author, { $set: { viewed: false } })
                io.emit('newNotification', post.author._id );
            }
            const likedUsers = await User.find({ _id: { $in: post.likes.filter(id => id.toString() !== user._id.toString()) } })
                .select('_id username profilepic name');
            return res.status(200).json({ message: 'Post liked' , likedUsers, updatedUser });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - likePost' });
    }
}

//------------------------------------------------------------------------------------------


export const getAllLikesOnPost = async (req, res) => {
    try {
        let { postid } = req.body;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let likedUsers = await User.find({ _id: { $in: post.likes } }).select('_id username profilepic name likes').sort({ username: -1 });
        if (!likedUsers) return res.status(404).json({ message: 'Likes not found' });
        return res.status(200).json({ postId : post._id, likedUsers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllLikesOnPost' });
    }
}

//------------------------------------------------------------------------------------------


export const saved = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (post.saved.some(id => id.equals(user._id))) {
            await Promise.all([
                Post.findByIdAndUpdate(post._id, { $pull: { saved: user._id } }),
                User.findByIdAndUpdate(user._id, { $pull: { saved: post._id } })
            ]);
            return res.status(200).json({ message: 'Post unsaved' });
        } else {
            await Promise.all([
                Post.findByIdAndUpdate(post._id, { $push: { saved: user._id } }),
                User.findByIdAndUpdate(user._id, { $push: { saved: post._id } })
            ]);
            return res.status(200).json({ message: 'Post saved' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - saved' });
    }
}

//------------------------------------------------------------------------------------------


export const getSavedUsersOnPosts = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let validIds = post.saved.filter(id => mongoose.Types.ObjectId.isValid(id));
        let savedUsers = await User.find({ _id: { $in: validIds } }).select('_id username profilepic name').sort({ username: -1 });
        if (!savedUsers) return res.status(404).json({ message: 'Saved users not found' });
        return res.status(200).json(savedUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getSavedUsersOnPosts' });
    }
}

//------------------------------------------------------------------------------------------


export const getUserSavedPosts = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        let savedPosts = await Post.find({ _id: { $in: user.saved } }).sort({ createdAt: -1 }).populate('author likes comments tagged');
        if (!savedPosts) return res.status(404).json({ message: 'Saved posts not found' });
        return res.status(200).json({ savedPosts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getUserSavedPosts' });
    }
}

//------------------------------------------------------------------------------------------


export const getUserTaggedPosts = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        let taggedPosts = await Post.find({ tagged: user._id }).sort({ createdAt: -1 }).populate('author likes comments tagged');
        if (!taggedPosts) return res.status(404).json({ message: 'Tagged posts not found' });
        return res.status(200).json({ taggedPosts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getUserTaggedPosts' });
    }
}

//------------------------------------------------------------------------------------------


export const setViewed = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await User.findByIdAndUpdate(user._id, { $set: { viewed: true } });
        return res.status(200).json({ message: 'Viewed', viewed: user.viewed });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - setViewed' });
    }
}

//------------------------------------------------------------------------------------------