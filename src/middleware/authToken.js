import 'dotenv/config';
import jwt from "jsonwebtoken";

export const auth = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}