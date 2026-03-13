import 'dotenv/config';
import jwt from "jsonwebtoken";

export const auth = (req, res, next)=>{
    const token = req.headers.Authrization;

    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    req.user = decoded;
    next();
}