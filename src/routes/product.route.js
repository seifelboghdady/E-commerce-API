import {auth} from '../middleware/authToken.js'
import upload from '../middleware/upload.js'
import { Router } from 'express';
import { addProduct, deleteProduct, getAllProduct, getProductByID, updateProduct } from '../controllers/product.controller.js';
const routerproduct = Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Concert"
 *             description: "Live concert"
 *             date: "2026-05-01"
 *             location: "Cairo"
 *             price: 200
 *     responses:
 *       201:
 *         description: Event created
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Event found
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Updated successfully
 */


routerproduct
    .post('/api/products',auth,upload.single('image'),addProduct)
    .get('/api/products',auth,getAllProduct)
    .get('/api/products/:id',auth,getProductByID)
    .put('/api/products/:id', auth, updateProduct)
    .delete('/api/products/:id', auth, deleteProduct);


export {routerproduct};