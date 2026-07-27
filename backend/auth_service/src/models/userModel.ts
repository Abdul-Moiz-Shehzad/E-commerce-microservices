export interface UserModel {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// In-memory store fallback for standalone demonstration
export const usersDb: UserModel[] = [];
