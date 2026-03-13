import User from './user.model.js';
import Order from './order.model.js';
import Product from './product.model.js';
import OrderProduct from './OrderProduct.model.js';

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

export { OrderProduct, User, Order, Product };