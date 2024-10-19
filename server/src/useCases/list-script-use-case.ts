import type { Script } from '../domain/entities/script';
import type { ScriptRepository } from '../domain/repositories/script-repository';
import type { UserData } from '../types/user';

export class ListScriptUseCase {
  constructor(private repository: ScriptRepository) {}

  async execute(userData: UserData): Promise<Script[] | null> {
    const scriptList = await this.repository.list();

    if (!scriptList) {
      throw new Error('Script not found');
    }

    return scriptList;
  }
}
