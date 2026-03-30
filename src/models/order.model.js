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

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";


class Order extends Model{}

Order.init({

    totalPrice:{
        type: DataTypes.INTEGER,
    },
    status:{
        type: DataTypes.STRING
    },
    quantity:{
        type: DataTypes.INTEGER
    }

},{sequelize, timestamps: true});

export default Order;


