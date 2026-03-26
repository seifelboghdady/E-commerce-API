import { where } from 'sequelize';
import Product from '../models/product.model.js';

export const addProduct = async (req, res)=>{

    try {
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

//get all product
export const getAllProduct = async (req, res)=>{
    try {
        
        const allproduct = await Product.findAll(
            {
                attributes:['name', 'description', 'stock', 'price' ]
            }
        );
        if (allproduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            });
        }
        return res.status(200).json({
            success: true,
            data: allproduct
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getProductByID = async (req, res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        const product = await Product.findOne(
            {
                where: {id:id},
                attributes: ['name', 'description', 'stock', 'price']
            }
        );
        // const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }


};

export const updateProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const updateData = req.body|| {};
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data provided to update"
            });
        }
        const [updatedProduct] = await Product.update(updateData,{
            where:{
                id: id
            }
        });
        if (updatedProduct === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found or no changes made"
            });
        }
        return res.status(200).json({
            success: true,
            data: updatedProduct
        });

    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });        
    }
}