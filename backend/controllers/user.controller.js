
import mongoose from "mongoose";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";



export const getUser = async (req, res) => {
    try {
        const userid = req.userId;
        const user = await User.findById(userid).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getUser' });
    }
}

//------------------------------------------------------------------------------------------


export const updateUser = async (req, res) => {
    try {
        const userid = req.userId;
        const user = await User.findById(userid);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const { username, bio, gender, website, phonenumber } = req.body;

        let imageUrl
        if (req.file) {
            console.log('File received:', req.file);
            imageUrl = await uploadOnCloudinary(req.file);
        } else {
            console.log('No file received');
        }

        const updatedUser = await User.findByIdAndUpdate(userid, { username, profilepic: imageUrl, bio, gender, website, phonenumber }, { new: true });
        await updatedUser.save();
        return res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - updateUser' });
    }
}

//------------------------------------------------------------------------------------------


export const removeProfilePic = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.profilepic = "";
        await user.save();
        res.status(200).json({ message: "Profile picture removed successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - removeProfilePic' });
    }
  };


//------------------------------------------------------------------------------------------



export const getUserProfile = async (req, res) => {
    try {
        const { identifier } = req.params;

        const conditions = [{ username: identifier }];

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            conditions.push({ _id: identifier });
        }

        const user = await User.findOne({ $or: conditions }).select('-password').populate('followers following posts saved notifications recentSearches activity');
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getUserProfile' });
    }
}

//------------------------------------------------------------------------------------------


export const followAndUnfollow = async (req, res) => {
    try {
        let { identifier } = req.params;
        if (!identifier) return res.status(400).json({ message: 'Identifier is required' });
        let currentUser = await User.findById(req.userId);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });
        const conditions = [{ username: identifier }];

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            conditions.push({ _id: identifier });
        }
        let otherUser = await User.findOne({ $or: conditions });
        if (!otherUser) return res.status(404).json({ message: 'User not found' });
        if (currentUser.following.includes(otherUser._id)) {
            await Promise.all([
                User.findByIdAndUpdate(currentUser._id, { $pull: { following: otherUser._id } }),
                User.findByIdAndUpdate(otherUser._id, { $pull: { followers: currentUser._id } }),

            ])
            await currentUser.save();
            console.log("Unfollowed");
            return res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            let notification;
            await Promise.all([
                User.findByIdAndUpdate(currentUser._id, { $push: { following: otherUser._id } }),
                User.findByIdAndUpdate(otherUser._id, { $push: { followers: currentUser._id } }),
                notification = await Notification.create({ sender: currentUser._id, receiver: otherUser._id, type: 'follow', message: `${currentUser.username} started following you.` }),
                User.findByIdAndUpdate(otherUser._id, { $push: { notifications: notification._id } })
            ])
            await currentUser.save();
            await otherUser.save();
            console.log("Followed");
            return res.status(200).json({ message: 'User followed successfully' });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - followAndUnfollow' });
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
        return res.status(500).json({ message: 'Something went wrong - getAllMostFollowedUsers' });
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
        const suggestionIds = Array.from(suggestedUsers).slice(0, 10).map(id => new mongoose.Schema.Types.ObjectId(id));
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
        return res.status(500).json({ message: 'Something went wrong - suggestedUsers' });
    }
}

//------------------------------------------------------------------------------------------


export const getFollowers = async (req, res) => {
    try {
        const { identifier } = req.params;
        const conditions = [{ username: identifier }];

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            conditions.push({ _id: identifier });
        }

        const user = await User.findOne({ $or: conditions });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const followers = await User.find({ _id: { $in: user.followers } }).select('_id username profilepic name').sort({ username: -1 });
        if (!followers) return res.status(404).json({ message: 'Followers not found' });
        return res.status(200).json(followers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getFollowers' });
    }
}

//------------------------------------------------------------------------------------------


export const getFollowing = async (req, res) => {
    try {
        const { identifier } = req.params;
        const conditions = [{ username: identifier }];

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            conditions.push({ _id: identifier });
        }

        const user = await User.findOne({ $or: conditions });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const following = await User.find({ _id: { $in: user.following } }).select('_id username profilepic name').sort({ username: -1 });
        if (!following) return res.status(404).json({ message: 'Following users not found' });
        return res.status(200).json(following);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getFollowing' });
    }
}

//------------------------------------------------------------------------------------------


export const addRecentUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!currentUser.recentSearches.includes(user._id)) {
            await User.findByIdAndUpdate(currentUser._id, { $push: { recentSearches: user._id } }, { new: true });
            return res.status(200).json({ message: 'User added to recent searches' });
        } else {
            return res.status(200).json({ message: 'User already in recent searches' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - addRecentUsers' });
    }
}

//------------------------------------------------------------------------------------------


export const getRecentUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });
        const recentUsers = await User.find({ _id: { $in: currentUser.recentSearches } }).select('_id username profilepic name').sort({ username: -1 });
        if (!recentUsers) return res.status(404).json({ message: 'There are no recent searches' });
        return res.status(200).json(recentUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getRecentUsers' });
    }
}

//------------------------------------------------------------------------------------------


export const clearRecentUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });
        await User.findByIdAndUpdate(currentUser._id, { recentSearches: [] }, { new: true });
        return res.status(200).json({ message: 'Recent searches cleared' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - clearRecentUsers' });
    }
}

//------------------------------------------------------------------------------------------


export const clearOneRecentUser = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) return res.status(400).json({ message: 'Username is required' });
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const currentUser = await User.findById(req.userId);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });
        await User.findByIdAndUpdate(currentUser._id, { $pull: { recentSearches: user._id } }, { new: true });
        return res.status(200).json({ message: 'Recent user cleared' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - clearOneRecentUser' });
    }
}

//------------------------------------------------------------------------------------------


