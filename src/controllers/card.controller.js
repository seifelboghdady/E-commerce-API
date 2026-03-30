import Order from "../models/order.model";
import Product from "../models/product.model";
import OrderProduct from "../models/OrderProduct.model.js"


export const addToCart = async (req, res)=>{
    const {productId, quantity} = req.body;
    //check user has cart
    const product = await Product.findByPk(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    let order = await Order.findOne({where : {userId : req.user.id, status: 'cart'}});
    if(!order){
        order = await Order.create({userId: req.user.id, status: 'cart'});
    }
    //check product in cart
    const existingItem = await OrderProduct.findOne({where:{orderId: order.id, productId}});
    if (existingItem){
        //update quantity
        await OrderProduct.update({quantity: existingItem.quantity+quantity}, {where:{}});
    }else{
        await order.addProduct(productId,{through :{quantity}});
    }

    res.json({ message: "Added to cart" });

}