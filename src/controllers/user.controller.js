import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from "../models/user.model.js";

export const register =async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name||!email||!password){
            throw new Error("Please provide name, email and password");
        }
        const existingUser = await User.findOne({ where:{ email } });

        if(existingUser){
        return res.status(400).json({
            message:"Email already exists"
        });
        }
        const newuser = await User.create({ name, password, email});
        const token = jwt.sign({id: newuser.id}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '3h'});
        res.status(201).json({
            user: newuser,
            message : "user Created",
            token
        });
    
    }catch(err){
        res.status(500).json({
            message: err.message,
            sql: err.parent?.message
        });
    }
}


export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email|!password)
            throw new Error("please enter Email or password");

        const user = await User.findOne({email});

        if(!user)
            throw new Error("please you need to register first");

        const passwordVaild = await bcrypt.compare(password, user.password);
        if (!passwordVaild)
            return res.status(401).json("Invalid email or password. Please try again with the correct credentials.");
        

        const token = jwt.sign({id: user.id}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '3h'});
        res.json({message: "User login",token});
            
    } catch (error) {
            res.status(500).json({
                message: err.message,
                sql: err.parent?.message
            });
    }
}

//export {register};