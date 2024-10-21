import type { ScriptHistoryRepository } from '../../domain/repositories/script-history-repository';

export class FindScriptHistoriesActionByRelationUseCase {
  constructor(private readonly scriptHistoryRepository: ScriptHistoryRepository) {}

  async execute(script_id: string, user_id: string, action_status: string) {
    return this.scriptHistoryRepository.findActionsByRelation(script_id, user_id, action_status);
  }
}
