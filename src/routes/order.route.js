import {createOrder, getCart} from '../controllers/order.controller.js'
import { Router } from 'express'
import { auth } from '../middleware/authToken.js';
import { get } from 'mongoose';

const orderRouter = Router();

orderRouter
    .post('/api/orders',auth, createOrder)
    .get('/api/orders', auth, getCart)
export{orderRouter};