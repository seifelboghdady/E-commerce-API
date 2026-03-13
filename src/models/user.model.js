/*
Description
Task: Define user schema
Input
User registration data
Output
User stored in database
Fields:
User
- id
- name
- email
- password
- role (user/admin)
- createdAt
*/

import bcrypt from "bcrypt";
import { DataTypes, Model} from "sequelize";
import sequelize from "../config/sequelize.js";

class User extends Model{}

User.init({

    name:{
        type: DataTypes.STRING,
        default: 'Unkown User',
        validate:{
            len:[4,50]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        set(value){
            const hashed = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashed);
        }
    },
    role:{
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: 'user'
    }
    
},{sequelize, timestamps: true});

export default User;

