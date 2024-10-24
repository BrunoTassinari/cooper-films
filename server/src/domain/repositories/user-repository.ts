import type { User } from '../entities/user';

export interface UserRepository {
  find(email: string, password: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
