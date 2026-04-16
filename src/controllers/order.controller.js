
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