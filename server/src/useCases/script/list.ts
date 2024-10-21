import type { ScriptRepository } from '../../domain/repositories/script-repository';
import { formatScriptData } from '../../lib/format-script-data';
import type { ScriptData } from '../../types/index.ts';

export class ListScriptUseCase {
  constructor(private repository: ScriptRepository) {}

  async execute(): Promise<ScriptData[] | null> {
    const scriptList = await this.repository.list();

    const formatedScriptList = scriptList.map((script) => formatScriptData(script));

    return formatedScriptList;
  }
}
