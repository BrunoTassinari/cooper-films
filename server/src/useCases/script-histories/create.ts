import { ScriptHistoriy } from '../../domain/entities/script-history';
import type { ScriptHistoryRepository } from '../../domain/repositories/script-history-repository';
import type { ScriptHistoricBody } from '../../types/index.ts';

export class CreateScriptHistoriesUseCase {
  constructor(private readonly repository: ScriptHistoryRepository) {}

  async execute({ script_id, user_id, action, observation }: ScriptHistoricBody): Promise<void> {
    const scriptHistoriy = new ScriptHistoriy(script_id, user_id, action, observation);

    await this.repository.create(scriptHistoriy);
  }
}
