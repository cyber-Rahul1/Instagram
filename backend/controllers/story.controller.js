import uploadOnCloudinary from "../config/cloudinary.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js";



export const createStory = async (req, res) => {
    try {
        const { caption } = req.body;
        const author = await User.findById(req.userId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        let imageUrl;
        if (req.file) {
            imageUrl = await uploadOnCloudinary(req.file);
        }
        const story = new Story({
            author,
            image: imageUrl,
            caption,
        });
        await User.findByIdAndUpdate(author._id, { $push: { story: story._id } });
        await author.save();
        await story.save();
        return res.status(201).json({ message: 'Story created successfully', story });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - createStory' });
    }
}

//------------------------------------------------------------------------------------------


export const getAllStories = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });
        const stories = await Story.find().populate('author').sort({ createdAt: -1 });
        if (!stories) return res.status(404).json({ message: 'Stories not found' });
        const filteredStories = stories.filter(story => story.author?.followers?.includes(currentUser._id) && story.author._id.toString() !== currentUser._id.toString());
        return res.status(200).json({ filteredStories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getAllStories' });
    }
}

//------------------------------------------------------------------------------------------


export const getStory = async (req, res) => {
    try {
        const { storyid } = req.params;
        if (!storyid) return res.status(400).json({ message: 'Story id is required' });
        const story = await Story.findById(storyid).populate('author views likes');
        if (!story) return res.status(404).json({ message: 'Story not found' });
        return res.status(200).json({ story });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getStory' });
    }
}

//------------------------------------------------------------------------------------------


export const getCurrentUserStories = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });
        const stories = await Story.find({ author: currentUser._id }).populate('author views likes');
        if (!stories) return res.status(404).json({ message: 'Stories not found' });
        return res.status(200).json({ stories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - getCurrentUserStories' });
    }
}

//------------------------------------------------------------------------------------------


export const viewStory = async (req, res) => {
    try {
        const { storyid } = req.params;
        if (!storyid) return res.status(400).json({ message: 'Story id is required' });
        const story = await Story.findById(storyid);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (story.views.includes(user._id)) {
            return res.status(200).json({ message: 'Story already viewed' });
        } else {
            await Story.findByIdAndUpdate(story._id, { $push: { views: user._id } });
            return res.status(200).json({ message: 'Story viewed' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - viewStory' });
    }
}

//------------------------------------------------------------------------------------------


export const likeStory = async (req, res) => {
    try {
        const { storyid } = req.params;
        if (!storyid) return res.status(400).json({ message: 'Story id is required' });
        const story = await Story.findById(storyid);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (story.likes.includes(user._id)) {
            await Story.findByIdAndUpdate(story._id, { $pull: { likes: user._id } });
            return res.status(200).json({ message: 'Story unliked' });
        } else {
            await Story.findByIdAndUpdate(story._id, { $push: { likes: user._id } });
            return res.status(200).json({ message: 'Story liked' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong - likeStory' });
    }
}

//------------------------------------------------------------------------------------------    


