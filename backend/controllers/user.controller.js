import Otp from "../models/otp.model.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { sendEmail } from "../utils/nodemailer.js";


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
        if (!name || !email ) {
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


export const forgotPassword = async (req, res) => {
    try {
        const { identifier } = req.body;
        if (!identifier) {
            return res.status(400).json({ message: 'This field is required' });
        }
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
        if (!user) {
            return res.status(400).json({ message: 'No users found' });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpData = new Otp({
            email: user.email,
            otp: otp,
        });
        await otpData.save();
        await sendEmail(user.email, otp);
        res.status(200).json({ message: 'Email sent successfully', email: user.email });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


//------------------------------------------------------------------------------------------



export const checkOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        if (!otp) {
            return res.status(400).json({ message: 'This field is required' });
        }
        const otpData = await Otp.findOne({ otp });
        if (!otpData) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


//------------------------------------------------------------------------------------------




export const resetPassword = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await User.findOneAndUpdate({ username } , { password : hashPassword } , { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Otp.deleteMany({ email: user.email });
        console.log("Deleted OTPs for", user.email);
        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}