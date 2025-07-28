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
        default: ""
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
    bio: {
        type: String,
    },
    activity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    },
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    viewed: {
        type: Boolean,
        default: true,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    isPrivate: {
        type: Boolean,
        default: false,
    },
    recentSearches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tagged: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    messagedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]


}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;