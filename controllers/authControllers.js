const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/authToken');

const Signup = asyncHandler(async (req,res) => {
    const { username, email, password, profile} = req.body;

    if(!username || !email || !password)
    {
        throw new Error("Please Enter all the fields");

    }
    const userExists = await User.findOne({ email: email });
    if(userExists) {
        throw new Error("User already exists");
    }
    const user = await  User.create({ username, email: email, password: password, profile: profile });
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profile: user.profile,
            token:generateToken(user._id)
        });
    }
    else{
        throw new Error("Failed to create user");
    }
})

const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profile: user.profile,
            token: generateToken(user._id)
        });
    }
    else{
        throw new Error("Invalid email or password");
    }
})

module.exports = { Signup, Login };