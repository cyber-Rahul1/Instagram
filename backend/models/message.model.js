import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story',
    },



}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;

