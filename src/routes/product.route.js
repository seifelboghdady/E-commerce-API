import {auth} from '../middleware/authToken.js'
import { Router } from 'express';
import { addProduct, deleteProduct, getAllProduct, getProductByID, updateProduct } from '../controllers/product.controller.js';
const routerproduct = Router();

routerproduct
    .post('/api/products',auth,addProduct)
    .get('/api/products',auth,getAllProduct)
    .get('/api/products/:id',auth,getProductByID)
    .put('/api/products/:id', auth, updateProduct)
    .delete('/api/products/:id', auth, deleteProduct)
export {routerproduct};