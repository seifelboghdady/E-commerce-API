import {auth} from '../middleware/authToken.js'
import { Router } from 'express';
import { addProduct } from '../controllers/product.controller.js';
const routerproduct = Router();

routerproduct.post('/api/products',
    auth,
    addProduct
);

export {routerproduct};