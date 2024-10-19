import type { ScriptRepository } from '../domain/repositories/script-repository';
import { formatScriptData } from '../lib/format-script-data';
import type { ScriptData } from '../types/user';

export class FindScriptsByIdsUseCase {
  constructor(private readonly repository: ScriptRepository) {}

  async execute(ids: string[]): Promise<ScriptData[]> {
    const scriptList = await this.repository.findMany(ids);

    const formatedScriptList = scriptList.map((script) =>
      formatScriptData(script)
    );

    return formatedScriptList;
  }
}
