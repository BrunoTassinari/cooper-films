import type { Script } from '../entities/script';

export interface ScriptRepository {
  create(script: Script): Promise<Script>;
  find(contact_name: string, contact_email: string, contact_phone: string): Promise<Script[] | null>;

  list(): Promise<Script[]>;
  findById(id: string): Promise<Script | null>;
  findByTitle(title: string): Promise<Script | null>;
  findMany(ids: string[]): Promise<Script[]>;
  update(script: Script): Promise<Script>;
}
