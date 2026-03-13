import express from 'express'
import sequelize from './src/config/sequelize.js';
import {Order, Product, User, OrderProduct} from './src/models/Association.model.js';
import {router} from './src/routes/user.route.js';
const app = express();
app.use(express.json());
app.use(router);
/*
// app.post('/api/auth/register',async(req, res)=>{
//     try{
//         const {name, email, password} = req.body;
//         if(!name||!email||!password){
//             throw new Error("Please provide name, email and password");
//         }
//         const existingUser = await User.findOne({ where:{ email } });
//         if(existingUser){
//         return res.status(400).json({
//             message:"Email already exists"
//         });
//         }
//         const newuser = await User.create({ name, password, email});
//         res.status(201).json(newuser);
    
//     }catch(err){
//         console.error("FULL ERROR:", err);
    
//         if (err.parent) {
//             console.error("SQL ERROR:", err.parent.message);
//         }
    
//         res.status(500).json({
//             message: err.message,
//             sql: err.parent?.message
//         });
//     }
//     });
*/
await sequelize.sync({ alter: true });

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
/*
{
  "name": "Seif",
  "email": "seif@mail.com",
  "password": "123456"
}
*/


