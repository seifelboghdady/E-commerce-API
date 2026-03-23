import Product from '../models/product.model.js';

export const addProduct = async (req, res)=>{
    // const newProduct = req.body;
    // await Product.create(newProduct);
    try {
        // if (req.user.role !== "admin") {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Access denied"
        //     });
        // }
        const newProduct = req.body;
        // simple validation
        if (!newProduct.name || !newProduct.price) {
            return res.status(400).json({
                success: false,
                message: "Name and price are required"
            });
        }

        const product = await Product.create(newProduct);

        res.status(201).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error("Error creating product:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
