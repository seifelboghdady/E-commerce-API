import Product from"../models/product.model.js";
import Order from "../models/order.model.js";


export const createOrder = async (req, res)=>{
    try {
        let order = await Order.findOne({where : {userId : req.user.id, status: 'cart'}});
        if(!order){
           //return new error
           return res.status(404).json({
                success: false,
                message: "No cart order found for this user"
            });
        }
        //update order 
        await order.update({status:"pending_payment"});
        return res.status(200).json({
                success: true,
                message: "Order moved to pending payment"
            });
    } catch (error) {
            return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the pending_payment.",
            error: error.message
        });
    }

}


export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Order.findOne({
            where: { UserId: userId, status: 'cart' },
            include: [
                {
                    model: Product, 
                    through: { attributes: ['quantity'] } 
                }
            ]
        });

        if (!cart) {
            return res.status(200).json({ success: true, message: "Cart is empty", data: [] });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getUserOrder=async(req, res)=>{
    try {
        
        const UserId = req.user.id;
        const orders = await Order.findAll({where:{UserId:UserId}});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

}