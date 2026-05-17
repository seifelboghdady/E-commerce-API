import express from 'express'
import sequelize from './src/config/sequelize.js';
import {Order, Product, User, OrderProduct} from './src/models/Association.model.js';
import {router} from './src/routes/user.route.js';
import { routerproduct } from './src/routes/product.route.js';
import { cartRouter } from './src/routes/cart.route.js';
import { orderRouter } from './src/routes/order.route.js';
import {swaggerSpec} from './src/Docs/swagger.js'
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routerproduct);
app.use(router);
app.use(cartRouter);
app.use(orderRouter);
// await sequelize.sync({ alter: true });
await sequelize.sync();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
/*
{
  "name": "Seif",
  "email": "seif@mail.com",
  "password": "123456"
}
*/


