import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import OrderProduct from "../models/OrderProduct.model.js"


export const addToCart = async (req, res)=>{
    try {
        
        const {productId, quantity} = req.body;
        const userId = req.user.id;
        //check user has cart
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
    
        // let order = await Order.findOne({where : {userId : req.user.id, status: 'cart'}});
        // if(!order){
        //     order = await Order.create({userId: req.user.id, status: 'cart'});
        // }
        let [order, created] = await Order.findOrCreate({
            where: { UserId: userId, status: 'cart' },
            defaults: { status: 'cart', totalPrice: 0 }
        });
        //check product in cart
        const existingItem = await OrderProduct.findOne({where:{OrderId: order.id, ProductId:productId}});
        if (existingItem){
            //update quantity
            // await OrderProduct.update({quantity: existingItem.quantity+quantity}, {where:{orderId: order.id, productId}});
            await existingItem.increment('quantity', { by: quantity });
        }else{
            // await order.addProduct(productId,{through :{quantity}});
            await OrderProduct.create({
                    OrderId: order.id,
                    ProductId:productId,
                    quantity
            });
        }
        // totalPrice = totalPrice + (price * quantity)
        const unitPrice = Number(product.price);
        const qty = Number(quantity) ;
        const totalIncrement = unitPrice * qty;
        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be a positive number" });
        }
        await order.increment('totalPrice', { by: totalIncrement});
        // res.json({ message: "Added to cart" });
        res.json({ success: true, message: "Added to cart successfully" });
    
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
    }
    }

export const veiwCart = async(req, res)=>{
    try {
        //,userId: req.user.id}
        let product = await Order.findAll({where:{status:'cart'}});
        return res.status(200).json({
                success: true,
                data: product
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the Cart.",
            error: error.message
        });
    }
}