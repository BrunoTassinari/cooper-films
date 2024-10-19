import type { UserScript } from '../entities/user-script';

export interface UserScriptRepository {
  create(userScript: UserScript): Promise<UserScript>;
  list(userId: string): Promise<UserScript[]>;
}
