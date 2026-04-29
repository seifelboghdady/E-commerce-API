import { Router } from "express";
import { addToCart, veiwCart } from "../controllers/card.controller.js";
import { auth } from "../middleware/authToken.js";

const cartRouter = Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add event to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             eventId: "123"
 *             quantity: 2
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: View user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */
cartRouter
    .post('/api/cart',auth, addToCart)
    .get('/api/cart', auth, veiwCart)





export{cartRouter}

