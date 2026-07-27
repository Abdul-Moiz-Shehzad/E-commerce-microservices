"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const authService_1 = require("../../services/authService");
class AuthController {
    async register(req, res, next) {
        try {
            const result = await authService_1.authService.register(req.body);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                token: result.token,
                userId: result.user.id,
                user: result.user,
            });
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
    async login(req, res, next) {
        try {
            const result = await authService_1.authService.login(req.body);
            res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                token: result.token,
                userId: result.user.id,
                user: result.user,
            });
        }
        catch (err) {
            res.status(401).json({ success: false, error: err.message });
        }
    }
    async validateToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(' ')[1] || '';
            const result = await authService_1.authService.validateToken(token);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            res.status(401).json({ success: false, error: err.message });
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await authService_1.authService.getUsers();
            res.status(200).json(users);
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
