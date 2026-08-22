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

// export const updateprofile= async(req, res)=>{

//     try {
//         const id = req.user.id;
//         const allowedFields = ["name","phone","city"];
//         const updatedData ={};
    
//         allowedFields.forEach((field)=>{
//             if (req.body[field] !== undefined) {
//                 updatedData[field] = req.body[field];
//             }
//         });
//         if (req.file) {
//             updatedData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//         }
//         await User.update(updatedData,{
//             where:{id}
//         })
//         return res.status(200).json({
//             message: "Profile updated successfully",
//             data: updatedUser
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }

// };

// export const updatedPassword= async(req, res)=>{
//     try {
//         const user = await User.findByPk(req.user.id);
//         const isMatch = await bcrypt.compare(
//             req.body.oldPassword,
//             user.password
//         );
    
//         if (!isMatch) {
//             return res.status(400).json({
//                 message: "Old password is incorrect"
//             });
//         }
//         const hashedPassword = await bcrypt.hash(
//             req.body.newPassword,
//             10
//         );
//         await user.update({
//             password: hashedPassword
//         });
//         res.status(200).json({
//                 message: "Update Complete succful",
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });        
//     }
// }

export const updateprofile = async (req, res) => {
    try {
        const id = req.user.id;
        const allowedFields = ["name", "phone", "city"];
        const updatedData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updatedData[field] = req.body[field];
            }
        });

        if (req.file) {
            updatedData.image = `uploads/${req.file.filename}`;
        }

        // 1. تحديث البيانات في قاعدة البيانات
        await User.update(updatedData, {
            where: { id }
        });

        // 2. جلب كائن المستخدم الجديد المحدث بالكامل لإرساله للفرونت إند
        const updatedUser = await User.findByPk(id, {
            attributes: { exclude: ['password'] } // حماية الباسورد من الإرسال
        });

        // 3. الإرسال بنجاح
        return res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser // الآن المتغير معرف ويحتوي على البيانات الجديدة ✓
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updatedPassword = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        
        // دعم المسميين (currentPassword القادم من الفرونت أو oldPassword) لضمان عدم حدوث تعارض
        const oldPasswordInput = req.body.currentPassword || req.body.oldPassword;

        if (!oldPasswordInput) {
            return res.status(400).json({
                message: "Old password is required"
            });
        }

        const isMatch = await bcrypt.compare(
            oldPasswordInput,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(
            req.body.newPassword,
            10
        );

        await user.update({
            password: hashedPassword
        });

        return res.status(200).json({
            message: "Update Complete successful",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};