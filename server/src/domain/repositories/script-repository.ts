import type { Script } from "../entities/script";

export interface ScriptRepository {
  create(script: Script): Promise<Script>;
}
