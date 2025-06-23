
import mongoose from "mongoose";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";



export const getUser = async (req, res) => {
    try {
        const userid = req.userId;
        const user = await User.findById(userid).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------


export const updateUser = async (req, res) => {
    try {
        const userid = req.userId;
        const user = await User.findById(userid);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const { name, email, username, bio, gender, website, phonenumber } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email fields are required' });
        }

        let imageUrl = await uploadOnCloudinary(req.files.profilepic[0].path);

        const updatedUser = await User.findByIdAndUpdate(userid, { name, email, username, imageUrl, bio, gender, website, phonenumber }, { new: true });
        await updatedUser.save();
        return res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------


export const getOtherUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------


export const followAndUnfollow = async (req, res) => {
    try {

        let currentUser = await User.findById(req.userId);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });
        let otherUser = await User.findById(req.params.id);
        if (!otherUser) return res.status(404).json({ message: 'User not found' });
        if (currentUser.following.includes(otherUser._id)) {
            await Promise.all([
                User.findByIdAndUpdate(currentUser._id, { $pull: { following: otherUser._id } }),
                User.findByIdAndUpdate(otherUser._id, { $pull: { followers: currentUser._id } })
            ])

            console.log("Unfollowed");
            return res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            await Promise.all([
                User.findByIdAndUpdate(currentUser._id, { $push: { following: otherUser._id } }),
                User.findByIdAndUpdate(otherUser._id, { $push: { followers: currentUser._id } })
            ])

            console.log("Followed");
            return res.status(200).json({ message: 'User followed successfully' });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------


export const getAllMostFollowedUsers = async (req, res) => {
    try {
        let currentUser = req.userId
        const users = await User.find({ _id: { $ne: currentUser } }).sort({ followers: -1 }).limit(10).select('-password');
        if (!users) return res.status(404).json({ message: 'Users not found' });
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------


export const suggestedUsers = async (req, res) => {
    try {
        let currentUser = await User.findById(req.userId)
        if (!currentUser) return res.status(404).json({ message: 'User not found' })
        const followingList = currentUser.following.map(id => id.toString());
        const mutualFollowings = await User.find(
            { _id: { $in: followingList } },
            'following'
        );
        const allSuggestions = mutualFollowings.flatMap(user => user.following.map(userid => userid.toString()));
        const suggestedUsers = new Set();
        allSuggestions.forEach(suggestionId => {
            if (!followingList.includes(suggestionId) && suggestionId !== currentUser._id.toString()) {
                suggestedUsers.add(suggestionId);
            }
        });
        const suggestionIds = Array.from(suggestedUsers).slice(0, 5).map(id => new mongoose.Types.ObjectId(id));
        const users = await User.find({ _id: { $in: suggestionIds } }).select(
            '_id username profilepic'
        );
        if (!users) return res.status(404).json({ message: 'Follow some people to see suggestions' });
        const followings = await User.find(
            { _id: { $in: currentUser.following } },
            'username following'
        );

        const mutualsMap = {};

        suggestionIds.forEach(id => {
            mutualsMap[id.toString()] = [];
        });

        followings.forEach(follower => {
            follower.following.forEach(f => {
                const fId = f.toString();
                if (mutualsMap[fId]) {
                    mutualsMap[fId].push(follower.username);
                }
            });
        });
        const usersWithMutuals = users.map(user => {
            const mutualFollowers = mutualsMap[user._id.toString()] || [];
            return {
                ...user.toObject(),
                followedBy: mutualFollowers
            };
        });
        return res.status(200).json(usersWithMutuals);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------


export const getFollowers = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const followers = await User.find({ _id: { $in: user.followers } }).select('_id username profilepic name').sort({ username: -1 });
        if (!followers) return res.status(404).json({ message: 'Followers not found' });
        return res.status(200).json(followers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------


export const getFollowing = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const following = await User.find({ _id: { $in: user.following } }).select('_id username profilepic name').sort({ username: -1 });
        if (!following) return res.status(404).json({ message: 'Following users not found' });
        return res.status(200).json(following);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}