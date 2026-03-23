/*
Task: Define product schema
Input
Product information
Output
Product stored in database
Fields:
Product
- id
- name
- description
- price
- stock
- image
- createdAt
*/

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Product extends Model{}

Product.init({

    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }

},{sequelize, timestamps: true});

export default  Product;