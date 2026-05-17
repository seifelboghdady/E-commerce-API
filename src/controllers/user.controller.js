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
        // const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = await User.create({
            name,
            email,
            password
        });

        const token = jwt.sign({id: newuser.id, role:newuser.role}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '3h'});
        res.status(201).json({
            user: newuser,
            message : "user Created",
            token
        });
    
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}


export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password)
            throw new Error("please enter Email or password");

        const user = await User.findOne({ where: { email } });

        if(!user)
            throw new Error("please you need to register first");

        // console.log("Entered Password:", password);
        // console.log("Stored Hash:", user.password);
        const passwordVaild = await bcrypt.compare(password, user.password);
        // console.log("Compare Result:", passwordVaild);
        if (!passwordVaild)
            return res.status(401).json("Invalid email or password. Please try again with the correct credentials.");
        

        const token = jwt.sign({id: user.id}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '3h'});
        res.status(200).json({
            message: "User login",
            token,
            user
        });
            
    } catch (error) {
            res.status(500).json({
                message: error.message
            });
    }
}

//export {register};