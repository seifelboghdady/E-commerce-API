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

import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'Database.sqlite',
    logging: false
});

class Product extends Model{}

Product.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }

},{sequelize, createdAt: 'createdAt'});


module.exports = Product;