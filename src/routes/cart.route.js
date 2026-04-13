import { Router } from "express";
import { addToCart, veiwCart } from "../controllers/card.controller.js";
import { auth } from "../middleware/authToken.js";

const cartRouter = Router();

cartRouter
    .post('/api/cart',auth, addToCart)
    .get('/api/cart', auth, veiwCart)

export{cartRouter}

