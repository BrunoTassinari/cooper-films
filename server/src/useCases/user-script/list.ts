import type { Script } from '../../domain/entities/script';
import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';
import type { ScriptData } from '../../types/user';
import { findScriptsByIdsUseCase } from '../script/';

export class ListUserScriptsUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute(userId: string): Promise<ScriptData[]> {
    // validar se usuario existe

    const userScripts = await this.repository.list(userId);

    console.log('userScripts', userScripts);

    const userScriptsIds = userScripts.map((userScript) => userScript.script_id);

    return await findScriptsByIdsUseCase.execute(userScriptsIds);
  }
}
