import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        let { receiver } = req.params;
        if (!receiver) return res.status(400).json({ message: 'Receiver is required' });
        let sender = await User.findById(req.userId);
        if (!sender) return res.status(404).json({ message: 'Sender not found' });
        let { message } = req.body;
        if (!message) return res.status(400).json({ message: 'Message is required' });
        let imageUrl;
        if (req.file) {
            imageUrl = await uploadOnCloudinary(req.file.path);
        }

        let conversation = await Conversation.findOne({ participants: { $all: [sender._id, receiver] } });
        let newMessage = await Message.create({
            sender,
            receiver,
            message,
            image: imageUrl

        });
        if(!conversation){
            conversation = await Conversation.create({
                participants: [sender._id, receiver],
                messages: [newMessage._id]
            });
        } else {
            conversation.messages.push(newMessage._id);
            await conversation.save();
            
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
        let sender = await User.findById(req.userId);
        if (!sender) return res.status(404).json({ message: 'Sender not found' });
        let conversation = await Conversation.findOne({ participants: { $all: [sender._id, receiver] } }).populate('messages');
        if (!conversation) return res.status(404).json({ message: 'Conversation not found' });
        return res.status(200).json( conversation?.messages );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - sendMessage' });
    }
}