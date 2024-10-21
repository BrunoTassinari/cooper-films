import type { ScriptHistoriy } from '../entities/script-history';

export interface ScriptHistoryRepository {
  create(scriptHistories: ScriptHistoriy): Promise<void>;
  findActionsByRelation(script_id: string, user_id: string, action_status: string): Promise<ScriptHistoriy[]>;
}
