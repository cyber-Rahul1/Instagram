
import User from "../models/user.model.js";



export const getUser = async (req, res) => {
    try {
        const userid = req.userId;
        const user = await User.findById(userid).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------



export const updateUser = async (req, res) => {
    try {
        const userid = req.userId;
        const user = await User.findById(userid);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const { name, email, username, profilepic } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email fields are required' });
        }
        const updatedUser = await User.findByIdAndUpdate(userid, { name, email, username, profilepic }, { new: true });
        await updatedUser.save();
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//------------------------------------------------------------------------------------------

