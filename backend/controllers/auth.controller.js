import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const createUser = async (req,res) => {
    try {
        const { username, email, password } = req.body;
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
            password: hashPassword
        });

        const token =  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token,{
            httpOmly: true,
            expiresIn: 7 * 24 * 60 * 60 * 1000
        } )
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//-------------------------------------------------------------------------------------------


export const checkUsername = async (req,res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(200).json({ message: 'Username is available' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
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
            httpOmly: true,
            expiresIn: 7 * 24 * 60 * 60 * 1000
        }).status(200).json({ message: 'Login successful', user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//-------------------------------------------------------------------------------------------

export const logoutUser = async (req,res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
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
            return res.status(200).json({ message: 'Login successful', user });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOmly: true,
            expiresIn: 7 * 24 * 60 * 60 * 1000
        }).status(200).json({ message: 'Login successful', user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}