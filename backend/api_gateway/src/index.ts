import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';
import { BASE_ROUTES } from '../../common/constants';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const AUTH_SERVICE = process.env.AUTH_SERVICE_URL as string;
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL as string;
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL as string;

app.use(cors());
app.use(express.json());

// Proxy routing setup
app.use(BASE_ROUTES.AUTH, proxy(AUTH_SERVICE, {
  proxyReqPathResolver: (req) => `${BASE_ROUTES.AUTH}${req.url}`
}));

app.use(BASE_ROUTES.PRODUCTS, proxy(PRODUCT_SERVICE, {
  proxyReqPathResolver: (req) => `${BASE_ROUTES.PRODUCTS}${req.url}`
}));

app.use(BASE_ROUTES.ORDERS, proxy(ORDER_SERVICE, {
  proxyReqPathResolver: (req) => `${BASE_ROUTES.ORDERS}${req.url}`
}));

app.get('/', (_req, res) => {
  res.json({ message: 'API Gateway running on port ' + PORT });
});

app.listen(PORT, () => {
  console.log(`API Gateway active at http://localhost:${PORT}`);
});
