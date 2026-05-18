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

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
    },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    oldPrice: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    author: {
        type: DataTypes.STRING,
        allowNull: true
    },

    category: {
        type: DataTypes.STRING,
        allowNull: true
    },

    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 4.5
    },

    reviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    pages: {
        type: DataTypes.INTEGER
    },

    publisher: {
        type: DataTypes.STRING
    },

    language: {
        type: DataTypes.STRING
    },

    isbn: {
        type: DataTypes.STRING
    },

    year: {
        type: DataTypes.INTEGER
    },

    isNew: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    sequelize,
    modelName: 'Product',
    timestamps: true
});


export default  Product;