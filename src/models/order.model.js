/*
Task: Define order schema
Input
Order data
Output
Order stored in database
Fields:

Order
- id
- userId
- products[]
  - productId
  - quantity
- totalPrice
- paymentStatus
- paymentId
- status
- createdAt
*/

import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'Database.sqlite',
    logging: false
});

class Order extends Model{}

Order.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    products:{
        type: DataTypes.ARRAY,

    }, 

})


