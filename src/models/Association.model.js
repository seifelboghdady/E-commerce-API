import User from './user.model';
import Order from './order.model';
import Product from './product.model';
import OrderProduct from './OrderProduct.model';

/*
User hasMany Orders
Order belongsTo User

Order belongsToMany Products
Product belongsToMany Orders
*/



//assciation
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product,{through: OrderProduct});
Product.belongsToMany(Order,{through: OrderProduct});

module.exports= {OrderProduct, User, Order, Product};