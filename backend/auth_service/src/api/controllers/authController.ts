import { Request, Response, NextFunction } from 'express';
import { authService } from '../../services/authService';

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token: result.token,
        userId: result.user.id,
        user: result.user,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        token: result.token,
        userId: result.user.id,
        user: result.user,
      });
    } catch (err: any) {
      res.status(401).json({ success: false, error: err.message });
    }
  }

  public async validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1] || '';
      const result = await authService.validateToken(token);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(401).json({ success: false, error: err.message });
    }
  }

  public async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await authService.getUsers();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export const authController = new AuthController();
