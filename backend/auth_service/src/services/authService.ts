import jwt from 'jsonwebtoken';
import { usersDb, UserModel } from '../models/userModel';
import { RegisterInput, LoginInput } from '../schemas/authSchema';

export class AuthService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET as string;
  }

  public async register(input: RegisterInput): Promise<{ user: Omit<UserModel, 'passwordHash'>; token: string }> {
    const existing = usersDb.find((u) => u.email === input.email);
    if (existing) {
      throw new Error('User already exists');
    }

    const newUser: UserModel = {
      id: `usr_${Date.now()}`,
      username: input.username,
      email: input.email,
      passwordHash: input.password, // In production, hash password
      createdAt: new Date(),
    };

    usersDb.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, this.jwtSecret, { expiresIn: '1h' });
    const { passwordHash, ...userWithoutPassword } = newUser;

    return { user: userWithoutPassword, token };
  }

  public async login(input: LoginInput): Promise<{ user: Omit<UserModel, 'passwordHash'>; token: string }> {
    const user = usersDb.find((u) => u.email === input.email);
    if (!user || user.passwordHash !== input.password) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, { expiresIn: '1h' });
    const { passwordHash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  public async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return { valid: true, payload: decoded };
    } catch {
      throw new Error('Invalid token');
    }
  }

  public async getUsers(): Promise<Omit<UserModel, 'passwordHash'>[]> {
    return usersDb.map(({ passwordHash, ...rest }) => rest);
  }
}

export const authService = new AuthService();
