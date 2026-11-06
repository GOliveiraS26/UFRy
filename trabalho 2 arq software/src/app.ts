import express from 'express';
import { container } from './container/container';
import { OrderController } from './controllers/OrderController';
import { TYPES } from './container/types';

const orderController = container.get<OrderController>(TYPES.OrderController);

const app = express();
app.use(express.json());

app.post('/orders', orderController.processOrder);

export default app;
