import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";
import  bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler'


//@desc Register new User
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res)=>{
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill all fields');
    }

    // Checking if user exists

    const userExists = await userModel.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('Email already exists on the database')
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new userModel({
        name : name,
        email : email,
        password : hashedPassword
    })

    // Create User

    const user = await newUser.save({
        name,
        email,
        password: hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc Authenticate a user
//@ route POST /api/users/login
// @ access Public

const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body

    // Checking if email exists
    const user = await userModel.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

//@ desc Get user data
//@ route GET /api/users/me
//@ access Private

const getMe = asyncHandler(async (req,res)=>{
    res.status(200).json(req.user)
})
// Generate JWT

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : '30d'

    })
}
export  {
    registerUser,
    loginUser,
    getMe,
}
// export {createProduct, getProducts, getProduct, removeProduct}




