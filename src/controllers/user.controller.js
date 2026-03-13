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
        res.status(201).json(newuser);
    
    }catch(err){
        res.status(500).json({
            message: err.message,
            sql: err.parent?.message
        });
    }
}

// export const login = async(req, res)=>{
//     try {
//         const {email, password} = req.body;
//         if(!email|!password)
//             throw new Error("please enter Email or password");


            
//     } catch (error) {
        
//     }
// }

//export {register};