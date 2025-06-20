import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    profilepic: {
        type: String,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    birthdate: {
        type: String,
    },
    gender: {
        type: String,
    },
    website: {
        type: String,
    },
    bio: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    address: {
        type: String,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    }



},{timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;