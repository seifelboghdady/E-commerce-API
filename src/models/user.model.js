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



import { hash } from "bcrypt";
import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: 'DataBase.sqlite',
    logging: false,
});

class User extends Model{}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        default: 'Unkown User',
        validate:{
            min: 4
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        set(value){
            this.setDataValue('password', hash(value));
        }
    },
    role:{
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: 'user'
    }
    
},{sequelize, createdAt: true});

module.exports = User;

