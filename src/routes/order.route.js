import {createOrder, getCart, getUserOrder} from '../controllers/order.controller.js'
import { Router } from 'express'
import { auth } from '../middleware/authToken.js';
import { get } from 'mongoose';

const orderRouter = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
orderRouter
    .post('/api/orders',auth, createOrder)
    .get('/api/orders', auth, getUserOrder);
    //.get('/api/orders', auth, getCart)

export{orderRouter};