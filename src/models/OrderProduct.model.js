import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";




class OrderProduct extends Model {}

OrderProduct.init({
  quantity: DataTypes.INTEGER
},{
  sequelize,
  modelName: "OrderProduct"
});

export default OrderProduct;