"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
class AuthService {
    jwtSecret;
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
    }
    async register(input) {
        const existing = userModel_1.usersDb.find((u) => u.email === input.email);
        if (existing) {
            throw new Error('User already exists');
        }
        const newUser = {
            id: `usr_${Date.now()}`,
            username: input.username,
            email: input.email,
            passwordHash: input.password, // In production, hash password
            createdAt: new Date(),
        };
        userModel_1.usersDb.push(newUser);
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, this.jwtSecret, { expiresIn: '1h' });
        const { passwordHash, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword, token };
    }
    async login(input) {
        const user = userModel_1.usersDb.find((u) => u.email === input.email);
        if (!user || user.passwordHash !== input.password) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, this.jwtSecret, { expiresIn: '1h' });
        const { passwordHash, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    async validateToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.jwtSecret);
            return { valid: true, payload: decoded };
        }
        catch {
            throw new Error('Invalid token');
        }
    }
    async getUsers() {
        return userModel_1.usersDb.map(({ passwordHash, ...rest }) => rest);
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
