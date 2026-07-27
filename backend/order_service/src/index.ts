import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from './api/routes/orderRoutes';
import { errorHandler } from '../../common/utils/middleware';
import { BASE_ROUTES } from '../../common/constants';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Routes setup
app.use(BASE_ROUTES.ORDERS, orderRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
