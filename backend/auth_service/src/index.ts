import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './api/routes/authRoutes';
import { errorHandler } from '../../common/utils/middleware';
import { BASE_ROUTES } from '../../common/constants';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Routes setup
app.use(BASE_ROUTES.AUTH, authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
