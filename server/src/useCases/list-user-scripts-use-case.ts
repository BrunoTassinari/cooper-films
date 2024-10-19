import type { UserScriptRepository } from '../domain/repositories/user-script-repository';
import type { ScriptData } from '../types/user';
import { findScriptsByIdsUseCase, findUserUseCase } from '.';

export class ListUserScriptsUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute(userId: string): Promise<ScriptData[]> {
    // validar se usuario existe

    const userScripts = await this.repository.list(userId);

    console.log('userScripts', userScripts);

    const userScriptsIds = userScripts.map(
      (userScript) => userScript.script_id
    );

    return await findScriptsByIdsUseCase.execute(userScriptsIds);
  }
}
