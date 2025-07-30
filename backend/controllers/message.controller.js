import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Story from "../models/story.model.js";
import mongoose from "mongoose";
import { getReceiverSocketId, io } from "../index.js";

export const sendMessage = async (req, res) => {
    try {
        let { receiver } = req.params;
        if (!receiver) return res.status(400).json({ message: 'Receiver is required' });
        let sender = await User.findById(req.userId);
        if (!sender) return res.status(404).json({ message: 'Sender not found' });
        let { post } = req.body;
        if (post) {
            let post = await Post.findById(post);
            if (!post) return res.status(404).json({ message: 'Post not found' });
        }
        let { story } = req.body;
        if (story) {
            let story = await Story.findById(story);    
            if (!story) return res.status(404).json({ message: 'Story not found' });
        }
        let { message } = req.body;
        let imageUrl;
        if (req.file) {
            imageUrl = await uploadOnCloudinary(req.file);
        }

        let conversation = await Conversation.findOne({ participants: { $all: [sender._id, receiver] } });
        let newMessage = await Message.create({
            sender: sender._id,
            receiver,
            message,
            image: imageUrl,
            post,
            story

        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [sender._id, receiver],
                messages: [newMessage._id]
            });
        } else {
            conversation.messages.push(newMessage._id);
            await conversation.save();

        }

        const receiverId = getReceiverSocketId(receiver)
        if (receiverId) {
            io.to(receiverId).emit('newMessage', newMessage);
        }


        return res.status(201).json({ message: 'Message sent successfully', newMessage });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - sendMessage' });
    }
}

//------------------------------------------------------------------------------------------


export const getMessages = async (req, res) => {
    try {
        let { receiver } = req.params;
        if (!receiver) return res.status(400).json({ message: 'Receiver is required' });
        if (!mongoose.Types.ObjectId.isValid(receiver)) {
            return res.status(400).json({ message: 'Invalid receiver ID' });
        }
        receiver = new mongoose.Types.ObjectId(receiver);
        let sender = await User.findById(req.userId);
        if (!sender) return res.status(404).json({ message: 'Sender not found' });
        console.log('Receiver:', receiver);

        let conversation = await Conversation.findOne({ participants: { $all: [sender._id, receiver] } }).populate({
            path: 'messages',
            populate: [
                {
                    path: 'post',
                    model: 'Post',
                    populate: {
                        path: 'author',
                        model: 'User'
                    }
                },
                {
                    path: 'story',
                    model: 'Story',
                    populate: {
                        path: 'author',
                        model: 'User'
                    }
                }
            ]
        });
        if (!conversation) return res.status(404).json({ message: 'Conversation not found' });
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - sendMessage' });
    }
}