import {createOrder} from '../controllers/order.controller.js'
import { Router } from 'express'
import { auth } from '../middleware/authToken.js';

const orderRouter = Router();

orderRouter
    .post('/api/orders',auth, createOrder)
export{orderRouter};