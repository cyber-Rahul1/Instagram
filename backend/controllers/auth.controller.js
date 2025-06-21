import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/nodemailer.js";
import Otp from "../models/otp.model.js";


export const createUser = async (req,res) => {
    try {
        const { username, email, password, name } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            email,
            name,
            password: hashPassword
        });

        const token =  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        } )
        await user.save();
        return res.status(201).json({ message: 'User created successfully', user });

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//-------------------------------------------------------------------------------------------


export const checkUsername = async (req,res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        } else {
            return res.status(200).json({ message: 'Username is available' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}


//-------------------------------------------------------------------------------------------


export const loginUser = async (req,res) => {
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });
        if (!user) {
            return res.status(400).json({ message: 'Sorry, your password was incorrect. Please double-check your password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Sorry, your password was incorrect. Please double-check your password.' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//-------------------------------------------------------------------------------------------

export const logoutUser = async (req,res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

//--------------------------------------------------------------------------------------------


export const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({
            email
        });
        if (!user) {
            let user = await User.create({email,name});
            user = await user.save();
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({ message: 'Login successful', user });
        }else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({ message: 'Login successful', user });
        }
        
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}


//--------------------------------------------------------------------------------------------



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



export const confirmEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'This field is required' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Already have an account with this email' });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpData = new Otp({
            email,
            otp,
        });
        await otpData.save();
        await sendEmail(email, otp);
        res.status(200).json({ message: 'Email sent successfully', email, otp });

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
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await User.findOneAndUpdate({ $or: [{ email: identifier }, { username: identifier }] }, { password: hashPassword }, { new: true });
        if (!user) {
            await Otp.deleteMany({ email: user.email });
            console.log("Deleted OTPs for", user.email);
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