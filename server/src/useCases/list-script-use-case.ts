import type { Script } from '../domain/entities/script';
import type { ScriptRepository } from '../domain/repositories/script-repository';
import { formatScriptData } from '../lib/format-script-data';
import type { ScriptData, UserData } from '../types/user';

export class ListScriptUseCase {
  constructor(private repository: ScriptRepository) {}

  async execute(userData: UserData): Promise<ScriptData[] | null> {
    const scriptList = await this.repository.list();

    if (!scriptList) {
      throw new Error('Scripts not found');
    }

    const formatedScriptList = scriptList.map((script) =>
      formatScriptData(script)
    );

    return formatedScriptList;
  }
}
