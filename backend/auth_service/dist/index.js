"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./api/routes/authRoutes"));
const middleware_1 = require("../../common/utils/middleware");
const constants_1 = require("../../common/constants");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes setup
app.use(constants_1.BASE_ROUTES.AUTH, authRoutes_1.default);
app.use(middleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
