import type { Script } from '../entities/script';

export interface ScriptRepository {
  create(script: Script): Promise<Script>;
  find(
    contact_name: string,
    contact_email: string,
    contact_phone: string
  ): Promise<Script[] | null>;

  list(): Promise<Script[]>;
  findOne(id: string): Promise<Script | null>;
  assume(id: string): void;
  findMany(ids: string[]): Promise<Script[]>;
  update(script: Script): Promise<Script>;
}
