"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("../../common/constants");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL;
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL;
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Proxy routing setup
app.use(constants_1.BASE_ROUTES.AUTH, (0, express_http_proxy_1.default)(AUTH_SERVICE, {
    proxyReqPathResolver: (req) => `${constants_1.BASE_ROUTES.AUTH}${req.url}`
}));
app.use(constants_1.BASE_ROUTES.PRODUCTS, (0, express_http_proxy_1.default)(PRODUCT_SERVICE, {
    proxyReqPathResolver: (req) => `${constants_1.BASE_ROUTES.PRODUCTS}${req.url}`
}));
app.use(constants_1.BASE_ROUTES.ORDERS, (0, express_http_proxy_1.default)(ORDER_SERVICE, {
    proxyReqPathResolver: (req) => `${constants_1.BASE_ROUTES.ORDERS}${req.url}`
}));
app.get('/', (_req, res) => {
    res.json({ message: 'API Gateway running on port ' + PORT });
});
app.listen(PORT, () => {
    console.log(`API Gateway active at http://localhost:${PORT}`);
});
