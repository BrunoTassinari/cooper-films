import type { UserScript } from '../entities/user-script';

export interface UserScriptRepository {
  create(userScript: UserScript): Promise<UserScript>;
  findByRelation(userId: string, scriptId: string): Promise<UserScript | null>;
  list(userId: string): Promise<UserScript[]>;
  delete(userScriptId: string): Promise<void>;
}
