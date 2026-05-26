import { where } from 'sequelize';
import Product from '../models/product.model.js';

export const addProduct = async (req, res)=>{

    try {
        const imagePath = req.file
      ? `uploads/${req.file.filename}`
      : null;
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
        const page  = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const offset = (page - 1) * limit;
        const totalProducts = await Product.count();
        const totalPages = Math.ceil(totalProducts / limit);
        const allproduct = await Product.findAll(
            {
                limit: limit,
                offset: offset,
                attributes:[

                'id',

                ['name', 'title'],
                'image',
                'description',
                'stock',
                'price',
                'oldPrice',
                'author',
                'category',
                'rating',
                'reviews',
                'publisher',
                'year',
                'pages',
                'language',
                'isbn',
                'isNew'

                ]
                
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
            data: allproduct,
            currentPage: page,
            totalPages,
            totalProducts
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
        // console.log(id)
        const product = await Product.findOne(
            {
                where: {id:id},
                attributes:[

                'id',

                ['name', 'title'],
                'image',
                'description',
                'stock',
                'price',
                'oldPrice',
                'author',
                'category',
                'rating',
                'reviews',
                'publisher',
                'year',
                'pages',
                'language',
                'isbn',
                'isNew'

                ]
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

export const deleteProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const deletedProduct = await Product.destroy({where:{id}});
        if (deletedProduct === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found or already deleted"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });

    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });   
    }
}