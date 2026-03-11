import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";




class OrderProduct extends Model {}

OrderProduct.init({
  quantity: DataTypes.INTEGER
},{
  sequelize,
  modelName: "OrderProduct"
});

module.exports = OrderProduct;