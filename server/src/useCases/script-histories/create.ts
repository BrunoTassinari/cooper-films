import { ScriptHistoriy } from '../../domain/entities/script-history';
import type { ScriptHistoryRepository } from '../../domain/repositories/script-history-repository';

type ScriptHistoriyData = {
  script_id: string;
  user_id: string;
  action: string;
  observation?: string;
};

export class CreateScriptHistoriesUseCase {
  constructor(private readonly repository: ScriptHistoryRepository) {}

  async execute({ script_id, user_id, action, observation }: ScriptHistoriyData): Promise<void> {
    const scriptHistoriy = new ScriptHistoriy(script_id, user_id, action, observation);

    await this.repository.create(scriptHistoriy);
  }
}
