import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';
import type { ScriptData } from '../../types/index.ts';
import { findScriptsByIdsUseCase } from '../script/';
import { findUserByidUseCase } from '../user';

export class ListUserScriptsUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute(user_id: string): Promise<ScriptData[]> {
    const user = await findUserByidUseCase.execute(user_id);

    const userScripts = await this.repository.list(user?.id as string);

    const userScriptsIds = userScripts.map((userScript) => userScript.script_id);

    return await findScriptsByIdsUseCase.execute(userScriptsIds);
  }
}
