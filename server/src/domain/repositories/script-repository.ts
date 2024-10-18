import type { Script } from '../entities/script';

export interface ScriptRepository {
  create(script: Script): Promise<Script>;
  find(
    contact_name: string,
    contact_email: string,
    contact_phone: string
  ): Promise<Script[] | null>;

  list(status: string[]): Promise<Script[]>;
  findOne(id: string): Promise<Script | null>;
}
