import type { Script } from '../../domain/entities/script';
import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';
import type { ScriptData } from '../../types/user';
import { findScriptsByIdsUseCase } from '../script/';
import { findUserByidUseCase } from '../user';

export class ListUserScriptsUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute(userId: string): Promise<ScriptData[]> {
    const foundUser = await findUserByidUseCase.execute(userId);

    const userScripts = await this.repository.list(foundUser?.id as string);

    const userScriptsIds = userScripts.map((userScript) => userScript.script_id);

    return await findScriptsByIdsUseCase.execute(userScriptsIds);
  }
}
