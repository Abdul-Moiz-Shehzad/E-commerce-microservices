const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:3001";
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL || "http://localhost:3003";

app.use("/api/auth", proxy(AUTH_SERVICE, {
    proxyReqPathResolver: (req) => `/api/auth${req.url}`
}));

app.use("/api/products", proxy(PRODUCT_SERVICE, {
    proxyReqPathResolver: (req) => `/api/products${req.url}`
}));

app.use("/api/orders", proxy(ORDER_SERVICE, {
    proxyReqPathResolver: (req) => `/api/orders${req.url}`
}));

app.get("/", (req, res) => {
    res.json({ message: "API Gateway is up and running on port 5000" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API Gateway is listening on port ${PORT}`);
});
