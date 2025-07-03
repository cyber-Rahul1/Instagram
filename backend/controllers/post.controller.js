
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import Reply from "../models/Reply.model.js";
import Notification from "../models/notification.model.js";



export const createPost = async (req, res) => {
    try {
        let author = await User.findById(req.userId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        let { caption, description, type } = req.body;
        if (!caption || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!type) type = 'Post';
        let imageUrl;
        if (req.file) {
            imageUrl = await uploadOnCloudinary(req.file.path);
        }
        let post = new Post({
            author,
            image: imageUrl,
            caption,
            description,
            type,
        });

        if (post) {
            await User.findByIdAndUpdate(author._id, { $push: { posts: post._id } });
        }
        await post.save();
        return res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - createPost' });
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
        let posts = await Post.find({ type: 'Post' }).sort({ createdAt: -1 });
        if (!posts) return res.status(404).json({ message: 'Posts not found' });
        return res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllPosts' });
    }
}

//------------------------------------------------------------------------------------------


export const getAllReels = async (req, res) => {
    try {
        let posts = await Post.find({ type: 'Reel' }).sort({ createdAt: -1 });
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
        let { identifiier } = req.params;
        let user = await User.findOne({ $or: [{ username: identifiier }, { email: identifiier }] });
        if (!user) return res.status(404).json({ message: 'User not found' });
        let posts = await Post.find({ author: user._id, type: 'Post' }).sort({ createdAt: -1 });
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
        let { identifiier } = req.params;
        let user = await User.findOne({ $or: [{ username: identifiier }, { email: identifiier }] });
        if (!user) return res.status(404).json({ message: 'User not found' });
        let posts = await Post.find({ author: user._id, type: 'Reel' }).sort({ createdAt: -1 });
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
        let { postid } = req.params;
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
            let notification = await Notification.create({ sender: author._id, receiver: post.author, type: 'comment', message: `${author.username} commented on your post.`, post: post._id })
            await User.findByIdAndUpdate(post.author, { $push: { notifications: notification._id } })
            await User.save();
        }
        await post.save();
        return res.status(201).json({ message: 'Comment posted successfully', newComment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - postComment' });
    }
}

//------------------------------------------------------------------------------------------


export const getAllComments = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let comments = await Comment.find({ _id: { $in: post.comments } }).sort({ createdAt: -1 }).populate('author replies');
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
        let { postid, commentid } = req.params;
        if (!postid || !commentid) return res.status(400).json({ message: 'Post id and comment id are required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let comment = await Comment.findById(commentid);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        let { reply } = req.body;
        if (!reply) return res.status(400).json({ message: 'Reply is required' });
        let author = await User.findById(req.userId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        let newReply = new Reply({
            author,
            comment,
            reply
        });
        await newReply.save();
        if (newReply) {
            await Comment.findByIdAndUpdate(comment._id, { $push: { replies: newReply._id } }).sort({ createdAt: -1 });
            let notification = await Notification.create({ sender: author._id, receiver: comment.author, type: 'comment', message: `${author.username} replied to your comment.`, post: post._id })
            await User.findByIdAndUpdate(comment.author, { $push: { notifications: notification._id } })
            await User.save();
        }
        await comment.save();
        return res.status(201).json({ message: 'Reply added successfully', newReply });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - addReply' });
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
            await Comment.findByIdAndUpdate(comment._id, { $push: { likes: user._id } });
            let notification = await Notification.create({ sender: user._id, receiver: comment.author, type: 'like', message: `${user.username} liked your comment.`, post: comment.post })
            await User.findByIdAndUpdate(comment.author, { $push: { notifications: notification._id } })
            await User.save();
            return res.status(200).json({ message: 'Comment liked' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - likeComment' });
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


export const likePost = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (post.likes.includes(user._id)) {
            await Post.findByIdAndUpdate(post._id, { $pull: { likes: user._id } });
            await User.findByIdAndUpdate(user._id, { $pull: { activity: post._id } });
            return res.status(200).json({ message: 'Post unliked' });
        } else {
            await Post.findByIdAndUpdate(post._id, { $push: { likes: user._id } });
            await User.findByIdAndUpdate(user._id, { $push: { activity: post._id } });
            let notification = await Notification.create({ sender: user._id, receiver: post.author, type: 'like', message: `${user.username} liked your post.`, post: post._id })
            await User.findByIdAndUpdate(post.author, { $push: { notifications: notification._id } })
            await User.save();
            return res.status(200).json({ message: 'Post liked' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - likePost' });
    }
}

//------------------------------------------------------------------------------------------


export const getAllLikesOnPost = async (req, res) => {
    try {
        let { postid } = req.params;
        if (!postid) return res.status(400).json({ message: 'Post id is required' });
        let post = await Post.findById(postid);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        let likedUsers = await User.find({ _id: { $in: post.likes } }).select('_id username profilepic name').sort({ username: -1 });
        if (!likedUsers) return res.status(404).json({ message: 'Likes not found' });
        return res.status(200).json(likedUsers);
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
        if (post.saved.includes(user._id)) {
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
        let savedUsers = await User.find({ _id: { $in: post.saved } }).select('_id username profilepic name').sort({ username: -1 });
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
        let { username } = req.params;
        if (!username) return res.status(400).json({ message: 'Username is required' });
        let user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        let savedPosts = await Post.find({ _id: { $in: user.saved } }).sort({ createdAt: -1 });
        if (!savedPosts) return res.status(404).json({ message: 'Saved posts not found' });
        return res.status(200).json(savedPosts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getUserSavedPosts' });
    }
}

//------------------------------------------------------------------------------------------